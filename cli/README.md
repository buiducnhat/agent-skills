# @buiducnhat/agent-skills

Install AI agent skills and Ruler configuration for coding assistants.

`@buiducnhat/agent-skills` bootstraps `.ruler/` and `.claude/` into your repository, configures selected agents, and runs `ruler apply` to generate agent-specific outputs.

## Quick start

### Run with npx

```bash
npx @buiducnhat/agent-skills
```

### Select agents non-interactively

```bash
npx @buiducnhat/agent-skills --agents claude,cursor,copilot
```

## CLI options

- `--agents <list>`: comma-separated agent IDs (also enables non-interactive mode)
- `--non-interactive`: skip prompts and use defaults
- `-h, --help`: show help
- `-v, --version`: show version

## Requirements

- Node.js `>=18`
- `git` available in your environment
- Network access to download templates and run `npx @intellectronica/ruler`

## Repository

- Source: https://github.com/buiducnhat/agent-skills
- Issues: https://github.com/buiducnhat/agent-skills/issues
