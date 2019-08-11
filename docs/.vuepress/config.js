module.exports = {
	title: 'Intelligo Framework',
	dest: './docs',
	locales: {
		// The key is the path for the locale to be nested under.
		// As a special case, the default locale can use '/' as its path.
		'/': {
			lang: 'en-US', 
			title: 'Intelligo Framework',
			description: 'Intelligo AI chatbot framework. Intelligo is a JavaScript Framework to build AI Chat bots.'
		},
		'/mn/': {
			lang: 'mn',
			title: 'Intelligo Framework',
			description: 'Intelligo AI chatbot framework. Хиймэл оюунтай чатбот хөгжүүлэхэд зориулсан framework.'
		}
	},
	themeConfig: {
		repo: 'https://github.com/intelligo-systems/intelligo',
		repoLabel: 'Github',
		docsDir: './docs',
		editLinks: true,
		logo: '/logo.png',
		
		locales: {
			'/': {
			  // text for the language dropdown
			  selectText: 'Languages',
			  // label for this locale in the language dropdown
			  label: 'English',
			  // text for the edit-on-github link
			  editLinkText: 'Edit this page on GitHub',
			  // config for Service Worker 
			  serviceWorker: {
				updatePopup: {
				  message: "New content is available.",
				  buttonText: "Refresh"
				}
			  },
			  // algolia docsearch options for current locale
			  algolia: {},
			  nav: [
				{ text: 'Home', link: '/' }, 
				{ text: 'Learn', link: '/learn/' }	
			  ]
			},
			'/mn/': {
			  selectText: 'Хэл солих',
			  label: 'Монгол хэл',
			  editLinkText: 'Энэ хуудасыг GitHub дээр засах',
			  serviceWorker: {
				updatePopup: {
				  message: "Шинэ өгөгдөл нэмэгдсэн байна.",
				  buttonText: "Шинэчлэх"
				}
			  },
			  nav: [
				{ text: 'Home', link: '/mn/' }, 
				{ text: 'Learn', link: '/mn/learn/' }
			  ],
			  algolia: {}
		
			}
		  },
		version: '1.0.0-alpha.47'
	},
	plugins: [
		[
			'@vuepress/plugin-pwa', {
				serviceWorker: true,
				updatePopup: true
			}
		],
		[
			'@vuepress/plugin-google-analytics',
			{
				ga: 'UA-111622042-3'
			}
		],
		[
			'vuepress-plugin-rss',
			{
				base_url: '/rss',
				site_url: 'https://intelligo.js.org',
				filter: frontmatter => frontmatter.date <= new Date(),
				count: 20
			}
		]
	],
	head: [
		[
			'link',
			{ rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' }
		],
		[
			'link',
			{ rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' }
		],
		[
			'link',
			{ rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' }
		],
		[
			'link',
			{ rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' }
		],
		[
			'link',
			{
				rel: 'apple-touch-icon',
				sizes: '114x114',
				href: '/apple-icon-114x114.png'
			}
		],
		[
			'link',
			{
				rel: 'apple-touch-icon',
				sizes: '120x120',
				href: '/apple-icon-120x120.png'
			}
		],
		[
			'link',
			{
				rel: 'apple-touch-icon',
				sizes: '144x144',
				href: '/apple-icon-144x144.png'
			}
		],
		[
			'link',
			{
				rel: 'apple-touch-icon',
				sizes: '152x152',
				href: '/apple-icon-152x152.png'
			}
		],
		[
			'link',
			{
				rel: 'apple-touch-icon',
				sizes: '180x180',
				href: '/apple-icon-180x180.png'
			}
		],
		[
			'link',
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '192x192',
				href: '/android-icon-192x192.png'
			}
		],
		[
			'link',
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				href: '/favicon-32x32.png'
			}
		],
		[
			'link',
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '96x96',
				href: '/favicon-96x96.png'
			}
		],
		[
			'link',
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				href: '/favicon-16x16.png'
			}
		],
		['link', { rel: 'manifest', href: '/manifest.json' }],
		
		['meta', { name: 'msapplication-TileColor', content: '#3e82f7' }],
		[
			'meta',
			{ name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' }
		],
		['meta', { name: 'theme-color', content: '#3e82f7' }],
		['meta', { name: 'keywords', content: 'ai, ai bot, chat, chatbot, messenger bot, bot framework, intelligo, чатбот, чат, бот, хиймэл оюун, чатбот хийх, чатбот хөгжүүлэх' }]	
	]
}