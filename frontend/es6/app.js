/* eslint-disable no-console */
import '../sass/index.scss';
// Lozad
import lozad from './util/lozad';
import {
	$body, lazyModule, $window, $document
} from './util/helpers';
import Polyfill from './polyfills';
import SiteCookie from './cookies';

window.isAppLoaded = window.isAppLoaded || false;

/**
 * App component
 * @class App
 */
class App {
	/**
	 * Initialise app
	 * @function init
	 */
	init() {
		// initialise polyfills
		Polyfill();
		// Load modules
		lazyModule();

		// lazy loads elements with default selector as '.lozad'
		const observer = lozad();
		observer.observe();

		$body.removeClass('body-hide');
		$document.on('ready', () => {
			$window.scrollTop(0);
			window.scrollTo(0, 0);
		});
		$window.on('unload', () => {
			$window.scrollTop(0);
		});

		// init Site cookies js
		this.SiteCookie = new SiteCookie();
		this.SiteCookie.init();
	}
}

/**
 * initialise app
 * @type function
 */
// eslint-disable-next-line func-names
export default (function () {
	// load CSS & thems
	if (!window.isAppLoaded) {
		// initialise app
		const gc = new App();
		gc.init();
		window.isAppLoaded = true;
	}
}());
