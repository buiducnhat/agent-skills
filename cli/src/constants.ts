export const REPO_URL = "https://github.com/buiducnhat/agent-skills.git";
export const REPO_BRANCH = "main";

export interface AgentOption {
	value: string;
	label: string;
	hint: string;
}

export const RULER_AGENTS: AgentOption[] = [
	{ value: "claude", label: "Claude Code", hint: "Anthropic" },
	{ value: "copilot", label: "GitHub Copilot", hint: "GitHub" },
	{ value: "cursor", label: "Cursor", hint: "Cursor" },
	{ value: "windsurf", label: "Windsurf", hint: "Codeium" },
	{ value: "codex", label: "OpenAI Codex CLI", hint: "OpenAI" },
	{ value: "gemini-cli", label: "Gemini CLI", hint: "Google" },
	{ value: "amp", label: "Amp", hint: "Sourcegraph" },
	{ value: "cline", label: "Cline", hint: "VS Code" },
	{ value: "roo", label: "Roo Code", hint: "VS Code" },
	{ value: "aider", label: "Aider", hint: "Terminal" },
	{ value: "antigravity", label: "Antigravity", hint: "" },
	{ value: "pi", label: "Pi Coding Agent", hint: "" },
	{ value: "jules", label: "Jules", hint: "Google" },
	{ value: "kiro", label: "Kiro", hint: "AWS" },
	{ value: "kilocode", label: "Kilo Code", hint: "VS Code" },
	{ value: "crush", label: "Crush", hint: "" },
	{ value: "amazonqcli", label: "Amazon Q CLI", hint: "AWS" },
	{ value: "firebase", label: "Firebase Studio", hint: "Google" },
	{ value: "openhands", label: "Open Hands", hint: "" },
	{ value: "junie", label: "Junie", hint: "JetBrains" },
	{ value: "jetbrains-ai", label: "JetBrains AI Assistant", hint: "JetBrains" },
	{ value: "augmentcode", label: "AugmentCode", hint: "" },
	{ value: "opencode", label: "OpenCode", hint: "" },
	{ value: "goose", label: "Goose", hint: "Block" },
	{ value: "qwen", label: "Qwen Code", hint: "Alibaba" },
	{ value: "zed", label: "Zed", hint: "" },
	{ value: "trae", label: "Trae AI", hint: "ByteDance" },
	{ value: "warp", label: "Warp", hint: "" },
	{ value: "firebender", label: "Firebender", hint: "" },
	{ value: "factory", label: "Factory Droid", hint: "" },
	{ value: "mistral", label: "Mistral Vibe", hint: "Mistral" },
];

export const POPULAR_AGENTS = [
	"claude",
	"copilot",
	"cursor",
	"windsurf",
	"codex",
	"gemini-cli",
];
