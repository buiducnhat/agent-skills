import fs from "node:fs";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";
import {
	cancel,
	intro,
	isCancel,
	log,
	multiselect,
	outro,
	select,
} from "@clack/prompts";
import pc from "picocolors";
import { SUPPORTED_AGENTS } from "./constants.js";
import { cleanupTemp, fetchTemplates } from "./fetch.js";
import { injectRules } from "./rules.js";
import { runSkillsAdd } from "./skills.js";
import {
	detectAgentsFromFilesystem,
	parseArgs,
	printHelp,
	printSummary,
} from "./utils.js";

const require = createRequire(import.meta.url);
const SUPPORTED_AGENT_IDS = new Set(SUPPORTED_AGENTS.map((agent) => agent.id));

function getCliVersion(): string {
	try {
		const packageJson = require("../package.json") as { version?: string };
		return packageJson.version ?? "unknown";
	} catch {
		return "unknown";
	}
}

function getInvalidAgents(agents: string[]): string[] {
	const invalidAgents: string[] = [];
	const seenAgents = new Set<string>();

	for (const agent of agents) {
		if (seenAgents.has(agent)) {
			continue;
		}

		seenAgents.add(agent);

		if (!SUPPORTED_AGENT_IDS.has(agent)) {
			invalidAgents.push(agent);
		}
	}

	return invalidAgents;
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

	if (args.agentErrors.length > 0) {
		cancel(pc.red(args.agentErrors.join("\n")));
		process.exit(1);
	}

	const requestedAgents = args.agents;
	const invalidAgents = getInvalidAgents(requestedAgents);

	if (invalidAgents.length > 0) {
		cancel(
			pc.red(
				`Unsupported agent id(s): ${invalidAgents.join(", ")}. Supported agents: ${SUPPORTED_AGENTS.map((agent) => agent.id).join(", ")}`,
			),
		);
		process.exit(1);
	}

	intro(pc.bold(pc.cyan(" Agent Skills Installer ")));

	const cwd = process.cwd();
	const baseDir = args.global ? os.homedir() : cwd;

	if (args.global) {
		log.info(`Global mode: installing to ${pc.cyan(os.homedir())}`);
	}

	let selectedAgents: string[];

	if (args.nonInteractive) {
		const agentsToInstall = requestedAgents.length > 0 ? requestedAgents : [];
		const installMessage =
			agentsToInstall.length > 0
				? "Installing skills for selected agents (non-interactive)..."
				: "Installing skills to all agents (non-interactive)...";

		log.step(installMessage);
		const result = await runSkillsAdd(
			cwd,
			agentsToInstall,
			args.copy,
			args.global,
		);

		if (!result.success) {
			cancel(
				pc.red(
					agentsToInstall.length > 0
						? "Skills CLI failed. See errors above.\nYou can try running manually: npx skills add buiducnhat/agent-skills --skill '*' -a <agent> -y"
						: "Skills CLI failed. See errors above.\nYou can try running manually: npx skills add buiducnhat/agent-skills --skill '*' --all -y",
				),
			);
			process.exit(1);
		}

		selectedAgents =
			agentsToInstall.length > 0
				? agentsToInstall
				: detectAgentsFromFilesystem(baseDir);

		if (selectedAgents.length === 0 && agentsToInstall.length === 0) {
			log.warn(
				"No agents detected from filesystem. Skills may have been installed but rules injection was skipped.",
			);
			outro(pc.yellow("Done. No agent rules files were updated."));
			process.exit(0);
		}
	} else if (requestedAgents.length > 0) {
		selectedAgents = requestedAgents;

		let copyFlag = args.copy;

		if (!args.copy) {
			// Explicit agents: keep install-mode choice, but skip multiselect.
			const installMode = await select({
				message: "How should the skills be installed?",
				options: [
					{ label: "Symlink (recommended)", value: "symlink" },
					{ label: "Copy", value: "copy" },
				],
				initialValue: "symlink",
			});
			if (isCancel(installMode)) {
				cancel("Installation cancelled.");
				process.exit(0);
			}
			copyFlag = installMode === "copy";
		}

		log.step("Installing skills via skills CLI...");
		const result = await runSkillsAdd(
			cwd,
			selectedAgents,
			copyFlag,
			args.global,
		);

		if (!result.success) {
			cancel(
				pc.red(
					"Skills CLI failed. See errors above.\nYou can try running manually: npx skills add buiducnhat/agent-skills --skill '*' -a <agent> -y",
				),
			);
			process.exit(1);
		}
	} else {
		// Interactive: show multiselect prompt, then run skills CLI non-interactively
		const preSelected = detectAgentsFromFilesystem(baseDir);

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

		let copyFlag = args.copy;

		if (!args.copy) {
			// Ask the user which install mode to use.
			const installMode = await select({
				message: "How should the skills be installed?",
				options: [
					{ label: "Symlink (recommended)", value: "symlink" },
					{ label: "Copy", value: "copy" },
				],
				initialValue: "symlink",
			});
			if (isCancel(installMode)) {
				cancel("Installation cancelled.");
				process.exit(0);
			}
			copyFlag = installMode === "copy";
		}

		log.step("Installing skills via skills CLI...");
		const result = await runSkillsAdd(
			cwd,
			selectedAgents,
			copyFlag,
			args.global,
		);

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

		const results = injectRules(baseDir, selectedAgents, agentsContent);

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
