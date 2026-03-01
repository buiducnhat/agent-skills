import { spawn } from "node:child_process";

export interface SkillsInstallResult {
	success: boolean;
}

export async function runSkillsAdd(
	projectDir: string,
	agents: string[],
): Promise<SkillsInstallResult> {
	const args =
		agents.length === 0
			? [
					"skills",
					"add",
					"buiducnhat/agent-skills",
					"--skill",
					"*",
					"--all",
					"-y",
				]
			: [
					"skills",
					"add",
					"buiducnhat/agent-skills",
					"--skill",
					"*",
					...agents.flatMap((a) => ["-a", a]),
					"-y",
				];

	return new Promise((resolve) => {
		const child = spawn("npx", args, {
			cwd: projectDir,
			stdio: "inherit",
		});

		child.on("close", (code) => {
			resolve({ success: code === 0 });
		});

		child.on("error", () => {
			resolve({ success: false });
		});
	});
}
