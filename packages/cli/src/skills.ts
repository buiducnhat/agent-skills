import { spawn } from "node:child_process";

export interface SkillsInstallResult {
	success: boolean;
}

export async function runSkillsAdd(
	projectDir: string,
	agents: string[],
	copy: boolean = false,
): Promise<SkillsInstallResult> {
	const args: string[] =
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

	if (copy) {
		args.push("--copy");
	}

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
