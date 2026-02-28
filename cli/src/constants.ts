export const REPO_URL = "https://github.com/buiducnhat/agent-skills.git";
export const REPO_BRANCH = "main";

// Maps the skills directory prefix (e.g., ".claude") to our agent identifier
export const AGENT_SKILLS_DIRS: Record<string, string> = {
	".claude": "claude-code",
	".cursor": "cursor",
	".codex": "codex",
	".pi": "pi",
	".gemini": "gemini-cli",
	".agents": "amp",
	".agent": "antigravity",
	".roo": "roo-code",
	".opencode": "opencode",
	".factory": "factory-droid",
	".vibe": "mistral-vibe",
	".cline": "cline",
	".goose": "goose",
};

export const AGENT_RULES_MAP: Record<string, string> = {
	// AGENTS.md group
	"github-copilot": "AGENTS.md",
	codex: "AGENTS.md",
	pi: "AGENTS.md",
	jules: "AGENTS.md",
	cursor: "AGENTS.md",
	amp: "AGENTS.md",
	"gemini-cli": "AGENTS.md",
	"kilo-code": "AGENTS.md",
	opencode: "AGENTS.md",
	"qwen-code": "AGENTS.md",
	"roo-code": "AGENTS.md",
	zed: "AGENTS.md",
	"factory-droid": "AGENTS.md",
	"mistral-vibe": "AGENTS.md",
	aider: "AGENTS.md",
	windsurf: "AGENTS.md",

	// Unique rules files
	"claude-code": "CLAUDE.md",
	cline: ".clinerules",
	crush: "CRUSH.md",
	warp: "WARP.md",

	// Nested paths
	antigravity: ".agent/rules/ruler.md",
	"amazon-q": ".amazonq/rules/ruler_q_rules.md",
	"firebase-studio": ".idx/airules.md",
	"open-hands": ".openhands/microagents/repo.md",
	junie: ".junie/guidelines.md",
	"augment-code": ".augment/rules/ruler_augment_instructions.md",
	"trae-ai": ".trae/rules/project_rules.md",
	kiro: ".kiro/steering/ruler_kiro_instructions.md",
	"jetbrains-ai": ".aiassistant/rules/AGENTS.md",
	goose: ".goosehints",
};

export const RULES_MARKER_START = "<!-- BEGIN agent-skills rules -->";
export const RULES_MARKER_END = "<!-- END agent-skills rules -->";
