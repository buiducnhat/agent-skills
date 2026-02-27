# agent-skills

Install AI agent skills and Ruler configuration for coding assistants.

`@buiducnhat/agent-skills` is a CLI that bootstraps `.ruler/` and `.claude/` into your repository, configures selected agents, and runs `ruler apply` to generate agent-specific outputs.

## Quick start

### Run with npx

```bash
npx @buiducnhat/agent-skills
```

### Select agents non-interactively

```bash
npx @buiducnhat/agent-skills --agents claude,cursor,copilot
```

### Use install script

```bash
curl -fsSL https://raw.githubusercontent.com/buiducnhat/agent-skills/main/install.sh | bash
```

## CLI options

- `--agents <list>`: comma-separated agent IDs (also enables non-interactive mode)
- `--non-interactive`: skip prompts and use defaults
- `-h, --help`: show help
- `-v, --version`: show version

## Documentation

- [Product PDR](docs/project-pdr.md)
- [Code Standard](docs/code-standard.md)
- [Codebase Map](docs/codebase.md)
- [Architecture](docs/architecture.md)
