import fs from "node:fs";
import path from "node:path";
import { log } from "@clack/prompts";
import type { RulesInjectionResult } from "./rules.js";

export interface CliArgs {
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

export function copyClaudeTemplate(tempDir: string, projectDir: string): void {
	const srcClaude = path.join(tempDir, "templates", ".claude");
	const destClaude = path.join(projectDir, ".claude");

	if (fs.existsSync(srcClaude)) {
		copyDirectory(srcClaude, destClaude);
	}
}

export function printHelp(): void {
	console.log(`
  @buiducnhat/agent-skills - Install AI agent workflow skills for coding assistants

  Usage: npx @buiducnhat/agent-skills [options]

  Options:
    --non-interactive    Skip interactive prompts (installs all skills to all agents)
    -h, --help           Show this help message
    -v, --version        Show version

  Examples:
    npx @buiducnhat/agent-skills
    npx @buiducnhat/agent-skills --non-interactive
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
