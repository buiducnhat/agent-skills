import fs from "node:fs";
import path from "node:path";
import { log } from "@clack/prompts";
import { AGENT_SKILLS_DIRS } from "./constants.js";
import type { RulesInjectionResult } from "./rules.js";

export interface CliArgs {
	nonInteractive: boolean;
	help: boolean;
	version: boolean;
	copy: boolean;
	global: boolean;
}

export function parseArgs(argv: string[]): CliArgs {
	const args: CliArgs = {
		nonInteractive: false,
		help: false,
		version: false,
		copy: false,
		global: false,
	};

	for (let i = 0; i < argv.length; i++) {
		switch (argv[i]) {
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
			case "--copy":
				args.copy = true;
				break;
			case "--global":
			case "-g":
				args.global = true;
				break;
		}
	}

	return args;
}

export function detectAgentsFromFilesystem(projectDir: string): string[] {
	const detected: string[] = [];

	for (const [dirPrefix, agentIds] of Object.entries(AGENT_SKILLS_DIRS)) {
		const skillsDir = path.join(projectDir, dirPrefix, "skills");
		if (fs.existsSync(skillsDir)) {
			detected.push(...agentIds);
		}
	}

	return detected;
}

export function setupCursorSkillsDir(baseDir: string, copy: boolean): void {
	const src = path.join(baseDir, ".agents", "skills");
	const dest = path.join(baseDir, ".cursor", "skills");

	if (!fs.existsSync(src)) {
		log.warn("`.agents/skills/` not found — skipping Cursor skills mirror.");
		return;
	}

	fs.mkdirSync(dest, { recursive: true });

	const entries = fs.readdirSync(src);
	for (const name of entries) {
		const srcPath = path.join(src, name);
		const destPath = path.join(dest, name);

		if (copy) {
			fs.cpSync(srcPath, destPath, { recursive: true, force: true });
		} else {
			if (!fs.existsSync(destPath)) {
				try {
					fs.symlinkSync(srcPath, destPath);
				} catch {
					// Symlinks require Developer Mode or admin on Windows; fall back to copy
					log.warn(
						`Symlink not supported — copying ${name} instead. Use --copy to suppress this warning.`,
					);
					fs.cpSync(srcPath, destPath, { recursive: true, force: true });
				}
			}
		}
	}
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

export function printHelp(): void {
	console.log(`
  @buiducnhat/agent-skills - Install AI agent workflow skills for coding assistants

  Usage: npx @buiducnhat/agent-skills [options]

  Options:
    --non-interactive    Skip interactive prompts (installs all skills to all agents)
    --copy               Copy skill files instead of symlinking. Use this
                         when your environment doesn’t support symlinks or you
                         prefer independent copies; symlinks are recommended so
                         updates propagate automatically.
    -g, --global         Install skills to user home directory (~/<agent>/skills/)
                         instead of the current project directory.
    -h, --help           Show this help message
    -v, --version        Show version

  Examples:
    npx @buiducnhat/agent-skills
    npx @buiducnhat/agent-skills --non-interactive
    npx @buiducnhat/agent-skills --copy
    npx @buiducnhat/agent-skills --global
    npx @buiducnhat/agent-skills --global --non-interactive
`);
}

export function printSummary(
	agents: string[],
	results: RulesInjectionResult[],
): void {
	log.success("Installation complete!");
	log.message("");
	log.message("What was set up:");
	log.message("  .claude/              - Claude Code settings");
	for (const result of results) {
		if (result.action !== "skipped") {
			log.message(`  ${result.rulesFile}  - ${result.action}`);
		}
	}
	log.message("");
	log.message("Agent configurations updated for:");
	for (const agent of agents) {
		log.message(`  - ${agent}`);
	}
	log.message("");
	log.message("Next steps:");
	log.message("  1. Review the updated agent rules files");
	log.message("  2. Commit the generated files to your repository");
}
