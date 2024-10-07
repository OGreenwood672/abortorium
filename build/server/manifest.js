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
		client: {"start":"_app/immutable/entry/start.BVaniErJ.js","app":"_app/immutable/entry/app.DkbcY1ta.js","imports":["_app/immutable/entry/start.BVaniErJ.js","_app/immutable/chunks/entry.DGxEFSZV.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/entry/app.DkbcY1ta.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/chunks/index.D9didIsE.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-CzSch1vK.js')),
			__memo(() => import('./chunks/1-Do8lgshy.js')),
			__memo(() => import('./chunks/2-kP5s1kFe.js')),
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
