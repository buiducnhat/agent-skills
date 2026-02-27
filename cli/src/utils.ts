import fs from "node:fs";
import path from "node:path";
import { log, spinner } from "@clack/prompts";
import {
	computeCustomSkills,
	computeDeprecatedSkills,
	getInstalledSkillNames,
	getTemplateSkillNames,
	readManifest,
	writeManifest,
} from "./manifest.js";

export interface CliArgs {
	agents?: string;
	nonInteractive: boolean;
	help: boolean;
	version: boolean;
}

export function parseArgs(argv: string[]): CliArgs {
	const args: CliArgs = {
		nonInteractive: false,
		help: false,
		version: false,
	};

	for (let i = 0; i < argv.length; i++) {
		switch (argv[i]) {
			case "--agents":
				args.agents = argv[++i];
				break;
			case "--non-interactive":
				args.nonInteractive = true;
				break;
			case "--help":
			case "-h":
				args.help = true;
				break;
			case "--version":
			case "-v":
				args.version = true;
				break;
		}
	}

	if (args.agents) {
		args.nonInteractive = true;
	}

	return args;
}

export function copyDirectory(src: string, dest: string): void {
	fs.mkdirSync(dest, { recursive: true });

	const entries = fs.readdirSync(src, { withFileTypes: true });
	for (const entry of entries) {
		const srcPath = path.join(src, entry.name);
		const destPath = path.join(dest, entry.name);

		if (entry.isDirectory()) {
			copyDirectory(srcPath, destPath);
		} else {
			fs.copyFileSync(srcPath, destPath);
		}
	}
}

export function copyDirectoryExcluding(
	src: string,
	dest: string,
	excludeNames: Set<string>,
): void {
	fs.mkdirSync(dest, { recursive: true });
	const entries = fs.readdirSync(src, { withFileTypes: true });
	for (const entry of entries) {
		if (excludeNames.has(entry.name)) {
			continue;
		}
		const srcPath = path.join(src, entry.name);
		const destPath = path.join(dest, entry.name);
		if (entry.isDirectory()) {
			copyDirectory(srcPath, destPath);
		} else {
			fs.copyFileSync(srcPath, destPath);
		}
	}
}

export async function copyTemplates(
	tempDir: string,
	projectDir: string,
	action: "fresh" | "update",
): Promise<void> {
	const s = spinner();
	s.start("Copying templates to your project...");

	const templatesDir = path.join(tempDir, "templates");
	const srcRuler = path.join(templatesDir, ".ruler");
	const srcClaude = path.join(templatesDir, ".claude");
	const destRuler = path.join(projectDir, ".ruler");
	const destClaude = path.join(projectDir, ".claude");

	const templateSkills = getTemplateSkillNames(tempDir);
	const existingManifest = readManifest(projectDir);
	const manifestSkills = existingManifest?.skills ?? [];
	const installedSkills = getInstalledSkillNames(projectDir);
	const deprecatedSkills = computeDeprecatedSkills(
		existingManifest,
		templateSkills,
	);
	const customSkills = computeCustomSkills(
		installedSkills,
		manifestSkills,
		templateSkills,
	);

	// Remove deprecated library skills for update/fresh when .ruler exists
	if (deprecatedSkills.length > 0) {
		for (const skill of deprecatedSkills) {
			const skillPath = path.join(destRuler, "skills", skill);
			if (fs.existsSync(skillPath)) {
				fs.rmSync(skillPath, { recursive: true, force: true });
			}
		}
		log.info(
			`Removing ${deprecatedSkills.length} deprecated library skill(s): ${deprecatedSkills.join(
				", ",
			)}`,
		);
	}

	if (action === "fresh") {
		let rulerBackup: string | undefined;
		let claudeBackup: string | undefined;

		if (fs.existsSync(destRuler)) {
			rulerBackup = `${destRuler}.backup-${Date.now()}`;
			fs.renameSync(destRuler, rulerBackup);
			log.info(`Backed up existing .ruler/ to ${path.basename(rulerBackup)}`);
		}
		if (fs.existsSync(destClaude)) {
			claudeBackup = `${destClaude}.backup-${Date.now()}`;
			fs.renameSync(destClaude, claudeBackup);
			log.info(`Backed up existing .claude/ to ${path.basename(claudeBackup)}`);
		}

		if (fs.existsSync(srcRuler)) {
			copyDirectory(srcRuler, destRuler);
		}

		// Restore custom skills from backup if present
		if (rulerBackup && customSkills.length > 0) {
			for (const skill of customSkills) {
				const srcSkill = path.join(rulerBackup, "skills", skill);
				const destSkill = path.join(destRuler, "skills", skill);
				if (fs.existsSync(srcSkill)) {
					copyDirectory(srcSkill, destSkill);
				}
			}
			log.info(
				`Preserving ${customSkills.length} custom skill(s): ${customSkills.join(
					", ",
				)}`,
			);
		}

		if (fs.existsSync(srcClaude)) {
			copyDirectory(srcClaude, destClaude);
		}
	} else {
		// update mode (or first install treated as update when .ruler does not yet exist)
		if (!fs.existsSync(destRuler)) {
			// First install: copy everything and write manifest
			if (fs.existsSync(srcRuler)) {
				copyDirectory(srcRuler, destRuler);
			}
			if (fs.existsSync(srcClaude)) {
				copyDirectory(srcClaude, destClaude);
			}
			if (templateSkills.length > 0) {
				writeManifest(projectDir, templateSkills);
			}
			makeScriptsExecutable(path.join(destRuler, "scripts"));
			s.stop("Copied templates to project");
			return;
		}

		// Existing install: update .ruler except skills, then update skills individually
		if (fs.existsSync(srcRuler)) {
			copyDirectoryExcluding(srcRuler, destRuler, new Set<string>(["skills"]));

			const srcSkillsDir = path.join(srcRuler, "skills");
			const destSkillsDir = path.join(destRuler, "skills");
			if (fs.existsSync(srcSkillsDir)) {
				fs.mkdirSync(destSkillsDir, { recursive: true });
				for (const skill of templateSkills) {
					const srcSkill = path.join(srcSkillsDir, skill);
					const destSkill = path.join(destSkillsDir, skill);
					if (fs.existsSync(srcSkill)) {
						copyDirectory(srcSkill, destSkill);
					}
				}
			}
		}

		if (customSkills.length > 0) {
			log.info(
				`Preserving ${customSkills.length} custom skill(s): ${customSkills.join(
					", ",
				)}`,
			);
		}

		if (fs.existsSync(srcClaude)) {
			copyDirectory(srcClaude, destClaude);
		}
	}

	if (templateSkills.length > 0) {
		writeManifest(projectDir, templateSkills);
	}

	// Make scripts executable
	makeScriptsExecutable(path.join(destRuler, "scripts"));

	s.stop("Copied templates to project");
}

