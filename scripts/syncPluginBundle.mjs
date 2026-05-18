import {
	cpSync,
	existsSync,
	mkdirSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const rootManifestPath = path.join(
	repoRoot,
	"./plugins/cobrew/.codex-plugin",
	"plugin.json",
);
const marketplacePath = path.join(
	repoRoot,
	".agents",
	"plugins",
	"marketplace.json",
);
const claudeMarketplacePath = path.join(
	repoRoot,
	".claude-plugin",
	"marketplace.json",
);

const rootManifest = JSON.parse(readFileSync(rootManifestPath, "utf8"));

if (!rootManifest.name) {
	throw new Error(`Missing plugin name in ${rootManifestPath}`);
}

const pluginName = rootManifest.name;
const bundleRoot = path.join(repoRoot, "plugins", pluginName);
const bundleCodexManifestDir = path.join(bundleRoot, ".codex-plugin");
const bundleCodexManifestPath = path.join(
	bundleCodexManifestDir,
	"plugin.json",
);
const bundleClaudeManifestDir = path.join(bundleRoot, ".claude-plugin");
const bundleClaudeManifestPath = path.join(
	bundleClaudeManifestDir,
	"plugin.json",
);
const bundleSkillsPath = path.join(bundleRoot, "skills");
const bundleAssetsPath = path.join(bundleRoot, "assets");

rmSync(bundleRoot, { force: true, recursive: true });
mkdirSync(bundleCodexManifestDir, { recursive: true });
mkdirSync(bundleClaudeManifestDir, { recursive: true });

writeFileSync(
	bundleCodexManifestPath,
	`${JSON.stringify(rootManifest, null, "\t")}\n`,
);

const claudeManifest = {
	name: rootManifest.name,
	version: rootManifest.version,
	description: rootManifest.description,
	author: rootManifest.author,
	homepage: rootManifest.homepage,
	repository: rootManifest.repository,
	license: rootManifest.license,
	keywords: rootManifest.keywords,
};

writeFileSync(
	bundleClaudeManifestPath,
	`${JSON.stringify(claudeManifest, null, "\t")}\n`,
);

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

const claudeMarketplace = {
	name: pluginName,
	owner: {
		name: rootManifest.author?.name ?? pluginName,
		...(rootManifest.author?.email ? { email: rootManifest.author.email } : {}),
	},
	description: rootManifest.description,
	version: rootManifest.version,
	plugins: [
		{
			name: pluginName,
			source: `./plugins/${pluginName}`,
			description: rootManifest.description,
			author: rootManifest.author,
			homepage: rootManifest.homepage,
			repository: rootManifest.repository,
			license: rootManifest.license,
			keywords: rootManifest.keywords,
			category: rootManifest.interface?.category ?? "Productivity",
		},
	],
};

mkdirSync(path.dirname(claudeMarketplacePath), { recursive: true });
writeFileSync(
	claudeMarketplacePath,
	`${JSON.stringify(claudeMarketplace, null, "\t")}\n`,
);
