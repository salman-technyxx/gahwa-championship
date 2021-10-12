/**
 * @fileoverview
 */
import $ from 'jquery';
import 'slick-carousel/slick/slick';
import '@fancyapps/fancybox';
import {
	isScrolledIntoView, $window, isRTL,
} from '../util/helpers';
import ChangeSvg from './change-svg';

/**
 * ProductSlider Component
 * @class ProductSlider
 */
class ProductSlider {
	constructor() {
		this.selectors = {
			productSlider: '.js-prod-img-slider',
			fancyItem: '.js-fancybox-item',
			fancyitemSelector: '.js-prod-img-slider .item a',
			productSecParent: '.view-btn',
		};
		this.svg = new ChangeSvg();
		this.winWidth = $window.outerWidth();
	}

	/**
     * Characteristics Tabs init Event
     * @function initEvent
     * @memberof Tabs
     * @returns {Void}
     */

	initEvent() {
		$window.on('resize', () => {
			this.winWidth = $window.outerWidth();
			$('.slick-initialized').slick('setPosition');
		});
		$window.on('load', () => {
			this.onscreenItems(this.$productSlider);
			this.fancyboxVue360(this.$productSecParent);
		});
		$window.on('scroll', () => {
			if (this.winWidth > 1023) {
				this.onscreenItems(this.$productSlider);
			}
		});
	}

