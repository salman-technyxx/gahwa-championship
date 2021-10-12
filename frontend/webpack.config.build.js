const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackConfig = require('./webpack.config');
const packageJSON = require('./package.json');

const dirNode = 'node_modules';
const dirHtml = path.join(__dirname, `${packageJSON.paths.html}`);
const dirApp = path.join(__dirname, `${packageJSON.paths.root}/es6`);
const dirImgs = path.join(__dirname, `${packageJSON.paths.root}/img`);
const dirStyles = path.join(__dirname, `${packageJSON.paths.root}/sass`);

const minifycode = process.env.MINIFY === 'true';

class WatchRunPlugin {
	apply(compiler) {
		compiler.hooks.watchRun.tap('WatchRun', (comp) => {
			const changedTimes = comp.watchFileSystem.watcher.mtimes;
			console.log(
				'ignored',
				comp.watchFileSystem.watcher.watcherOptions.ignored
			);
			const changedFiles = Object.keys(changedTimes)
				.map(file => `\n  ${file}`)
				.join('');
			if (changedFiles.length) {
				console.log('====================================');
				console.log('NEW BUILD FILES CHANGED:', changedFiles);
				console.log('====================================');
			}
		});
	}
}

module.exports = merge(webpackConfig, {
	mode: 'production',
	devtool: 'source-map',
	entry: {
		base: `${dirStyles}/base.scss`
	},
	output: {
		path: path.resolve(__dirname, `${packageJSON.paths.root}`),
		filename: 'js/[name].js'
	},
	plugins: [
		// new WatchRunPlugin(),
		// Clean Dist folder
		new CleanWebpackPlugin([
			`${packageJSON.paths.root}/css`,
			`${packageJSON.paths.root}/js`,
			`${packageJSON.paths.root}/en`,
			`${packageJSON.paths.root}/ar`,
			`${packageJSON.paths.root}/index.html`,
		]),
		// uglifying prevents source map in production mode
		// new OptimizeCSSAssetsPlugin({
		// 	assetNameRegExp: /\.(sa|sc|c)ss$/g,
		// 	cssProcessor: require('cssnano'),
		// 	cssProcessorOptions: {
		// 		preset: ['default', { discardComments: { removeAll: true } }],
		// 		map: {
		// 			inline: false,
		// 			annotation: false,
		// 			sourcesContent: false
		// 		}
		// 	}
		// })
	],
	optimization: {
		// minimizer: [
		// 	new UglifyJsPlugin({
		// 		sourceMap: false,
		// 		uglifyOptions: {
		// 			output: {
		// 				comments: false
		// 			}
		// 		}
		// 	})
		// ]
	}
});
