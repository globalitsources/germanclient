//var heapdump = require("heapdump");

const path = require("path");
//import fs from 'fs'
import i18nConfig from "./service/i18n/i18n.config.ts";

export default {
  	sourcemap: { client: true, server: false },
  	head: {
    		title: "Monteurzimmer mit Garantie – deutschlandweit",
    		meta: [
      			{ charset: "utf-8" },
      			{ name: "viewport", content: "width=device-width, initial-scale=1" },
      			{
        			hid: "description",
        			name: "description",
        			content: process.env.npm_package_description || "",
      			},
      			{ name: "format-detection", content: "telephone=no" },
    		],
    		link: [
      			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      			{
        			rel: "preload",
					href: "https://back.zimmer-im-revier.de/fileadmin/header-images/main-bg.webp",
        			as: "image",
      			},
    		],
    		script: [
      			{
        			src: "https://kit.fontawesome.com/503cda1b26.js",
        			body: true,
        			async: true,
        			defer: true,
      			},
      			// {
        			// src: "https://www.google-analytics.com/analytics.js",
        			// body: true,
        			// async: true,
        			// defer: true,
      			// },
    		],
  	},
  	// Global CSS: https://go.nuxtjs.dev/config-css
  	css: ["@/assets/css/global.scss"],
  	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  	plugins: ["~/plugins/components"],
  	// Auto import components: https://go.nuxtjs.dev/config-components
  	//components: true,
  	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  	buildModules: [
    		// https://go.nuxtjs.dev/typescript
    		"@nuxt/typescript-build",
    		"@nuxt/image",
    		//"@nuxtjs/google-analytics",
  	],
  	// Modules: https://go.nuxtjs.dev/config-modules
  	modules: ["nuxt-typo3", "@nuxtjs/axios", "@nuxtjs/i18n", "@nuxtjs/gtm"],
  	i18nConfig,
  	// Build Configuration: https://go.nuxtjs.dev/config-build
  	build: {
    		publicPath: "/assets/",
    		render: {
      			compressor: false, // let nginx do the compression
    		},
    		html: {
      			minify: {
        			collapseBooleanAttributes: true,
        			decodeEntities: true,
					minifyCSS: true,
        			minifyJS: true,
        			processConditionalComments: true,
        			removeEmptyAttributes: true,
        			removeRedundantAttributes: true,
        			trimCustomFragments: true,
        			useShortDoctype: true,
        			preserveLineBreaks: false,
        			collapseWhitespace: true,
      			},
    		},
    		optimization: {
      			splitChunks: {
        			cacheGroups: {
          				styles: {
            					name: "styles",
            					test: /\.(css|vue)$/,
            					chunks: "all",
            					enforce: true,
          				},
        			},
      			},
    		},
    		minify: {
      			minifyCSS: true,
      			minifyJS: true,
    		},
    		extractCSS: true,
  	},
  	loading: { color: "#ff8700" },
  	typo3: {
		//baseURL: "https://typo3.ddev.site/",
		//baseURL: "https://be.production.zir.bogatyrev.de/",
		baseURL: "https://back.zimmer-im-revier.de/",
		forms: true,
		api: {
			//baseURL: "https://typo3.ddev.site/",
			//baseURL: "https://be.production.zir.bogatyrev.de/",
			baseURL: "https://back.zimmer-im-revier.de/",
			disable_ssl_verification: true,
		},
    	ssr: true,
  	},
  	// googleAnalytics: {
    	// 	id: "G-7CCB7RY41M",
    	// 	debug: {
      // 			enable: true,
      // 			sendHitTask: true,
    	// 	},
  	// },
 	gtm: {
    		id: "G-SXV19HTE5M",
    		enabled: true,
  	},
  	generate: { fallback: true },
  	image: {
    		provider: "static",
    		dir: "assets/images",
  	},
  	ssr: true,
  	components: {
    		dirs: [
      			"~/components",
      			"~/components/contentElements/custom",
      			"~/components/contentElements/typo3",
      			"~/components/UI",
      			"~/components/mixins",
      			"~/components/apiContent",
      			"~/components/backendLayouts",
    		],
  	},
  	target: "server",
  	typo3theme: {
    		layouts: false,
  	},
  	server: {
    		host: 'localhost', // default: localhost
    		port: 3000, // default: 3000

		// to make locale cert:
	// 	openssl genrsa 2048 > server.key
	// chmod 400 server.key
	// openssl req -new -x509 -nodes -sha256 -days 365 -key server.key -out server.crt

		// local only
		// 	https: {
		// 		key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
		// 		cert: fs.readFileSync(path.resolve(__dirname, 'server.crt')),
		// 		passphrase: ''
		// 	}
  	},
};

/*
const customDirectory = "./heapdumps";
const filename = path.join(
  customDirectory,
  `heapdump-${Date.now()}.heapsnapshot`
);

function generateFilename() {
  const timestamp = new Date().toISOString().replace(/:/g, "-");
  return path.join(customDirectory, `heapdump-${timestamp}.heapsnapshot`);
}

heapdump.writeSnapshot(generateFilename(), function (err, filename) {
  console.log("dump written to", filename);
});

setInterval(() => {
  heapdump.writeSnapshot(generateFilename(), function (err, filename) {
    console.log("dump written to", filename);
  });
}, 60 * 60 * 1000);
*/
