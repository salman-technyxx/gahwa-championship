const path = require('path');
const merge = require('webpack-merge');
const bodyParser = require('body-parser');
const webpackConfig = require('./webpack.config');
const packageJSON = require('./package.json');

const dirStyles = path.join(__dirname, `${packageJSON.paths.root}/sass`);

// Additional config for development
// eslint-disable-next-line no-unused-vars
const addons = {
	writeToDisk: filePath => /(.css)$/.test(filePath) || /(.js)$/.test(filePath) || /(.map)$/.test(filePath),
	before(app) {
		app.use(bodyParser.json());
		app.post('*', bodyParser.json(), (req, res) => res.redirect(req.originalUrl));
	}
};
// dev config
module.exports = merge(webpackConfig, {
	mode: 'development',
	devtool: 'inline-source-map',
	// Webapck Devserver
	devServer: Object.assign({}, {
		historyApiFallback: true,
		contentBase: [
			path.join(__dirname, `${packageJSON.paths.root}`),
			path.join(__dirname, `${packageJSON.paths.root}/img`),
		],
		compress: true,
		open: true,
		host: 'localhost',
		port: 6060,
	})
});
