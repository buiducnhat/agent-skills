import { execSync } from "node:child_process";
import { log, spinner } from "@clack/prompts";

export async function runRulerApply(
	projectDir: string,
	agents: string[],
): Promise<void> {
	const s = spinner();
	s.start("Running ruler to generate agent configurations...");

	const agentFlag = agents.join(",");

	try {
		execSync(`npx --yes @intellectronica/ruler apply --agents ${agentFlag}`, {
			cwd: projectDir,
			stdio: "pipe",
			timeout: 120_000,
		});
		s.stop("Generated agent configurations");
	} catch {
		s.stop("ruler apply encountered issues");
		log.warn(
			"ruler apply had warnings or errors. You can run it manually:\n" +
				`  npx @intellectronica/ruler apply --agents ${agentFlag}`,
		);
	}
}
