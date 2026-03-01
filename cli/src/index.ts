import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import {
	cancel,
	intro,
	isCancel,
	log,
	multiselect,
	outro,
} from "@clack/prompts";
import pc from "picocolors";
import { SUPPORTED_AGENTS } from "./constants.js";
import { cleanupTemp, fetchTemplates } from "./fetch.js";
import { injectRules } from "./rules.js";
import { runSkillsAdd } from "./skills.js";
import {
	copyClaudeTemplate,
	detectAgentsFromFilesystem,
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
	let selectedAgents: string[];

	if (args.nonInteractive) {
		// Non-interactive: install all agents, detect from filesystem afterward
		log.step("Installing skills to all agents (non-interactive)...");
		const result = await runSkillsAdd(cwd, []);

		if (!result.success) {
			cancel(
				pc.red(
					"Skills CLI failed. See errors above.\nYou can try running manually: npx skills add buiducnhat/agent-skills --skill '*' --all -y",
				),
			);
			process.exit(1);
		}

		selectedAgents = detectAgentsFromFilesystem(cwd);

		if (selectedAgents.length === 0) {
			log.warn(
				"No agents detected from filesystem. Skills may have been installed but rules injection was skipped.",
			);
			outro(pc.yellow("Done. No agent rules files were updated."));
			process.exit(0);
		}
	} else {
		// Interactive: show multiselect prompt, then run skills CLI non-interactively
		const preSelected = detectAgentsFromFilesystem(cwd);

		const agentChoices = SUPPORTED_AGENTS.map((a) => ({
			value: a.id,
			label: a.name,
		}));

		const selection = await multiselect({
			message: "Select agents to install skills for:",
			options: agentChoices,
			initialValues: preSelected,
			required: false,
		});

		if (isCancel(selection)) {
			cancel("Installation cancelled.");
			process.exit(0);
		}

		selectedAgents = selection as string[];

		if (selectedAgents.length === 0) {
			outro(pc.yellow("No agents selected. Nothing to install."));
			process.exit(0);
		}

		log.step("Installing skills via skills CLI...");
		const result = await runSkillsAdd(cwd, selectedAgents);

		if (!result.success) {
			cancel(
				pc.red(
					"Skills CLI failed. See errors above.\nYou can try running manually: npx skills add buiducnhat/agent-skills --skill '*' -a <agent> -y",
				),
			);
			process.exit(1);
		}
	}

	log.info(`Configuring agents: ${selectedAgents.join(", ")}`);

	// Fetch templates and inject rules
	let tempDir: string | undefined;
	try {
		tempDir = await fetchTemplates();

		const agentsContent = fs.readFileSync(
			path.join(tempDir, "templates", "AGENTS.md"),
			"utf-8",
		);

		const results = injectRules(cwd, selectedAgents, agentsContent);

		copyClaudeTemplate(tempDir, cwd);

		printSummary(selectedAgents, results);

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
