# CoBrew

Cài đặt các workflow skill chuẩn hóa cho AI agent.

Với Codex và Claude Code, nên dùng **plugin CoBrew** để có trải nghiệm tốt nhất. Với agent khác hoặc môi trường chưa hỗ trợ plugin, cài skill trực tiếp bằng Vercel skills CLI.

---

**Ngôn ngữ:** [English](README.md) | Tiếng Việt

---

## Tính năng

CoBrew phân phối cùng một bộ workflow skill first-party qua hai hướng được hỗ trợ:

1. **Plugin bundle cho Codex và Claude Code** giúp agent đọc workflow skill trực tiếp qua hệ thống plugin.
2. **Cài trực tiếp bằng skills CLI** dùng [Vercel skills CLI](https://github.com/vercel-labs/skills) để cài cùng bộ skill cho các agent được hỗ trợ khác.

## Cài đặt

### Plugin Codex (khuyến nghị cho Codex)

Cài marketplace plugin CoBrew trực tiếp từ GitHub:

```bash
codex plugin marketplace add buiducnhat/cobrew
```

### Plugin Claude Code (khuyến nghị cho Claude Code)

Cài marketplace plugin CoBrew trực tiếp từ GitHub:

```bash
claude plugin marketplace add buiducnhat/cobrew
```

Trong phiên Claude Code tương tác, dùng slash command:

```text
/plugin marketplace add buiducnhat/cobrew
```

### Agent khác

Với agent ngoài hướng plugin, cài skill CoBrew trực tiếp:

```bash
npx skills add buiducnhat/cobrew
```

## Bảo trì plugin bundle

Repository này xem thư mục `skills/` ở root và `plugins/cobrew/.codex-plugin/plugin.json` là nguồn metadata authoring cho các plugin bundle.

`bun run sync:plugin` sẽ sinh ra plugin bundle tự chứa tại `plugins/cobrew/`, gồm cả manifest cho Codex (`.codex-plugin/plugin.json`) và Claude Code (`.claude-plugin/plugin.json`).

Lệnh này cũng ghi lại marketplace của Codex tại `.agents/plugins/marketplace.json` và marketplace của Claude Code tại `.claude-plugin/marketplace.json` để cả hai cùng trỏ tới `./plugins/cobrew`.

## Workflow skill của repository

Repository này hiện định nghĩa 10 workflow skill first-party và cũng pin thêm các upstream skill trong `skills-lock.json`:

| Skill             | Mô tả                                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| `ask`             | Đặt câu hỏi làm rõ để thu thập yêu cầu và ngữ cảnh                                                          |
| `fix`             | Chẩn đoán và sửa lỗi với phân tích nguyên nhân gốc và bước xác minh                                         |
| `review`          | Review thay đổi chưa commit với ngữ cảnh codebase và mức độ ưu tiên                                         |
| `brainstorm`      | Khám phá ý tưởng và phân tích vấn đề phức tạp trước khi lên kế hoạch                                        |
| `docs`            | Tạo mới hoặc làm mới tài liệu project dựa trên trạng thái repo hiện tại                                     |
| `execute-plan`    | Thực thi kế hoạch đã viết theo từng giai đoạn với các điểm kiểm tra                                         |
| `git-commit`      | Tạo commit message theo chuẩn conventional từ thay đổi đã stage hoặc chưa stage                             |
| `quick-implement` | Triển khai nhanh cho các thay đổi nhỏ, phạm vi rõ ràng                                                      |
| `visualize`       | Tạo HTML visualization nằm cạnh source cho docs, markdown, plan và context bằng template cố định và Mermaid |
| `write-plan`      | Tạo kế hoạch triển khai chi tiết theo từng giai đoạn                                                        |

### Chuỗi workflow khuyến nghị

---

#### Khởi tạo tài liệu

```
/docs
```

#### Tác vụ phức tạp hoặc chưa rõ ràng

```
brainstorm → write-plan → execute-plan
```

Dùng khi yêu cầu chưa rõ hoặc có nhiều hướng tiếp cận khả thi.

```
# Bước 1 — khám phá và xác định thiết kế
/brainstorm thêm chế độ dark mode

# Agent làm rõ yêu cầu, đề xuất các hướng tiếp cận, tạo file:
#   docs/brainstorms/260306-1430-dark-mode/SUMMARY.md
# Sau đó hỏi: "Tiến hành write-plan không?"

# Bước 2 — tạo kế hoạch triển khai theo giai đoạn
/write-plan

# Agent đọc brainstorm, tạo:
#   docs/plans/260306-1445-dark-mode/SUMMARY.md
#   docs/plans/260306-1445-dark-mode/phase-01-tokens.md
#   docs/plans/260306-1445-dark-mode/phase-02-components.md
# Kết thúc với: "Dùng /clear rồi /execute-plan docs/plans/... để thực thi"

# Bước 3 — thực thi kế hoạch đã duyệt trong context mới
/clear
/execute-plan docs/plans/260306-1445-dark-mode/SUMMARY.md
```

---

#### Tính năng rõ ràng hoặc refactor lớn

```
write-plan → execute-plan
```

Dùng khi task rõ ràng nhưng quá lớn hoặc có rủi ro để triển khai trực tiếp.

```
# Bước 1 — lên kế hoạch
/write-plan chuyển đổi auth sang JWT

# Agent tạo:
#   docs/plans/260306-1020-jwt-auth/SUMMARY.md
#   docs/plans/260306-1020-jwt-auth/phase-01-schema.md
#   docs/plans/260306-1020-jwt-auth/phase-02-middleware.md
# Kết thúc với: "Dùng /clear rồi /execute-plan docs/plans/... để thực thi"

# Bước 2 — thực thi trong context mới
/clear
/execute-plan docs/plans/260306-1020-jwt-auth/SUMMARY.md
```

---

#### Tác vụ nhỏ và sửa nhanh

```
quick-implement
```

Dùng cho các thay đổi nhỏ, phạm vi rõ ràng mà không cần kế hoạch chính thức.

```
# Triển khai trực tiếp — không cần kế hoạch
/quick-implement thêm tooltip cho nút submit
```

---

#### Sửa lỗi

```
fix
```

Dùng khi có lỗi cụ thể, test thất bại hoặc hành vi không mong muốn cần chẩn đoán.

```
/fix TypeError: Cannot read properties of undefined at checkout.ts:42

# Lỗi đơn giản: agent chẩn đoán, áp dụng fix, kiểm tra
# Lỗi phức tạp: agent dừng lại và chuyển sang write-plan
```

---

#### Visualization

```
visualize
```

Dùng khi docs, plan, markdown hoặc context sẽ dễ hiểu hơn dưới dạng HTML diagram nằm cạnh source.

```
/visualize docs/plans/260306-1020-jwt-auth/SUMMARY.md

# Agent tạo:
#   docs/plans/260306-1020-jwt-auth/visualize.html
#   docs/plans/260306-1020-jwt-auth/visualize-assets/
```

## Agent được hỗ trợ

<details>
<summary>Xem tất cả 40 agent được hỗ trợ</summary>

AdaL, Amp, Antigravity, Augment, Claude Code, Cline, CodeBuddy, Codex, Command Code, Continue, Cortex Code, Crush, Cursor, Droid, Gemini CLI, GitHub Copilot, Goose, iFlow CLI, Junie, Kilo Code, Kimi Code CLI, Kiro CLI, Kode, MCPJam, Mistral Vibe, Mux, Neovate, OpenClaw, OpenCode, OpenHands, Pi, Pochi, Qoder, Qwen Code, Replit, Roo Code, Trae, Trae CN, Windsurf, Zencoder

</details>

## Yêu cầu

- Node.js 18+
- Kết nối mạng để cài plugin marketplace hoặc skills CLI

## Tài liệu

- [Tổng quan tài liệu](docs/SUMMARY.md)
