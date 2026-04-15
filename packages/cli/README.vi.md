# agent-skills

Cài đặt các workflow skill chuẩn hóa cho AI agent và nội dung rules dùng chung vào bất kỳ repository nào chỉ với một lệnh duy nhất.

Hỗ trợ **40 AI coding agent** bao gồm Claude Code, Cursor, Windsurf, Copilot, Cline, Roo Code và nhiều hơn nữa.

---

**Ngôn ngữ:** [English](README.md) | Tiếng Việt

---

## Tính năng

Khi chạy trình cài đặt:

1. Cho phép **chọn agent** cần cấu hình (tự động phát hiện các agent đã cài)
2. Cho phép chọn cài skill bằng **symlink** hoặc **copy**
3. Cài đặt workflow skill vào thư mục skills của từng agent thông qua [Vercel skills CLI](https://github.com/vercel-labs/skills)
4. Chèn **hướng dẫn dùng chung cho agent** (`AGENTS.md`) vào file rules của từng agent bằng marker idempotent

## Cài đặt

### Tương tác (khuyến nghị)

```bash
npx @buiducnhat/agent-skills
```

Hướng dẫn từng bước qua việc chọn agent và chế độ cài đặt (symlink hoặc copy).

### Không tương tác (CI / tự động hóa)

```bash
npx @buiducnhat/agent-skills --non-interactive
```

Bỏ qua tất cả các bước hỏi và cài đặt skill cho tất cả agent.

### Qua shell script

```bash
curl -fsSL https://raw.githubusercontent.com/buiducnhat/agent-skills/main/install.sh | bash
```

Kiểm tra Node.js 18+ và chạy trình cài đặt tự động.

### Cài đặt toàn cục

```bash
npx @buiducnhat/agent-skills --global
```

Cài đặt skill vào thư mục home (`~/<agent>/skills/`) để dùng được trên tất cả các project.

### Chọn agent cụ thể

```bash
npx @buiducnhat/agent-skills -a claude-code -a cursor
```

Chỉ cài skill cho các agent đã liệt kê. Có thể lặp lại `-a` hoặc truyền nhiều agent sau một lần dùng cờ.

## Hướng dẫn tương tác

```
┌  Agent Skills Installer
│
◇  Select agents to install skills for:
│  ◼ Claude Code  ◼ Cursor  ◻ Windsurf  ...
│
◇  How should the skills be installed?
│  ● Symlink (recommended)  ○ Copy
│
◇  Installing skills via skills CLI...
│
◇  Installation complete!
│
│  What was set up:
│    CLAUDE.md             - updated
│
│  Agent configurations updated for:
│    - claude-code
│    - cursor
│
└  Done! Your AI agent skills are ready.
```

## Tùy chọn CLI

| Flag                | Mô tả                                                      |
| ------------------- | ---------------------------------------------------------- |
| `-a, --agent`       | Chỉ định một hoặc nhiều agent cụ thể                       |
| `--non-interactive` | Bỏ qua các bước hỏi; cài đặt tất cả skill cho tất cả agent |
| `--copy`            | Sao chép file skill thay vì tạo symlink                    |
| `-g, --global`      | Cài vào `~/` thay vì thư mục hiện tại                      |
| `-h, --help`        | Hiển thị trợ giúp                                          |
| `-v, --version`     | Hiển thị phiên bản                                         |

## Workflow skill của repository

Repository này hiện định nghĩa 9 workflow skill first-party và cũng pin thêm các upstream skill trong `skills-lock.json`:

| Skill             | Mô tả                                                                           |
| ----------------- | ------------------------------------------------------------------------------- |
| `as-ask`          | Đặt câu hỏi làm rõ để thu thập yêu cầu và ngữ cảnh                              |
| `as-fix`          | Chẩn đoán và sửa lỗi với phân tích nguyên nhân gốc và bước xác minh             |
| `as-review`       | Review thay đổi chưa commit với ngữ cảnh codebase và mức độ ưu tiên             |
| `brainstorm`      | Khám phá ý tưởng và phân tích vấn đề phức tạp trước khi lên kế hoạch            |
| `docs`            | Tạo mới hoặc làm mới tài liệu project dựa trên trạng thái repo hiện tại         |
| `execute-plan`    | Thực thi kế hoạch đã viết theo từng giai đoạn với các điểm kiểm tra             |
| `git-commit`      | Tạo commit message theo chuẩn conventional từ thay đổi đã stage hoặc chưa stage |
| `quick-implement` | Triển khai nhanh cho các thay đổi nhỏ, phạm vi rõ ràng                          |
| `write-plan`      | Tạo kế hoạch triển khai chi tiết theo từng giai đoạn                            |

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
as-fix
```

Dùng khi có lỗi cụ thể, test thất bại hoặc hành vi không mong muốn cần chẩn đoán.

```
/as-fix TypeError: Cannot read properties of undefined at checkout.ts:42

# Lỗi đơn giản: agent chẩn đoán, áp dụng fix, kiểm tra
# Lỗi phức tạp: agent dừng lại và chuyển sang write-plan
```

## Agent được hỗ trợ

<details>
<summary>Xem tất cả 40 agent được hỗ trợ</summary>

AdaL, Amp, Antigravity, Augment, Claude Code, Cline, CodeBuddy, Codex, Command Code, Continue, Cortex Code, Crush, Cursor, Droid, Gemini CLI, GitHub Copilot, Goose, iFlow CLI, Junie, Kilo Code, Kimi Code CLI, Kiro CLI, Kode, MCPJam, Mistral Vibe, Mux, Neovate, OpenClaw, OpenCode, OpenHands, Pi, Pochi, Qoder, Qwen Code, Replit, Roo Code, Trae, Trae CN, Windsurf, Zencoder

</details>

## Yêu cầu

- Node.js 18+
- `git` có trong `PATH`
- Kết nối mạng (để clone template từ GitHub)

## Chạy lại trình cài đặt

Chạy lại hoàn toàn an toàn. Việc chèn rules là idempotent — nội dung giữa các marker sẽ được thay thế mà không bị trùng lặp. Có thể thêm agent mới vào cài đặt hiện có bất cứ lúc nào.

## Phát hành

Các tag push khớp với `v*` sẽ kích hoạt GitHub Actions workflow `.github/workflows/release.yml` để tự động publish `@buiducnhat/agent-skills` lên npm.

## Tài liệu

- [Tổng quan tài liệu](docs/SUMMARY.md)
