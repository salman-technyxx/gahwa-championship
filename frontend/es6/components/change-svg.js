/**
 * @fileoverview
 */
import $ from 'jquery';

/**
 * ChangeSvg Component
 * @class ChangeSvg
 */
class ChangeSvg {
	constructor() {
		this.selectors = {
			generalChangeSvg: '.js-change-svg',
		};
	}

	/**
     * ChangeSvg component initChangeSvg method
     * @function initChangeSvg
     * @memberof ChangeSvg
     * @returns {Void}
     */
	initChangeSvg() {
		this.composeSVG(this.$generalChangeSvg);
	}

	/**
     * ChangeSvg component composeSVG method
     * @function initChangeSvg
     * @memberof ChangeSvg
     * @returns {Void}
     */
	composeSVG(target) {
		const $currentTarget = $(target).map((e) => {
			this.img = $(target[e]);
			this.imgURL = this.img.attr('src');

			$.get(this.imgURL, (data) => {
				this.img = $(target[e]);
				this.imgID = this.img.attr('id');
				this.imgClass = this.img.attr('class');
				this.imgURL = this.img.attr('src');
				this.svg = $(data).find('svg');
				if (typeof this.imgID !== 'undefined') {
					this.svg = this.svg.attr('id', this.imgID);
				}
				if (typeof this.imgClass !== 'undefined') {
					this.svg = this.svg.attr('class', `${this.imgClass} replaced-svg`);
				}
				// Remove any invalid XML tags as per http://validator.w3.org
				this.svg = this.svg.removeAttr('xmlns:a');
				// Check if the viewport is set, else we gonna set it if we can.
				if (!this.svg.attr('viewBox') && this.svg.attr('height') && this.svg.attr('width')) {
					this.svg.attr('viewBox', `0 0 ${this.svg.attr('height')} ${this.svg.attr('width')}`);
				}
				// Replace image with new SVG
				$(this.img).replaceWith(this.svg);
			}, 'xml');
			return $currentTarget;
		});
	}

	/**
     * ChangeSvg component initSelectors method
     * @function initSelectors
     * @memberof ChangeSvg
     * @returns {Void}
     */
	initSelectors() {
		this.$generalChangeSvg = $(this.selectors.generalChangeSvg);
	}

	/**
     * Destroy events and clear memory
     * @function initEvents
     */
	destroy() {
		// Do somthing here
	}

	/**
     * ChangeSvg component initEvents method
     * @function initEvents
     * @memberof ChangeSvg
     * @returns {Void}
     */
	initEvents() {}

	/**
     * ChangeSvg component init method
     * @function init
     * @memberof ChangeSvg
     * @returns {Void}
     */
	init() {
		this.initSelectors();
		this.initChangeSvg();
		this.initEvents();
	}
}

export default ChangeSvg;
