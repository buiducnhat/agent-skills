import { execSync } from "node:child_process";
import { existsSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spinner } from "@clack/prompts";
import { REPO_BRANCH, REPO_URL } from "./constants.js";

export async function fetchTemplates(): Promise<string> {
	const s = spinner();
	s.start("Downloading agent skills from GitHub...");

	const tempDir = mkdtempSync(path.join(tmpdir(), "agent-skills-"));

	try {
		execSync(
			`git clone --depth 1 --branch ${REPO_BRANCH} "${REPO_URL}" "${tempDir}"`,
			{ stdio: "pipe" },
		);

		const templatesDir = path.join(tempDir, "templates");
		if (!existsSync(templatesDir)) {
			throw new Error("templates/ directory not found in the repository");
		}

		s.stop("Downloaded agent skills");
		return tempDir;
	} catch (err) {
		s.stop("Download failed");
		const message = err instanceof Error ? err.message : String(err);
		throw new Error(
			message.startsWith("templates/")
				? message
				: "Failed to clone repository. Ensure git is installed and you have internet access.",
		);
	}
}

export function cleanupTemp(tempDir: string): void {
	try {
		execSync(`rm -rf "${tempDir}"`, { stdio: "pipe" });
	} catch {
		// ignore cleanup errors
	}
}