	/**
     * ProductSlider component slider method
     * @function slider
     * @memberof ProductSlider
     * @returns {Void}
     */
	slider(target) {
		let arrowPrev = '';
		let arrowNext = '';
		if (isRTL) {
			arrowPrev = `<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style=""><img src="${window.publicPath}/img/svg/ic-long-arrow-right.svg" alt="caret-left" class="js-change-svg" /></button>`;
			arrowNext = `<button class="slick-next slick-arrow" aria-label="Next" type="button" style=""><img src="${window.publicPath}/img/svg/ic-long-arrow-left.svg" alt="caret-right" class="js-change-svg" /></button>`;
		} else {
			arrowPrev = `<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style=""><img src="${window.publicPath}/img/svg/ic-long-arrow-left.svg" alt="caret-left" class="js-change-svg" /></button>`;
			arrowNext = `<button class="slick-next slick-arrow" aria-label="Next" type="button" style=""><img src="${window.publicPath}/img/svg/ic-long-arrow-right.svg" alt="caret-right" class="js-change-svg" /></button>`;
		}
		target.each((index, element) => {
			const $element = $(element);
			$element.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: false,
				arrows: true,
				dots: true,
				fade: false,
				autoplay: false,
				autoplaySpeed: 4000,
				speed: 500,
				lazyLoad: 'ondemand',
				rtl: isRTL,
				prevArrow: arrowPrev,
				nextArrow: arrowNext,
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							arrows: false,
						}
					}
				]
			});
		});
	}

	/**
     * Set auto play on product slider
     * @function onscreenItems
     * @memberof ProductSlider
     * @returns {Void}
     */
	onscreenItems(target) {
		const $target = $(target);
		$target.each((i, ele) => {
			const $ele = $(ele);
			if (isScrolledIntoView($ele, 0, true)) {
				$ele.slick('slickSetOption', 'autoplay', true, true);
			} else {
				$ele.slick('slickSetOption', 'autoplay', false, true);
			}
		});
	}

	/**
     * Add fancybox on Slider images
     * @function fancyboxProduct
     * @memberof ProductSlider
     * @returns {Void}
     */
	fancyboxProduct(target) {
		const $target = $(target);
		$target.each((idx, ele) => {
			const $ele = $(ele);
			$ele.addClass(`js-fancy-box-slide-${idx + 1}`);
			const fancySelector = `.js-fancy-box-slide-${idx + 1} .item a`;
			$target.fancybox({
				selector: fancySelector,
				buttons: [
					'thumbs',
					'close'
				],
				infobar: false,
				btnTpl: {
					// Arrows
					arrowLeft:
					'<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg width="18" height="32" viewBox="0 0 18 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 30.3221L16.2607 32L0 15.9401L16.1393 0L17.8787 1.6779L3.4382 15.9401L18 30.3221Z" fill="black"/></svg></div></button>',
					arrowRight:
					'<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg width="18" height="32" viewBox="0 0 18 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 30.3221L1.73932 32L18 15.9401L1.86067 0L0.121347 1.6779L14.5618 15.9401L0 30.3221Z" fill="black"/></svg></div></button>',
					thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.966943 0C0.433711 0 0 0.433711 0 0.966943V6.41306C0 6.9463 0.433711 7.38001 0.966943 7.38001H6.41306C6.9463 7.38001 7.38001 6.9463 7.38001 6.41306V0.868177H7.37482C7.3252 0.381174 6.91278 0 6.41288 0H0.966943ZM0.471692 0.966943C0.471692 0.693958 0.693958 0.471692 0.966943 0.471692H6.41306C6.68605 0.471692 6.90832 0.693958 6.90832 0.966943L6.90813 6.31412V6.41288C6.90813 6.68587 6.68587 6.90813 6.41288 6.90813H0.966943C0.693958 6.90813 0.471692 6.68587 0.471692 6.41288V0.966943ZM9.58694 0C9.05371 0 8.62 0.433711 8.62 0.966943V6.41306C8.62 6.9463 9.05371 7.38001 9.58694 7.38001H15.0331C15.5663 7.38001 16 6.9463 16 6.41306V0.868177H15.9948C15.9452 0.381174 15.5328 0 15.0329 0H9.58694ZM9.09169 0.966943C9.09169 0.693958 9.31395 0.471692 9.58694 0.471692H15.0331C15.306 0.471692 15.5283 0.693958 15.5283 0.966943L15.5281 6.31412V6.41288C15.5281 6.68587 15.3059 6.90813 15.0329 6.90813H9.58694C9.31395 6.90813 9.09169 6.68587 9.09169 6.41288V0.966943ZM0.966943 8.62C0.433711 8.62 0 9.05371 0 9.58694V15.0331C0 15.5663 0.433711 16 0.966943 16H6.41306C6.9463 16 7.38001 15.5663 7.38001 15.0331V9.5869C7.3798 9.05352 6.9463 8.62 6.41288 8.62H0.966943ZM0.471692 9.58694C0.471692 9.31395 0.693958 9.09169 0.966943 9.09169H6.41306C6.68605 9.09169 6.90832 9.31395 6.90832 9.58694L6.90813 14.9341V15.0329C6.90813 15.3059 6.68587 15.5281 6.41288 15.5281H0.966943C0.693958 15.5281 0.471692 15.3059 0.471692 15.0329V9.58694ZM9.58694 8.62C9.05371 8.62 8.62 9.05371 8.62 9.58694V15.0331C8.62 15.5663 9.05354 15.9998 9.58694 15.9998H15.0331C15.5663 15.9998 16 15.5661 16 15.0329V9.58694C16 9.05371 15.5663 8.62 15.0331 8.62H9.58694ZM9.09169 9.58694C9.09169 9.31395 9.31395 9.09169 9.58694 9.09169H15.0331C15.306 9.09169 15.5283 9.31395 15.5283 9.58694V15.0331C15.5283 15.306 15.306 15.5283 15.0331 15.5283H9.58694C9.31395 15.5283 9.09169 15.306 9.09169 15.0331V9.58694Z" fill="#E6E6E6"/></svg></button>'
				},
			});
		});
	}

	/**
     * Add fancybox of Vue 360
     * @function fancyboxVue360
     * @memberof ProductSlider
     * @returns {Void}
     */
	fancyboxVue360(target) {
		const $target = $(target);
		$target.each((idx, ele) => {
			const $ele = $(ele);
			$ele.addClass(`js-fancy-box-view-${idx + 1}`);
			const fancySelector = `.js-fancy-box-view-${idx + 1} ul li:nth-child(2) a`;
			$target.fancybox({
				selector: fancySelector,
				buttons: [
					'thumbs',
					'close'
				],
				infobar: false,
				btnTpl: {
					// Arrows
					arrowLeft:
					'<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg width="18" height="32" viewBox="0 0 18 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 30.3221L16.2607 32L0 15.9401L16.1393 0L17.8787 1.6779L3.4382 15.9401L18 30.3221Z" fill="black"/></svg></div></button>',
					arrowRight:
					'<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg width="18" height="32" viewBox="0 0 18 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 30.3221L1.73932 32L18 15.9401L1.86067 0L0.121347 1.6779L14.5618 15.9401L0 30.3221Z" fill="black"/></svg></div></button>',
					thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.966943 0C0.433711 0 0 0.433711 0 0.966943V6.41306C0 6.9463 0.433711 7.38001 0.966943 7.38001H6.41306C6.9463 7.38001 7.38001 6.9463 7.38001 6.41306V0.868177H7.37482C7.3252 0.381174 6.91278 0 6.41288 0H0.966943ZM0.471692 0.966943C0.471692 0.693958 0.693958 0.471692 0.966943 0.471692H6.41306C6.68605 0.471692 6.90832 0.693958 6.90832 0.966943L6.90813 6.31412V6.41288C6.90813 6.68587 6.68587 6.90813 6.41288 6.90813H0.966943C0.693958 6.90813 0.471692 6.68587 0.471692 6.41288V0.966943ZM9.58694 0C9.05371 0 8.62 0.433711 8.62 0.966943V6.41306C8.62 6.9463 9.05371 7.38001 9.58694 7.38001H15.0331C15.5663 7.38001 16 6.9463 16 6.41306V0.868177H15.9948C15.9452 0.381174 15.5328 0 15.0329 0H9.58694ZM9.09169 0.966943C9.09169 0.693958 9.31395 0.471692 9.58694 0.471692H15.0331C15.306 0.471692 15.5283 0.693958 15.5283 0.966943L15.5281 6.31412V6.41288C15.5281 6.68587 15.3059 6.90813 15.0329 6.90813H9.58694C9.31395 6.90813 9.09169 6.68587 9.09169 6.41288V0.966943ZM0.966943 8.62C0.433711 8.62 0 9.05371 0 9.58694V15.0331C0 15.5663 0.433711 16 0.966943 16H6.41306C6.9463 16 7.38001 15.5663 7.38001 15.0331V9.5869C7.3798 9.05352 6.9463 8.62 6.41288 8.62H0.966943ZM0.471692 9.58694C0.471692 9.31395 0.693958 9.09169 0.966943 9.09169H6.41306C6.68605 9.09169 6.90832 9.31395 6.90832 9.58694L6.90813 14.9341V15.0329C6.90813 15.3059 6.68587 15.5281 6.41288 15.5281H0.966943C0.693958 15.5281 0.471692 15.3059 0.471692 15.0329V9.58694ZM9.58694 8.62C9.05371 8.62 8.62 9.05371 8.62 9.58694V15.0331C8.62 15.5663 9.05354 15.9998 9.58694 15.9998H15.0331C15.5663 15.9998 16 15.5661 16 15.0329V9.58694C16 9.05371 15.5663 8.62 15.0331 8.62H9.58694ZM9.09169 9.58694C9.09169 9.31395 9.31395 9.09169 9.58694 9.09169H15.0331C15.306 9.09169 15.5283 9.31395 15.5283 9.58694V15.0331C15.5283 15.306 15.306 15.5283 15.0331 15.5283H9.58694C9.31395 15.5283 9.09169 15.306 9.09169 15.0331V9.58694Z" fill="#E6E6E6"/></svg></button>'
				},
			});
		});
	}

	/**
     * LifeOfResidents component initSlick method
     * @function initSlick
     * @memberof LifeOfResidents
     * @returns {Void}
     */
	initSlick() {
		if (!this.$productSlider.hasClass('slick-initialized')) {
			this.slider(this.$productSlider);
		}
		this.fancyboxProduct(this.$productSlider);
	}

	/**
		 * LifeOfResidents component initSelectors method
		 * @function initSelectors
		 * @memberof LifeOfResidents
		 * @returns {Void}
		 */
	initSelectors() {
		this.$productSlider = $(this.selectors.productSlider);
		this.$fancyItem = $(this.selectors.fancyItem);
		this.$productSecParent = $(this.selectors.productSecParent);
	}

	/**
		 * LifeOfResidents component init method
		 * @function init
		 * @memberof LifeOfResidents
		 * @returns {Void}
		 */
	init() {
		this.initSelectors();
		this.initSlick();
		this.svg.init();
		this.initEvent();
	}
}

export default ProductSlider;
