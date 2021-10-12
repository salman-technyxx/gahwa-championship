const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackRTLPlugin = require('webpack-rtl-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const StylelintPlugin = require('stylelint-webpack-plugin');
const packageJSON = require('./package.json');
const settings = require('./settings'); // custom env variables/paths

// Is the current build a development build
const devMode = process.env.NODE_ENV === 'development';
const envir = process.env.HOST_ENV;

const dirNode = 'node_modules';
const dirHtml = path.join(__dirname, `${packageJSON.paths.html}`);
const dirData = path.join(__dirname, `${packageJSON.paths.data}`);
const dirApp = path.join(__dirname, `${packageJSON.paths.root}/es6`);
const dirImgs = path.join(__dirname, `${packageJSON.paths.root}/img`);
const dirStyles = path.join(__dirname, `${packageJSON.paths.root}/sass`);

const pages = path.resolve(`${dirHtml}/pages`);

const directoryToJSON = (dir, filelist = []) => {
	const files = fs.readdirSync(dir);
	// eslint-disable-next-line no-restricted-syntax
	for (const file of files) {
		const dirFile = path.join(dir, file);
		if (file.includes('.html')) {
			filelist.push({
				name: file,
				ext: path.extname(dirFile)
			});
		}
	}
	return filelist;
};

const htmlfiles = directoryToJSON(pages);
const filenames = [];
let jsonDataEn = '';
let jsonDataAr = '';

const HTMLPages = htmlfiles.map((page) => {
	filenames.push({
		path: page.name,
		name: page.name.replace('.html', ''),
	});
	try {
		// eslint-disable-next-line import/no-dynamic-require
		jsonDataEn = require(`${dirData}/en/${page.name.replace('.html', '')}.json`);
		// eslint-disable-next-line import/no-dynamic-require
		jsonDataAr = require(`${dirData}/ar/${page.name.replace('.html', '')}.json`);
	} catch (ex) {
		console.log('nothing');
	}
	return [
		new HtmlWebpackPlugin({
			inject: false,
			filename: `en/${page.name}`,
			template: `${__dirname}/${packageJSON.paths.html}/pages/${page.name}`,
			lang: 'en',
			dir: 'ltr',
			cssname: '.en',
			data: jsonDataEn,
			cache: true,
			minify: false,
			resourcePath: process.env.ASSET_PATH || '/',
			api: settings[envir] // use to pass dynamica data to html - e.g. different URL's for ajax calls
		}),
		new HtmlWebpackPlugin({
			inject: false,
			filename: `ar/${page.name}`,
			template: `${__dirname}/${packageJSON.paths.html}/pages/${page.name}`,
			lang: 'ar',
			dir: 'rtl',
			cssname: '.ar',
			data: jsonDataAr,
			cache: true,
			minify: false,
			resourcePath: process.env.ASSET_PATH || '/',
			api: settings[envir] // use to pass dynamica data to html - e.g. different URL's for ajax calls
		})
	];
});

module.exports = {
	entry: {
		main: [
			'core-js/modules/es.array.iterator',
			`${dirApp}/publicPath.js`,
			`${dirApp}/app.js`,
			`${dirStyles}/index.scss`
		]
	},
	output: {
		path: path.resolve(__dirname, `${packageJSON.paths.root}`),
		filename: 'js/[name].js'
	},
	stats: {
		colors: true,
		children: false,
		publicPath: false,
		errors: true,
		warnings: false
	},
	resolve: {
		modules: [
			dirNode, // required for `node modules like - jquery/validation`
			dirApp,
			dirImgs,
			dirStyles
		]
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'eslint-loader'
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader?cacheDirectory',
					options: {
						presets: ['@babel/preset-env'],
					},
				}
			},
			// compile sass
			{
				test: /\.(sa|sc|c)ss$/,
				exclude: /(node_modules)/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: devMode
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: devMode,
							postcssOptions: {
								plugins: [
									require('autoprefixer'),
									require('tailwindcss')(),
								]
							}
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: devMode,
							sourceComments: true,
							outputStyle: 'expanded',
							includePaths: [dirStyles]
						}
					}
				]
			},
			{
				test: /\.(gif|jpeg|jpg|png|svg)$/i,
				exclude: [
					/node_modules/,
					path.resolve(
						__dirname,
						`${packageJSON.paths.root}`,
						'fonts'
					)
				],
				use: [
					{
						loader: 'file-loader',
						options: {
							limit: 100,
							name: 'img/[name].[ext]',
							publicPath: '../' // this will update the image path in extracted css
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|otf|ttf|eot)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'fonts/[name].[ext]',
							publicPath: '../' // this will update the font path in extracted css
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			devMode,
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
				HOST_ENV: JSON.stringify(process.env.HOST_ENV),
				ASSET_PATH: JSON.stringify(process.env.ASSET_PATH)
			}
		}),
		// Add mew config to new pages
		new HtmlWebpackPlugin({
			inject: false,
			filename: 'index.html',
			cache: true,
			minify: false,
			template: path.join(
				__dirname,
				`${packageJSON.paths.html}/index.html`
			) // listing page
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].en.css',
			minify: true
		}),
		new WebpackRTLPlugin({
			filename: 'css/[name].ar.css',
			minify: true
		}),
		// new StylelintPlugin(),
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery',
			jquery: 'jquery',
			'window.jQuery': 'jquery',
			'window.$': 'jquery'
		})
	].concat(...HTMLPages),
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	}
};
