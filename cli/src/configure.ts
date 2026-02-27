import fs from "node:fs";
import path from "node:path";
import { log } from "@clack/prompts";

export function configureRulerToml(projectDir: string, agents: string[]): void {
	const tomlPath = path.join(projectDir, ".ruler", "ruler.toml");

	if (!fs.existsSync(tomlPath)) {
		log.warn("ruler.toml not found, skipping configuration");
		return;
	}

	let content = fs.readFileSync(tomlPath, "utf-8");

	const agentList = agents.map((a) => `"${a}"`).join(", ");
	const newLine = `default_agents = [${agentList}]`;

	if (/^#?\s*default_agents\s*=/m.test(content)) {
		content = content.replace(/^#?\s*default_agents\s*=.*$/m, newLine);
	} else {
		// Insert after the first blank line (after the header comment block)
		const insertPoint = content.indexOf("\n\n");
		if (insertPoint !== -1) {
			content =
				content.slice(0, insertPoint) +
				"\n" +
				newLine +
				content.slice(insertPoint);
		} else {
			content += `\n${newLine}\n`;
		}
	}

	fs.writeFileSync(tomlPath, content, "utf-8");
	log.info(`Configured ruler.toml with agents: ${agents.join(", ")}`);
}
