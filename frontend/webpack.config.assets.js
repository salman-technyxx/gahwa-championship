const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackSVGSpritely = require('webpack-svg-spritely');
const packageJSON = require('./package.json');

const dirApp = path.join(__dirname, `${packageJSON.paths.root}/es6`);

module.exports = {
	mode: 'production',
	entry: {
		svg: [
			`${dirApp}/svg.js`,
		],
	},
	output: {
		path: path.resolve(__dirname, `${packageJSON.paths.root}/img/sprite`),
		filename: '[name].js',
	},
	module: {
		rules: [{
			test: /\.(svg)$/i,
			exclude: [
				/node_modules/,
				path.resolve(__dirname, `${packageJSON.paths.root}`, 'fonts')
			],
			use: [{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]'
				}
			}]
		}]
	},
	plugins: [
		// Clean Dist folder
		new CleanWebpackPlugin([
			`${packageJSON.paths.root}/img/sprite/`
		]),
		new WebpackSVGSpritely({
			filename: 'svg-sprite.svg',
			prefix: 'icon',
			insert: 'none',
		})
	],
	optimization: {
		minimize: true
	}
};
