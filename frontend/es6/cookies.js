import $ from 'jquery';

class SiteCookie {
	constructor() {
		this.selectors = {
			cookieDiv: '.cookie',
			acceptBtn: '.btnAccept',
			rejectBtn: '.btnReject'
		};
	}

	/**
     * create cookie
     * @function createCookie
     */
	createCookie(name, value, days) {
		let expires;

		if (days) {
			const date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = `; expires=${date.toGMTString()}`;
		} else {
			expires = '';
		}
		document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}${expires}; path=/`;
	}

	/**
     * read cookie
     * @function readCookie
     */
	readCookie(name) {
		const nameEQ = `${encodeURIComponent(name)}=`;
		const ca = document.cookie.split(';');
		// eslint-disable-next-line no-plusplus
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === ' ') c = c.substring(1, c.length);

			if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
		}
		return null;
	}

	/**
     * show cookie msg
     * @function showMsg
     */
	showMsg() {
		this.$cookieEle.show();
	}

	/**
     * hide cookie msg
     * @function hideMsg
     */
	hideMsg() {
		this.$cookieEle.hide();
	}

	/**
     * init events
     * @function initEvents
     */
	initEvent() {
		if (!this.readCookie('cookie-policy')) {
			this.showMsg();
		} else {
			this.hideMsg();
		}

		this.$acceptBtnEle.on('click', () => {
			this.createCookie('cookie-policy', 1, 30);
			this.hideMsg();
		});

		this.$rejectBtnEle.on('click', () => {
			this.hideMsg();
		});
	}

	/**
     * init selectors
     * @function initSelectors
     */
	initSelectors() {
		this.$cookieEle = $(this.selectors.cookieDiv);
		this.$acceptBtnEle = $(this.selectors.acceptBtn);
		this.$rejectBtnEle = $(this.selectors.rejectBtn);
	}

	/**
	 * Initialize components
	 * @function init
	 * @public
	 */
	init() {
		this.initSelectors();
		this.initEvent();
	}
}

export default SiteCookie;
