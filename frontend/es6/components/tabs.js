/**
 * @fileoverview
 */
import $ from 'jquery';
import {
	$window, isRTL,
} from '../util/helpers';

/**
 * Characteristics Tabs
 * @class Tabs
 */

class Tabs {
	constructor() {
		this.selectors = {
			characteristicsTabs: '.js-tabs',
			acnhorTab: '.js-tab-acnhor',
			scrollWrapper: '.js-tabs-link',
		};
	}

	/**
     * Characteristics Tabs init Event
     * @function initEvent
     * @memberof Tabs
     * @returns {Void}
     */

	initEvent() {
		$window.on('load', () => {});
		$window.on('scroll', () => {});
		$window.on('resize', () => {});
	}

	/**
     * Characteristics Tabs Init method
     * @function characteristicsTabs
     * @memberof Tabs
     * @returns {Void}
     */

	characteristicsTabs() {
		this.$acnhorTab.on('click', (event) => {
			// Hide other Tabs on Click
			this.$acnhorTab.removeClass('activelink');
			// $('.tab-content').removeClass('active').addClass('hide');
			$('.tab-content').hide();

			const $this = $(event.currentTarget);
			const anchorPosition = $this[0].offsetLeft;
			const parentwrapperwidth = this.$scrollWrapper.outerWidth() / 2;
			const thisWidth = $this.outerWidth() / 2;
			// Set Anchor Position on click
			if (window.outerWidth < 1023) {
				if (isRTL) {
					this.$scrollWrapper.animate({ scrollLeft: anchorPosition - parentwrapperwidth + thisWidth + 6 }, 400);
				} else {
					this.$scrollWrapper.animate({ scrollLeft: anchorPosition - parentwrapperwidth + thisWidth - 8 }, 400);
				}
			}
			// Show Current Tabs on Click
			$this.addClass('activelink');
			const tagid = $this.data('tag');
			// $(`#${tagid}`).addClass('active').removeClass('hide');
			$(`#${tagid}`).fadeIn(600);
		});
	}

	/**
     * Characteristics Tabs init Selector
     * @function initSelector
     * @memberof Tabs
     * @returns {Void}
     */
	initSelector() {
		this.$characteristicsTabs = $(this.selectors.characteristicsTabs);
		this.$acnhorTab = $(this.selectors.acnhorTab);
		this.$scrollWrapper = $(this.selectors.scrollWrapper);
	}

	/**
     * Characteristics Tabs init method
     * @function init
     * @memberof Tabs
     * @returns {Void}
     */
	init() {
		this.initSelector();
		this.characteristicsTabs();
		this.initEvent();
	}
}

export default Tabs;
