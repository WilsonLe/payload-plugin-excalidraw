if(!self.define){let e,n={};const s=(s,c)=>(s=new URL(s+".js",c).href,n[s]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=n,document.head.appendChild(e)}else e=s,importScripts(s),n()})).then((()=>{let e=n[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(c,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(n[a])return;let o={};const r=e=>s(e,a),t={module:{uri:a},exports:o,require:r};n[a]=Promise.all(c.map((e=>t[e]||r(e)))).then((e=>(i(...e),o)))}}define(["./workbox-3631b453"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/style-BLgCNTHC.css",revision:null},{url:"excalidraw.umd.js",revision:"28a7af41fa55d3da771b1f063be4e9c0"},{url:"android-chrome-192x192.png",revision:"3d005c71b9ea629a8d137916a02ce9af"},{url:"apple-touch-icon.png",revision:"a9b855bc4fa588808a72c126fa9ade00"},{url:"favicon-16x16.png",revision:"6fc51d9533178efaec96f5c3c1f4c357"},{url:"favicon-32x32.png",revision:"1bcbbaf7639d13ce6e4abbd4a785f3dd"},{url:"manifest.webmanifest",revision:"c1a9bd95383a74f5c88e8b4b35e2f6a0"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/.+.woff2/,new e.CacheFirst({cacheName:"fonts",plugins:[new e.ExpirationPlugin({maxEntries:1e3,maxAgeSeconds:7776e3}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute(/fonts.css/,new e.StaleWhileRevalidate({cacheName:"fonts",plugins:[new e.ExpirationPlugin({maxEntries:50})]}),"GET"),e.registerRoute(/locales\/[^/]+.js/,new e.CacheFirst({cacheName:"locales",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/.chunk-.+.js/,new e.CacheFirst({cacheName:"chunk",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:7776e3})]}),"GET")}));
//# sourceMappingURL=sw.js.map
