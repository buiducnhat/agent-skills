import fs from "node:fs";
import path from "node:path";
import { cancel, intro, log, outro } from "@clack/prompts";
import pc from "picocolors";
import { runRulerApply } from "./apply.js";
import { configureRulerToml } from "./configure.js";
import { cleanupTemp, fetchTemplates } from "./fetch.js";
import { promptAgentSelection, promptExistingAction } from "./prompts.js";
import {
	copyTemplates,
	parseArgs,
	printHelp,
	printSummary,
} from "./utils.js";

async function main(): Promise<void> {
	const args = parseArgs(process.argv.slice(2));

	if (args.help) {
		printHelp();
		process.exit(0);
	}

	if (args.version) {
		console.log("0.1.0");
		process.exit(0);
	}

	intro(pc.bold(pc.cyan(" Agent Skills Installer ")));

	const cwd = process.cwd();
	const rulerDir = path.join(cwd, ".ruler");
	const existingInstall = fs.existsSync(rulerDir);

	// Step 1: Handle existing installation
	let action: "fresh" | "update" = "fresh";
	if (existingInstall) {
		if (args.nonInteractive) {
			action = "update";
			log.info("Existing .ruler/ found, updating...");
		} else {
			action = await promptExistingAction();
		}
	}

	// Step 2: Select agents
	let selectedAgents: string[];
	if (args.agents) {
		selectedAgents = args.agents.split(",").map((a) => a.trim());
		log.info(`Using agents: ${selectedAgents.join(", ")}`);
	} else if (args.nonInteractive) {
		selectedAgents = ["claude"];
		log.info("Using default agent: claude");
	} else {
		selectedAgents = await promptAgentSelection();
	}

	if (selectedAgents.length === 0) {
		cancel("No agents selected.");
		process.exit(1);
	}

	// Step 3: Fetch templates from GitHub
	let tempDir: string | undefined;
	try {
		tempDir = await fetchTemplates();

		// Step 4: Copy .ruler/ and .claude/ to user's project
		await copyTemplates(tempDir, cwd, action);

		// Step 5: Configure ruler.toml with selected agents
		configureRulerToml(cwd, selectedAgents);

		// Step 6: Run ruler apply
		await runRulerApply(cwd, selectedAgents);

		// Step 7: Summary
		printSummary(selectedAgents, cwd);

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
