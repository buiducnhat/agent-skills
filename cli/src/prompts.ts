import { cancel, isCancel, multiselect, select } from "@clack/prompts";
import { POPULAR_AGENTS, RULER_AGENTS } from "./constants.js";

function handleCancel(value: unknown): void {
	if (isCancel(value)) {
		cancel("Operation cancelled.");
		process.exit(0);
	}
}

export async function promptExistingAction(): Promise<"fresh" | "update"> {
	const action = await select({
		message: "Existing .ruler/ directory found. What would you like to do?",
		options: [
			{
				value: "update" as const,
				label: "Update existing configuration",
			},
			{
				value: "fresh" as const,
				label: "Fresh install (backs up and overwrites current)",
			},
		],
	});
	handleCancel(action);
	return action as "fresh" | "update";
}

export async function promptAgentSelection(): Promise<string[]> {
	const sorted = [...RULER_AGENTS].sort((a, b) => {
		const aPopular = POPULAR_AGENTS.includes(a.value);
		const bPopular = POPULAR_AGENTS.includes(b.value);
		if (aPopular && !bPopular) return -1;
		if (!aPopular && bPopular) return 1;
		return a.label.localeCompare(b.label);
	});

	const selected = await multiselect({
		message: "Which AI agents do you use? (space to toggle, enter to confirm)",
		options: sorted.map((a) => ({
			value: a.value,
			label: a.label,
			hint: a.hint || undefined,
		})),
		initialValues: ["claude"],
		required: true,
	});

	handleCancel(selected);
	return selected as string[];
}
