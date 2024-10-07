import { c as create_ssr_component, d as add_attribute, v as validate_component, e as escape, f as each } from './ssr-AsE10lUo.js';

let depth = 2;
let csrid = "og314";
const Graph = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let neighbours = [];
  return `<template><h1>Neighbours of ${escape(csrid)} up to depth ${escape(depth)}</h1> <ul>${each(neighbours, (neighbour) => {
    return `<li>${escape(neighbour)}</li>`;
  })}</ul></template>`;
});
const css = {
  code: "main.svelte-1vj22fo{min-height:100vh}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">console.log(\\"VISUALISE\\");\\nimport Graph from \\"../../components/graph.svelte\\";\\nlet searchQuery = \\"\\";\\nfunction logout() {\\n  alert(\\"Logging out...\\");\\n}\\nfunction editProfile() {\\n  alert(\\"Editing profile...\\");\\n}\\n<\/script>\\r\\n\\r\\n<main class=\\"flex flex-col items-center justify-start min-h-screen bg-gray-100 text-center\\">\\r\\n\\t<!-- Search Bar centered at the top of the page -->\\r\\n\\t<div class=\\"w-full flex justify-center p-2\\">\\r\\n\\t\\t<input\\r\\n\\t\\t\\tbind:value={searchQuery}\\r\\n\\t\\t\\ttype=\\"text\\"\\r\\n\\t\\t\\tplaceholder=\\"Search...\\"\\r\\n\\t\\t\\tclass=\\"w-1/3 p-4 px-10 rounded-3xl shadow-xl outline-none text-gray-700 placeholder-gray-500\\"\\r\\n\\t\\t/>\\r\\n\\t</div>\\r\\n\\r\\n\\t<!-- Top Bar with Edit Profile and Logout buttons (without background) -->\\r\\n\\t<div class=\\"w-fit flex justify-between items-center p-4 absolute top-0 right-0\\">\\r\\n\\t\\t<!-- Invisible placeholder to center buttons -->\\r\\n\\t\\t<div></div>\\r\\n\\r\\n\\t\\t<!-- Edit Profile and Logout Buttons -->\\r\\n\\t\\t<div class=\\"flex space-x-4\\">\\r\\n\\t\\t\\t<button\\r\\n\\t\\t\\t\\ton:click={editProfile}\\r\\n\\t\\t\\t\\tclass=\\"bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700\\"\\r\\n\\t\\t\\t>\\r\\n\\t\\t\\t\\tEdit Profile\\r\\n\\t\\t\\t</button>\\r\\n\\t\\t\\t<button\\r\\n\\t\\t\\t\\ton:click={logout}\\r\\n\\t\\t\\t\\tclass=\\"bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700\\"\\r\\n\\t\\t\\t>\\r\\n\\t\\t\\t\\tLog Out\\r\\n\\t\\t\\t</button>\\r\\n\\t\\t</div>\\r\\n\\t</div>\\r\\n\\r\\n\\t<!-- Dynamic Content: Nodes and Their Connections -->\\r\\n\\t<section class=\\"mt-12 w-2/3\\">\\r\\n\\t\\t<Graph />\\r\\n\\t</section>\\r\\n</main>\\r\\n\\r\\n<!-- Tailwind CSS for page layout and style -->\\r\\n<style>\\r\\n\\tmain {\\r\\n\\t\\tmin-height: 100vh;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAoDC,mBAAK,CACJ,UAAU,CAAE,KACb"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  console.log("VISUALISE");
  let searchQuery = "";
  $$result.css.add(css);
  return `<main class="flex flex-col items-center justify-start min-h-screen bg-gray-100 text-center svelte-1vj22fo"> <div class="w-full flex justify-center p-2"><input type="text" placeholder="Search..." class="w-1/3 p-4 px-10 rounded-3xl shadow-xl outline-none text-gray-700 placeholder-gray-500"${add_attribute("value", searchQuery)}></div>  <div class="w-fit flex justify-between items-center p-4 absolute top-0 right-0"> <div></div>  <div class="flex space-x-4"><button class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700" data-svelte-h="svelte-141yhnk">Edit Profile</button> <button class="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700" data-svelte-h="svelte-1jgfsi6">Log Out</button></div></div>  <section class="mt-12 w-2/3">${validate_component(Graph, "Graph").$$render($$result, {}, {}, {})}</section></main> `;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BUK2fFAP.js.map
