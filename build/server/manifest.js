const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "collegeroots/_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.B1kbk8bO.js","app":"_app/immutable/entry/app.B8FAemMP.js","imports":["_app/immutable/entry/start.B1kbk8bO.js","_app/immutable/chunks/entry.H7K0CHKP.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/entry/app.B8FAemMP.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/chunks/index.D9didIsE.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-CzSch1vK.js')),
			__memo(() => import('./chunks/1-D6-n9QT-.js')),
			__memo(() => import('./chunks/2-CXek0EI1.js')),
			__memo(() => import('./chunks/3-Ctr2DRBH.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/database",
				pattern: /^\/database\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-D-Mmcfi7.js'))
			},
			{
				id: "/visualiser",
				pattern: /^\/visualiser\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "/collegeroots";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
