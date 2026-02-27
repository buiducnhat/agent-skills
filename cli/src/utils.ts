import fs from "node:fs";
import path from "node:path";
import { log, spinner } from "@clack/prompts";

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

	if (action === "fresh") {
		if (fs.existsSync(destRuler)) {
			const backupPath = `${destRuler}.backup-${Date.now()}`;
			fs.renameSync(destRuler, backupPath);
			log.info(`Backed up existing .ruler/ to ${path.basename(backupPath)}`);
		}
		if (fs.existsSync(destClaude)) {
			const backupPath = `${destClaude}.backup-${Date.now()}`;
			fs.renameSync(destClaude, backupPath);
			log.info(`Backed up existing .claude/ to ${path.basename(backupPath)}`);
		}
	}

	// Copy .ruler/
	if (fs.existsSync(srcRuler)) {
		copyDirectory(srcRuler, destRuler);

		// Make scripts executable
		makeScriptsExecutable(path.join(destRuler, "scripts"));
	}

	// Copy .claude/
	if (fs.existsSync(srcClaude)) {
		copyDirectory(srcClaude, destClaude);
	}

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
	const skillCount = countSkills(projectDir);

	log.success("Installation complete!");
	log.message("");
	log.message("What was set up:");
	log.message(`  .claude/              - Claude vibe coding settings`);
	log.message(`  .ruler/AGENTS.md      - Agent instructions`);
	log.message(
		`  .ruler/ruler.toml     - Ruler config (agents: ${agents.join(", ")})`,
	);
	log.message(`  .ruler/skills/        - ${skillCount} workflow skills`);
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

function countSkills(projectDir: string): number {
	const skillsDir = path.join(projectDir, ".ruler", "skills");
	if (!fs.existsSync(skillsDir)) return 0;
	return fs
		.readdirSync(skillsDir, { withFileTypes: true })
		.filter((d) => d.isDirectory()).length;
}