export function ensureRulerScripts(tempDir: string, projectDir: string): void {
	const srcScripts = path.join(tempDir, "templates", ".ruler", "scripts");
	const destScripts = path.join(projectDir, ".ruler", "scripts");

	if (!fs.existsSync(srcScripts)) {
		return;
	}

	copyDirectory(srcScripts, destScripts);
	makeScriptsExecutable(destScripts);
}

function makeScriptsExecutable(scriptsDir: string): void {
	if (!fs.existsSync(scriptsDir)) {
		return;
	}

	for (const script of fs
		.readdirSync(scriptsDir)
		.filter((fileName) => fileName.endsWith(".sh"))) {
		fs.chmodSync(path.join(scriptsDir, script), 0o755);
	}
}

export function printHelp(): void {
	console.log(`
  @buiducnhat/agent-skills - Install AI agent skills for coding assistants

  Usage: npx @buiducnhat/agent-skills [options]

  Options:
    --agents <list>      Comma-separated agent IDs (e.g., claude,cursor,copilot)
    --non-interactive    Skip all prompts, use defaults
    -h, --help           Show this help message
    -v, --version        Show version

  Examples:
    npx @buiducnhat/agent-skills
    npx @buiducnhat/agent-skills --agents claude,cursor
    npx @buiducnhat/agent-skills --agents claude --non-interactive

  Supported agents:
    claude, copilot, cursor, windsurf, codex, gemini-cli, amp, cline, roo,
    aider, antigravity, pi, jules, kiro, kilocode, crush, amazonqcli,
    firebase, openhands, junie, jetbrains-ai, augmentcode, opencode,
    goose, qwen, zed, trae, warp, firebender, factory, mistral
`);
}

export function printSummary(agents: string[], projectDir: string): void {
	log.success("Installation complete!");
	log.message("");
	log.message("What was set up:");
	log.message(`  .claude/              - Claude vibe coding settings`);
	log.message(`  .ruler/AGENTS.md      - Agent instructions`);
	log.message(
		`  .ruler/ruler.toml     - Ruler config (agents: ${agents.join(", ")})`,
	);
	const counts = countSkillsByType(projectDir);
	if (counts.custom > 0) {
		log.message(
			`  .ruler/skills/        - ${counts.library} library + ${counts.custom} custom skill(s)`,
		);
	} else {
		log.message(`  .ruler/skills/        - ${counts.library} workflow skills`);
	}
	log.message("");
	log.message("Agent configurations generated for:");
	for (const agent of agents) {
		log.message(`  - ${agent}`);
	}
	log.message("");
	log.message("Next steps:");
	log.message("  1. Review .ruler/AGENTS.md for agent instructions");
	log.message("  2. Customize .ruler/ruler.toml if needed");
	log.message("  3. Commit the generated files to your repository");
}

function countSkillsByType(projectDir: string): {
	library: number;
	custom: number;
	total: number;
} {
	const skillsDir = path.join(projectDir, ".ruler", "skills");
	if (!fs.existsSync(skillsDir)) {
		return { library: 0, custom: 0, total: 0 };
	}

	const manifest = readManifest(projectDir);
	const manifestSkills = new Set(manifest?.skills ?? []);

	const allSkills = fs
		.readdirSync(skillsDir, { withFileTypes: true })
		.filter((d) => d.isDirectory())
		.map((d) => d.name);

	const library = allSkills.filter((s) => manifestSkills.has(s)).length;
	const custom = allSkills.length - library;

	return { library, custom, total: allSkills.length };
}
