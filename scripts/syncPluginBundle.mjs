import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const rootManifestPath = path.join(repoRoot, ".codex-plugin", "plugin.json");
const marketplacePath = path.join(repoRoot, ".agents", "plugins", "marketplace.json");

const rootManifest = JSON.parse(readFileSync(rootManifestPath, "utf8"));

if (!rootManifest.name) {
	throw new Error(`Missing plugin name in ${rootManifestPath}`);
}

const pluginName = rootManifest.name;
const bundleRoot = path.join(repoRoot, "plugins", pluginName);
const bundleManifestDir = path.join(bundleRoot, ".codex-plugin");
const bundleManifestPath = path.join(bundleManifestDir, "plugin.json");
const bundleSkillsPath = path.join(bundleRoot, "skills");
const bundleAssetsPath = path.join(bundleRoot, "assets");

rmSync(bundleRoot, { force: true, recursive: true });
mkdirSync(bundleManifestDir, { recursive: true });

writeFileSync(bundleManifestPath, `${JSON.stringify(rootManifest, null, "\t")}\n`);
cpSync(path.join(repoRoot, "skills"), bundleSkillsPath, { recursive: true });

if (existsSync(path.join(repoRoot, "assets"))) {
	cpSync(path.join(repoRoot, "assets"), bundleAssetsPath, { recursive: true });
}

const marketplace = {
	name: pluginName,
	interface: {
		displayName: rootManifest.interface?.displayName ?? pluginName,
	},
	plugins: [
		{
			name: pluginName,
			source: {
				source: "local",
				path: `./plugins/${pluginName}`,
			},
			policy: {
				installation: "AVAILABLE",
				authentication: "ON_INSTALL",
			},
			category: rootManifest.interface?.category ?? "Productivity",
		},
	],
};

mkdirSync(path.dirname(marketplacePath), { recursive: true });
writeFileSync(marketplacePath, `${JSON.stringify(marketplace, null, "\t")}\n`);
