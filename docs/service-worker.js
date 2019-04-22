/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "686fd4d82467ef01ed051cde8bc5d75e"
  },
  {
    "url": "android-icon-144x144.png",
    "revision": "3f67fa5da31e535b1364a659797d9a6b"
  },
  {
    "url": "android-icon-192x192.png",
    "revision": "9f5e536a36119d112319c4449e6fc0bd"
  },
  {
    "url": "android-icon-36x36.png",
    "revision": "644e17b7dc61ccf65892558b3fd7a8a1"
  },
  {
    "url": "android-icon-48x48.png",
    "revision": "698ed153c3b1d6c9367e3be0268f837b"
  },
  {
    "url": "android-icon-72x72.png",
    "revision": "1440799847335f98cbc81514b5d88edf"
  },
  {
    "url": "android-icon-96x96.png",
    "revision": "b126993c1a873de108e9fc3b73ccc505"
  },
  {
    "url": "apple-icon-114x114.png",
    "revision": "cc8ae8e98038ebac1c3cf2d4562edfdb"
  },
  {
    "url": "apple-icon-120x120.png",
    "revision": "103409c4324fd69d3fe72f43311e17af"
  },
  {
    "url": "apple-icon-144x144.png",
    "revision": "3f67fa5da31e535b1364a659797d9a6b"
  },
  {
    "url": "apple-icon-152x152.png",
    "revision": "a2bb41dfa69f19132623673fb748e454"
  },
  {
    "url": "apple-icon-180x180.png",
    "revision": "c01256bf9f61d33a351fe8b5f9922f72"
  },
  {
    "url": "apple-icon-57x57.png",
    "revision": "f86a5d12adcac1024570d67464765606"
  },
  {
    "url": "apple-icon-60x60.png",
    "revision": "634e58704cdc97230d27011e176b35e9"
  },
  {
    "url": "apple-icon-72x72.png",
    "revision": "1440799847335f98cbc81514b5d88edf"
  },
  {
    "url": "apple-icon-76x76.png",
    "revision": "5abf8c309b8116d6b7c2aa32c7bc57b4"
  },
  {
    "url": "apple-icon-precomposed.png",
    "revision": "98d6e6f49025b729e4c0655e1c7839f8"
  },
  {
    "url": "apple-icon.png",
    "revision": "98d6e6f49025b729e4c0655e1c7839f8"
  },
  {
    "url": "assets/css/0.styles.e5649451.css",
    "revision": "95022f7c9ccc9089cdd7e2f549027716"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/2.322583d0.js",
    "revision": "75db83e2dcbd61b655d291478498045f"
  },
  {
    "url": "assets/js/3.6a5f93b0.js",
    "revision": "67fbe13e4e4c614ccad20c85b57fd999"
  },
  {
    "url": "assets/js/4.d799b1d4.js",
    "revision": "9f204a753b2e13d55171d88b13c28497"
  },
  {
    "url": "assets/js/5.6ea43b3e.js",
    "revision": "5105ae1612c24d871d84c08db68dcde5"
  },
  {
    "url": "assets/js/6.17a3b134.js",
    "revision": "df7766a2c3d1a1247c1b1d36e547e1cf"
  },
  {
    "url": "assets/js/7.4c110b25.js",
    "revision": "bd3b59cf294d99ee1d4836c17f44302d"
  },
  {
    "url": "assets/js/8.df4c7493.js",
    "revision": "ece6b96291611c8f84094c7a072f7426"
  },
  {
    "url": "assets/js/app.bd9d8e4a.js",
    "revision": "66bca215c505d371462b1d4daa6049ef"
  },
  {
    "url": "favicon-16x16.png",
    "revision": "4f4d5ee8624b6253f7e3410f547a1208"
  },
  {
    "url": "favicon-32x32.png",
    "revision": "1906f206ab0cea09724bab00c57f0214"
  },
  {
    "url": "favicon-96x96.png",
    "revision": "b126993c1a873de108e9fc3b73ccc505"
  },
  {
    "url": "index.html",
    "revision": "b7c7ca8622ba0d8c5953ea4d02266170"
  },
  {
    "url": "learn/index.html",
    "revision": "42e61a023ca986aaa760a0fd25da842d"
  },
  {
    "url": "logo.png",
    "revision": "1d77ae715eafd41585ccfecc06d12783"
  },
  {
    "url": "ms-icon-144x144.png",
    "revision": "3f67fa5da31e535b1364a659797d9a6b"
  },
  {
    "url": "ms-icon-150x150.png",
    "revision": "edd81b6a29c99e6d8af63143b19e1fbd"
  },
  {
    "url": "ms-icon-310x310.png",
    "revision": "6307250da91024d09ec36d621fc042df"
  },
  {
    "url": "ms-icon-70x70.png",
    "revision": "4166e7c0b2eb67204e47247f2b89b995"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
