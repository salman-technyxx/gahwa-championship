import $ from 'jquery';
import {
	Resp, debounce, $window,
} from '../util/helpers';

/**
 * Form Header Menu component
 * @class Form Header Menu
 */
class HeaderMenu {
	constructor() {
		this.selectors = {
			header: '.js-header',
		};

		this.isMobile = Resp.isMobile;
		this.isTablet = Resp.isTablet;
	}

	/**
	 * Initialise events
	 * @function initEvents
	 */
	initEvent() {
		$window.on(
			'scroll',
			debounce(() => {
			}, 100)
		);
		$window.on(
			'resize',
			debounce(() => {
			}, 100)
		);
		$window.on('load', () => {
		});
	}

	/**
	 * Initialise Form Header Menu selectors
	 * @function initSelectors
	 */
	initSelectors() {
		this.$header = $(this.selectors.header);
	}

	/**
	 * Initialise Form Header Menu
	 * @function init
	 */
	init() {
		this.initSelectors();
		this.initEvent();
	}
}

export default HeaderMenu;
