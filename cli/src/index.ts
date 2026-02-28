import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { cancel, intro, log, outro } from "@clack/prompts";
import pc from "picocolors";
import { cleanupTemp, fetchTemplates } from "./fetch.js";
import { injectRules } from "./rules.js";
import {
	detectAgentsFromFilesystem,
	detectAgentsFromOutput,
	runSkillsAdd,
} from "./skills.js";
import {
	copyClaudeTemplate,
	parseArgs,
	printHelp,
	printSummary,
} from "./utils.js";

const require = createRequire(import.meta.url);

function getCliVersion(): string {
	try {
		const packageJson = require("../package.json") as { version?: string };
		return packageJson.version ?? "unknown";
	} catch {
		return "unknown";
	}
}

async function main(): Promise<void> {
	const args = parseArgs(process.argv.slice(2));

	if (args.help) {
		printHelp();
		process.exit(0);
	}

	if (args.version) {
		console.log(getCliVersion());
		process.exit(0);
	}

	intro(pc.bold(pc.cyan(" Agent Skills Installer ")));

	const cwd = process.cwd();

	// Step 1: Run skills CLI to install skills and detect agents
	log.step("Installing skills via skills CLI...");
	const skillsResult = await runSkillsAdd(cwd, args.nonInteractive);

	if (!skillsResult.success) {
		cancel(
			pc.red(
				"Skills CLI failed. See errors above.\nYou can try running manually: npx skills add buiducnhat/agent-skills --skill *",
			),
		);
		process.exit(1);
	}

	// Step 2: Detect which agents were selected
	let agents = detectAgentsFromOutput(skillsResult.rawOutput);
	if (agents.length === 0) {
		log.warn(
			"Could not detect agents from skills CLI output. Scanning filesystem...",
		);
		agents = detectAgentsFromFilesystem(cwd);
	}

	if (agents.length === 0) {
		log.warn(
			"No agents detected. Skills may have been installed but rules injection was skipped.",
		);
		outro(pc.yellow("Done. No agent rules files were updated."));
		process.exit(0);
	}

	log.info(`Detected agents: ${agents.join(", ")}`);

	// Step 3: Fetch templates (for AGENTS.md content and .claude/ template)
	let tempDir: string | undefined;
	try {
		tempDir = await fetchTemplates();

		// Step 4: Read AGENTS.md content
		const agentsContent = fs.readFileSync(
			path.join(tempDir, "templates", "AGENTS.md"),
			"utf-8",
		);

		// Step 5: Inject rules into agent rules files
		const results = injectRules(cwd, agents, agentsContent);

		// Step 6: Copy .claude/ template
		copyClaudeTemplate(tempDir, cwd);

		// Step 7: Summary
		printSummary(agents, results);

		outro(pc.green("Done! Your AI agent skills are ready."));
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		cancel(pc.red(`Error: ${message}`));
		process.exit(1);
	} finally {
		if (tempDir) {
			cleanupTemp(tempDir);
		}
	}
}

main();
