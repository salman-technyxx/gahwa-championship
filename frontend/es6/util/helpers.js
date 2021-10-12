/**
 * Commonly used constants and functions.
 *
 * @module Helpers
 */

import $ from 'jquery';

/**
 * Cache document.
 *
 * @constant
 * @type {jQuery}
 */
export const $document = $(document);

/**
 * Cache window.
 *
 * @constant
 * @type {jQuery}
 */
export const $window = $(window);

/**
 * Css class names.
 *
 * @constant
 * @type {Object}
 */
export const cssClass = {
	show: 'd-block',
	hide: 'd-none',
	active: 'active'
};
/**
 * Cache body DOM element.
 *
 * @constant
 * @type {jQuery}
 */
export const $body = $('.gc-body');
/**
 * Cache header.
 *
 * @constant
 * @type {jQuery}
 */
export const $header = $('.gc-header');

/**
 * Cache footer.
 *
 * @constant
 * @type {jQuery}
 */
export const $footer = $('.gc-footer');

/**
 * Elements for cross-browser window scroll.
 *
 * @constant
 * @type {jQuery}
 */
export const $scrolledElements = $('html, body');

/**
 * Window width.
 *
 * @constant
 * @type {Number}
 */
export const winWidth = $window.width();

/**
 * Checks if RTL .
 *
 * @constant
 * @type {Number}
 */
export const isRTL = ($('html').attr('dir') === 'rtl');


/**
 * Detect current page.
 *
 * @constant
 * @type {String}
 */
export const currentPage = $body.find('main').data('page');

/**
 * Check if element is in viewport.
 *
 * @param {jQuery} $element
 * @param {Boolean} [fullyInView = false] - element should be fully in viewport?
 * @param {Number} [offsetTop = 0]
 * @returns {Boolean}
 */
export const isScrolledIntoView = (
	$element,
	offsetTop = 0,
	fullyInView = false
) => {
	const pageTop = $window.scrollTop();
	const pageBottom = pageTop + $window.height();
	const elementTop = $element.offset().top;
	const elementBottom = elementTop + $element.height();

	if (fullyInView) return pageTop < elementTop && pageBottom > elementBottom;

	return elementTop + offsetTop <= pageBottom && elementBottom >= pageTop;
};

/**
 * Check specified item to be target of the event.
 *
 * @param {Object} e - Event object.
 * @param {jQuery} item - Item to compare with.
 * @returns {Boolean} - Indicate whether clicked target is the specified item or not.
 */
export const checkClosest = (e, item) => $(e.target).closest(item).length > 0;

/**
 * Match media device indicator.
 */
export class Resp {
	/**
     * Get window's current width.
     *
     * @get
     * @static
     * @return {Number}
     */
	static get currWidth() {
		return window.innerWidth;
	}

	/**
     * Detect touch events.
     *
     * @get
     * @static
     * @return {Boolean}
     */
	static get isTouch() {
		return 'ontouchstart' in window;
	}

	/**
     * Detect desktop device.
     *
     * @get
     * @static
     * @return {Boolean}
     */
	static get isDesk() {
		return window.matchMedia('(min-width: 1024px)').matches;
	}

	/**
     * Detect tablet device.
     *
     * @get
     * @static
     * @return {Boolean}
     */
	static get isTablet() {
		return window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;
	}

	/**
     * Detect mobile device.
     *
     * @get
     * @static
     * @return {Boolean}
     */
	static get isMobile() {
		return window.matchMedia('(max-width: 767px)').matches;
	}
}

/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered.
 *
 * @param {Function} func
 * @param {Object} context
 * @param {Number} wait
 * @param {Boolean} [immediate]
 * @returns {Function}
 */
export const debounce = (func, context, wait, immediate) => {
	let timeout;

	// eslint-disable-next-line func-names
	return function () {
		// eslint-disable-next-line prefer-rest-params
		const args = arguments;

		const later = () => {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};

		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

/**
 * Throttle function.
 *
 * @param {Function} fn
 * @param {Number} [threshold]
 * @param {Object} [scope]
 * @returns {Function}
 */
export const throttle = (fn, threshold = 250, scope) => {
	let last;
	let deferTimer;

	// eslint-disable-next-line func-names
	return function () {
		const context = scope || this;
		const now = +new Date();
		// eslint-disable-next-line prefer-rest-params
		const args = arguments;

		if (last && now < last + threshold) {
			clearTimeout(deferTimer);
			deferTimer = setTimeout(() => {
				last = now;
				fn.apply(context, args);
			}, threshold);
		} else {
			last = now;
			fn.apply(context, args);
		}
	};
};

/**
 * Modules
 */
export const gc = {};
gc.comp = gc.comp || {};
gc.comp.initialsed = gc.comp.initialsed || {};
window.gc = gc;

/**
 * component loader
 *
 * @param {Function} fn
 * @param {Number} [threshold]
 * @param {Object} [scope]
 * @returns {Function}
 */
export const pageModules = () => {
	const $modules = $('.gc-component');
	const modulesList = {};

	$modules.each((idx) => {
		const $selector = $modules.eq(idx);
		const name = $selector.data('comp-name');

		if (name !== undefined && !Object.prototype.hasOwnProperty.call(modulesList, name)) {
			modulesList[name] = {
				name
			};
		}
	});

	return modulesList;
};

/**
 * component loader
 *
 * @param {Function} fn
 * @param {Number} [threshold]
 * @param {Object} [scope]
 * @returns {Function}
 */
export const lazyModule = () => {
	const modulesList = pageModules();
	Object.keys(modulesList).map((item) => {
		const compName = item || null;

		if (compName) {
			import(/* webpackChunkName: "[request]" */ `../components/${compName}`)
				.then((Module) => {
					if (Module && Module.default) {
						gc.comp[compName] = {
							name: Module.default.name,
							module: Module.default,
							// eslint-disable-next-line new-cap
							instance: new Module.default()
						};

						if (gc.comp[compName].instance && gc.comp[compName].instance.init) {
							gc.comp[compName].instance.init();
						}
					}
					return gc;
				})
				.catch(err => console.log(`failed to load module ${err}`));
		}
		return gc;
	});
};

/**
 * component item in view port function
 *
 * @param {Function} fn
 * @param {Number} [threshold]
 * @param {Object} [scope]
 * @returns {Function}
 */
export const isInViewport = (elem) => {
	const bounding = elem[0].getBoundingClientRect();
	return (
		bounding.top >= 0
		&& bounding.left >= 0
		&& bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
		&& bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};

/**
 * get string of url parameters
 *
 * @param {ParameterName} param
 * @returns {Function}
 */
export const getParaString = (param) => {
	const urlParams = new URLSearchParams(window.location.search);
	return (urlParams.get(param));
};
