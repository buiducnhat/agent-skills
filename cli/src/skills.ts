import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { AGENT_SKILLS_DIRS } from "./constants.js";

export interface SkillsInstallResult {
	success: boolean;
	detectedAgents: string[];
	rawOutput: string;
}

export async function runSkillsAdd(
	projectDir: string,
	nonInteractive: boolean,
): Promise<SkillsInstallResult> {
	const args = nonInteractive
		? [
				"skills",
				"add",
				"buiducnhat/agent-skills",
				"--skill",
				"*",
				"--all",
				"-y",
			]
		: ["skills", "add", "buiducnhat/agent-skills", "--skill", "*"];

	return new Promise((resolve) => {
		const chunks: Buffer[] = [];

		const child = spawn("npx", args, {
			cwd: projectDir,
			stdio: ["inherit", "pipe", "inherit"],
		});

		child.stdout.on("data", (chunk: Buffer) => {
			process.stdout.write(chunk);
			chunks.push(chunk);
		});

		child.on("close", (code) => {
			const rawOutput = Buffer.concat(chunks).toString("utf-8");
			const success = code === 0;

			const detectedAgents = success ? detectAgentsFromOutput(rawOutput) : [];

			resolve({ success, detectedAgents, rawOutput });
		});

		child.on("error", (err) => {
			resolve({
				success: false,
				detectedAgents: [],
				rawOutput: err.message,
			});
		});
	});
}

export function detectAgentsFromOutput(output: string): string[] {
	const detected = new Set<string>();

	for (const [dirPrefix, agentId] of Object.entries(AGENT_SKILLS_DIRS)) {
		// Match patterns like ".claude/skills/" or "Installing to .claude/"
		const dirName = dirPrefix.slice(1); // remove leading dot
		const patterns = [
			new RegExp(`\\.${dirName}/skills/`, "i"),
			new RegExp(`Installing.*\\.${dirName}`, "i"),
			new RegExp(`Added.*\\.${dirName}`, "i"),
			new RegExp(`\\b${dirName}\\b`, "i"),
		];
		for (const pattern of patterns) {
			if (pattern.test(output)) {
				detected.add(agentId);
				break;
			}
		}
	}

	return Array.from(detected);
}

export function detectAgentsFromFilesystem(projectDir: string): string[] {
	const detected: string[] = [];

	for (const [dirPrefix, agentId] of Object.entries(AGENT_SKILLS_DIRS)) {
		const skillsDir = path.join(projectDir, dirPrefix, "skills");
		if (fs.existsSync(skillsDir)) {
			detected.push(agentId);
		}
	}

	return detected;
}
