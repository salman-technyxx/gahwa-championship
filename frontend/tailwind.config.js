const devMode = process.env.NODE_ENV === 'development';

module.exports = {
	purge: {
		enabled: true,
		content: ['./html/**/*.html']
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				neutral: {
					100: '#FFFFFF',
					900: '#000000',
				},
				primary: '#E89481',
				secondary: '#94645F',
				style1: '#8BAAA1',
				style2: '#B89F7C',
				style3: '#3F4C63',
				style3: '#343838'

			},
			fontFamily: {
				sans: ['FS Albert Arabic']
			},
			fontSize: {
				84: ['84px', {
					lineHeight: '1.1'
				}],
				64: ['64px', {
					lineHeight: '1.1'
				}],
				56: ['56px', {
					lineHeight: '1.1'
				}],
				48: ['48px', {
					lineHeight: '1.1'
				}],
				36: ['36px', {
					lineHeight: '1.1'
				}],
				32: ['32px', {
					lineHeight: '1.1'
				}],
				24: ['24px', {
					lineHeight: '1.1'
				}],
				20: ['20px', {
					lineHeight: '1.1'
				}],
				16: ['16px', {
					lineHeight: '1.1'
				}],
				10: ['10px', {
					lineHeight: '1.1'
				}],
			},
			letterSpacing: {
				'tracking-001': '0.01em',
			},
			gap: {
				gutter: '24px',
				gutterlg: '32px',
				gutterbeautiful: '202px',
			},
			padding: {
				column: '72px',
			},
			spacing: {
				section: '64px',
				section1: '128px',
			},
			screens: {
				'hover-hover': { raw: '(hover: hover)' }
			},
			opacity: {
				10: '0.1',
			},
			transitionDuration: {
				0: '0ms',
				2000: '2000ms',
			},
			zIndex: {
				1: 1,
				2: 2,
				3: 3,
				4: 4,
				5: 5,
				6: 6,
				7: 7,
				8: 8,
				9: 9,
				11: 11,
				12: 12,
				13: 13,
				14: 14,
				15: 15,
				auto: 'auto',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
