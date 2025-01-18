// @ts-check
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

/** @type {import("postcss-load-config").Config} */
export default {
	plugins: [tailwindcss(), autoprefixer()],
};
