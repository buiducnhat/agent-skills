import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm"],
	target: "node18",
	outDir: "dist",
	clean: true,
	dts: false,
	sourcemap: false,
	minify: false,
	outputOptions: {
		entryFileNames: "[name].js",
	},
	deps: {
		alwaysBundle: ["@clack/prompts", "@clack/core", "picocolors", "sisteransi"],
		onlyAllowBundle: false,
	},
	banner: "#!/usr/bin/env node",
});
