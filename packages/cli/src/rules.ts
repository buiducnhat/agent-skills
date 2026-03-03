import fs from "node:fs";
import path from "node:path";
import {
	AGENT_RULES_MAP,
	RULES_MARKER_END,
	RULES_MARKER_START,
} from "./constants.js";

export interface RulesInjectionResult {
	rulesFile: string;
	action: "created" | "updated" | "skipped";
}

function escapeRegex(str: string): string {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function injectRules(
	projectDir: string,
	agents: string[],
	agentsContent: string,
): RulesInjectionResult[] {
	// Collect unique rules file paths for the given agents
	const rulesFilePaths = new Map<string, string>(); // rulesFilePath -> first agent
	for (const agent of agents) {
		const rulesFile = AGENT_RULES_MAP[agent];
		if (rulesFile && !rulesFilePaths.has(rulesFile)) {
			rulesFilePaths.set(rulesFile, agent);
		}
	}

	const results: RulesInjectionResult[] = [];

	for (const rulesFilePath of rulesFilePaths.keys()) {
		const fullPath = path.join(projectDir, rulesFilePath);

		// Skip non-text files (e.g., JSON-based rules)
		if (rulesFilePath.endsWith(".json")) {
			results.push({ rulesFile: rulesFilePath, action: "skipped" });
			continue;
		}

		// Ensure parent directories exist
		fs.mkdirSync(path.dirname(fullPath), { recursive: true });

		const markedBlock = `\n${RULES_MARKER_START}\n${agentsContent}\n${RULES_MARKER_END}\n`;

		if (fs.existsSync(fullPath)) {
			const existing = fs.readFileSync(fullPath, "utf-8");
			const markerRegex = new RegExp(
				`${escapeRegex(RULES_MARKER_START)}[\\s\\S]*?${escapeRegex(RULES_MARKER_END)}`,
			);

			if (markerRegex.test(existing)) {
				// Replace content between existing markers
				const updated = existing.replace(
					markerRegex,
					`${RULES_MARKER_START}\n${agentsContent}\n${RULES_MARKER_END}`,
				);
				fs.writeFileSync(fullPath, updated, "utf-8");
			} else {
				// Append markers + content
				fs.writeFileSync(fullPath, existing + markedBlock, "utf-8");
			}
			results.push({ rulesFile: rulesFilePath, action: "updated" });
		} else {
			// Create new file with markers + content
			fs.writeFileSync(fullPath, markedBlock, "utf-8");
			results.push({ rulesFile: rulesFilePath, action: "created" });
		}
	}

	return results;
}
