# 🤝 Contributing to CyberDefenseX

> **"Every great system is built on the shoulders of contributors who cared."**

First of all — **thank you** for taking the time to contribute to **CyberDefenseX**! Whether you're fixing a bug, proposing a feature, improving the docs, or writing tests — every contribution makes this platform stronger, smarter, and more secure.

This document is your complete guide to contributing effectively. Please read it carefully before submitting anything.

[![GitHub Issues](https://img.shields.io/github/issues/cyberhub2025/CyberDefenseX?style=for-the-badge&color=crimson)](https://github.com/cyberhub2025/CyberDefenseX/issues)
[![GitHub PRs](https://img.shields.io/github/issues-pr/cyberhub2025/CyberDefenseX?style=for-the-badge&color=blueviolet)](https://github.com/cyberhub2025/CyberDefenseX/pulls)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Docs](https://deepwiki.com/badge.svg)](https://deepwiki.com/cyberhub2025/CyberDefenseX)

---

## 📋 Table of Contents

1. [Code of Conduct](#-code-of-conduct)
2. [How Can I Contribute?](#-how-can-i-contribute)
3. [Project Architecture Overview](#-project-architecture-overview)
4. [Development Environment Setup](#-development-environment-setup)
5. [Branch Strategy & Workflow](#-branch-strategy--workflow)
6. [Commit Message Convention](#-commit-message-convention)
7. [Pull Request Guidelines](#-pull-request-guidelines)
8. [Frontend Contribution Guide](#-frontend-contribution-guide)
9. [Backend Contribution Guide](#-backend-contribution-guide)
10. [Blockchain Module Guide](#-blockchain-module-guide)
11. [AI Assistant Module Guide](#-ai-assistant-module-guide)
12. [Testing Requirements](#-testing-requirements)
13. [Reporting Bugs](#-reporting-bugs)
14. [Requesting Features](#-requesting-features)
15. [Security Vulnerability Disclosure](#-security-vulnerability-disclosure)
16. [Style Guides](#-style-guides)
17. [Recognition & Credits](#-recognition--credits)

---

## 🛡️ Code of Conduct

By participating in this project, you agree to uphold our standards of open, respectful, and inclusive collaboration:

- ✅ **Be respectful** — Critique ideas, not people.
- ✅ **Be constructive** — Feedback should uplift and improve.
- ✅ **Be inclusive** — We welcome contributors from all backgrounds.
- ✅ **Be transparent** — Disclose conflicts of interest honestly.
- ❌ **No harassment, discrimination, or personal attacks** — Ever.

Violations can be reported to the maintainers at **[cyberhub2025@github.com](mailto:cyberhub2025@github.com)** and will be handled swiftly and privately.

---

## 💡 How Can I Contribute?

There are many ways to contribute — you don't need to write code to make an impact:

| Contribution Type | Description |
|---|---|
| 🐛 **Bug Reports** | Found a bug? Open a detailed issue |
| ✨ **Feature Requests** | Have an idea? Propose it via an issue |
| 🔧 **Bug Fixes** | Pick up a `good first issue` or `bug` label |
| 🚀 **New Features** | Work on `enhancement` labeled issues |
| 📝 **Documentation** | Improve README, guides, inline comments |
| 🧪 **Tests** | Add or improve test coverage |
| 🎨 **UI/UX Improvements** | Enhance the glassmorphic dashboard |
| 🔐 **Security Auditing** | Review attack detection logic, auth flows |
| 🌍 **Translations** | Help localize the platform |

---

## 🏗️ Project Architecture Overview

Before diving in, familiarize yourself with how the system is structured:

```
CyberDefenseX/
│
├── frontend/                    ← React 18 SPA (Tailwind + Vanilla CSS)
│   └── src/
│       ├── components/          ← Reusable UI components (Sidebar, etc.)
│       ├── hooks/               ← Custom hooks (useEventStream for SSE)
│       └── pages/               ← Full page views (Overview, Threats, AI, Blockchain…)
│
├── backend/                     ← FastAPI + Uvicorn async server
│   ├── app.py                   ← Core API routes, CORS, SSE endpoints, lifespan
│   ├── rle.py                   ← Real-time Log Engine (attack detection)
│   ├── ai.py                    ← NVIDIA NIM AI assistant integration
│   ├── event_bus.py             ← Async in-process pub/sub for SSE
│   ├── alerts_cache.py          ← Thread-safe in-memory alert cache
│   ├── report.py                ← PDF generation with ReportLab
│   └── Blockchain/
│       ├── leader/              ← Block mining, hashing, Merkle verification
│       └── worker/              ← Chain replication & tamper detection
│
└── .github/workflows/
    └── deploy.yml               ← GitHub Actions → GitHub Pages CI/CD
```

> [!IMPORTANT]
> The **RLE engine** (`rle.py`) and **Blockchain leader** (`blockchain.py`) are the two most critical and sensitive modules. Contributions touching these must include detailed explanations and be reviewed by a core maintainer.

---

## ⚙️ Development Environment Setup

### Prerequisites

| Tool | Minimum Version |
|---|---|
| Node.js | ≥ 18.x |
| npm | ≥ 9.x |
| Python | ≥ 3.10 |
| pip | Latest |
| Git | ≥ 2.40 |

### 1. Fork & Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/<your-username>/CyberDefenseX.git
cd CyberDefenseX

# Add the upstream remote
git remote add upstream https://github.com/cyberhub2025/CyberDefenseX.git
```

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt

# Copy the environment template and fill in your keys
cp .env.example .env
```

**Required environment variables (`backend/.env`):**

```env
NVIDIA_API_KEY=your_nvidia_nim_api_key_here
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8000
SECRET_KEY=a_strong_random_secret_key
GOOGLE_CLIENT_ID=optional_for_oauth
GOOGLE_CLIENT_SECRET=optional_for_oauth
GITHUB_CLIENT_ID=optional_for_oauth
GITHUB_CLIENT_SECRET=optional_for_oauth
```

```bash
# Start the backend server with auto-reload
python app.py
# → API server running at http://localhost:8000
# → Swagger docs at http://localhost:8000/docs
```

### 3. Frontend Setup

```bash
cd frontend
npm install

# Set the backend URL
echo "REACT_APP_BACKEND_API_URL=http://localhost:8000" > .env
```

```bash
npm start
# → React dev server running at http://localhost:3000
```

### 4. Verify Everything Works

- Open `http://localhost:3000` — the landing page should load
- Open `http://localhost:8000/docs` — FastAPI Swagger UI should appear
- Log in and navigate to the **Overview** dashboard — charts should populate

> [!TIP]
> You can test the RLE engine without a live syslog feed by appending raw HTTP log lines to `backend/input.log`. The engine polls for new lines every second.

---

## 🌿 Branch Strategy & Workflow

We follow a **feature-branch workflow** off of `main`.

```
main          ← Protected. Only merged via reviewed PRs.
  └── feat/my-new-feature      ← Your working branch
  └── fix/bug-description
  └── docs/update-readme
  └── refactor/module-name
  └── test/coverage-improvement
  └── chore/dependency-update
```

### Step-by-Step Workflow

```bash
# 1. Always start from an up-to-date main
git checkout main
git pull upstream main

# 2. Create your feature branch
git checkout -b feat/your-feature-name

# 3. Make your changes...

# 4. Stage and commit using the convention below
git add .
git commit -m "feat(rle): add SSRF attack pattern detection"

# 5. Sync with upstream before pushing
git fetch upstream
git rebase upstream/main

# 6. Push your branch
git push origin feat/your-feature-name

# 7. Open a Pull Request on GitHub
```

> [!WARNING]
> **Never commit directly to `main`.** All changes must go through a Pull Request and receive at least **1 approval** from a core maintainer.

---

## ✍️ Commit Message Convention

We use **[Conventional Commits](https://www.conventionalcommits.org/)** to keep the history clean and automated changelogs possible.

### Format

```
<type>(<scope>): <short description>

[optional body]

[optional footer(s)]
```

### Types

| Type | When to Use |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only changes |
| `style` | Formatting, missing semicolons (no logic change) |
| `refactor` | Code restructuring without changing behavior |
| `test` | Adding or updating tests |
| `chore` | Dependency updates, tooling, CI config |
| `perf` | Performance improvements |
| `security` | Security patches or hardening |

### Scopes

Use the module name as scope: `rle`, `blockchain`, `ai`, `dashboard`, `auth`, `sse`, `report`, `api`, `frontend`, `ci`

### Examples

```bash
feat(rle): add SSRF detection pattern to log engine
fix(blockchain): prevent duplicate block mining on rapid alerts
docs(api): add missing endpoint docs for /alerts/status
refactor(ai): extract NVIDIA NIM request logic into helper
security(auth): enforce PKCE for OAuth2 authorization code flow
perf(sse): batch SSE events to reduce client-side renders
```

---

## 🔃 Pull Request Guidelines

### Before Opening a PR

- [ ] Your branch is rebased on the latest `main`
- [ ] Your code follows the style guides below
- [ ] You've tested your changes locally (both frontend and backend if applicable)
- [ ] You've added or updated relevant comments and docstrings
- [ ] No sensitive data (API keys, credentials, `.env` files) is committed

### PR Title

Follow the same Conventional Commits format:
```
feat(threats): add multi-filter support with AND/OR logic
```

### PR Description Template

When opening a PR, fill out the following:

```markdown
## 📋 Summary
<!-- What does this PR do? Why is it needed? -->

## 🔄 Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Refactor / Performance
- [ ] Security patch

## 🧪 How Has This Been Tested?
<!-- Describe how you tested your changes -->

## 📸 Screenshots (if UI change)
<!-- Attach before/after screenshots -->

## ✅ Checklist
- [ ] Code follows project style guides
- [ ] Self-reviewed my code
- [ ] No new warnings introduced
- [ ] Relevant docs updated
- [ ] No `.env` or secrets committed
```

### Review Process

1. A maintainer will review your PR within **3–5 business days**
2. Address all review comments — push additional commits to the same branch
3. Once approved, a maintainer will **squash-merge** your PR into `main`
4. Your name will be added to the contributors list 🎉

---

## 🎨 Frontend Contribution Guide

The frontend is a **React 18 SPA** using `HashRouter` (required for GitHub Pages), Recharts, React-Leaflet, and a glassmorphic design system.

### Key Principles

- **Component-first**: Every new UI element should be a focused, reusable component
- **Design system compliance**: Use existing CSS variables from `src/index.css` — do not hardcode colors or font sizes
- **SSE-awareness**: Real-time data comes from `useEventStream` — subscribe to the correct event types (`alerts.changed`, `logs.received`, `notifications.new`)
- **Dark/Light theme**: All styles must work in both themes using CSS `var()` tokens

### Adding a New Page

1. Create `src/pages/YourPage.js` and `src/pages/YourPage.css`
2. Register the route in `src/App.js`
3. Add the nav entry in `src/components/Sidebar.js`
4. Follow the existing page structure (header, content area, responsive grid)

### CSS Guidelines

```css
/* ✅ DO — Use design system variables */
.my-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
}

/* ❌ DON'T — Hardcode values */
.my-card {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
}
```

### Chart Components (Recharts)

When adding new charts, follow the established pattern in `Overview.js` and `Vulnerabilities.js`:
- Use `ResponsiveContainer` for all chart wrappers
- Apply theme colors from CSS variables via `stroke` and `fill` props
- Provide a `CustomTooltip` component for branded tooltip styling

---

## 🐍 Backend Contribution Guide

The backend is a **FastAPI** async application with SQLite databases, SSE event broadcasting, and a blockchain integrity layer.

### Key Architecture Decisions

| Decision | Rationale |
|---|---|
| `AsyncGenerator` SSE endpoints | Keeps connections alive without blocking the event loop |
| `event_bus.py` pub/sub | Decouples producers (RLE, blockchain) from SSE consumers |
| `alerts_cache.py` | Reduces SQLite reads on hot endpoints — always update the cache when mutating alerts |
| `app_data.db` vs `users.db` | Security isolation — user credentials are never in the same DB as operational data |

### Adding a New API Endpoint

```python
# In app.py — follow this pattern:
@app.get("/your-resource", tags=["Your Tag"])
async def get_your_resource(
    limit: int = Query(100, ge=1, le=1000),
    # other typed params...
):
    """
    Brief description of what this endpoint returns.
    
    - **limit**: Maximum number of items to return
    """
    try:
        # ... implementation
        return {"status": "success", "data": result}
    except Exception as e:
        logger.error(f"Failed to fetch your resource: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
```

### SSE Event Publishing

When your backend change should trigger a real-time frontend update:

```python
from event_bus import publish

# Publish after mutating state
await publish("alerts.changed", {"source": "your-module", "count": len(alerts)})
```

### Database Guidelines

- Always use parameterized queries — **never string-format SQL**
- Close connections in `finally` blocks
- Validate and sanitize all user-supplied input before any DB operation
- New tables should be created in `app_data.db` (not `users.db`) unless they're user identity data

---

## ⛓️ Blockchain Module Guide

The blockchain layer is a **custom SHA-256 hash chain** with Merkle tree verification. This is a high-sensitivity module.

### Architecture

```
Leader Node (backend/Blockchain/leader/)
  ├── blockchain.py   ← Mine blocks, verify chain, manage workers
  ├── broadcast.py    ← Watch alerts.xlsx for changes → broadcast new blocks
  └── blockchain.json ← The canonical ledger (never edit manually)

Worker Node (backend/Blockchain/worker/)
  ├── blockchain.py   ← Replicate chain from leader, run integrity checks
  └── worker_blockchain.json ← Worker's local chain copy
```

### Rules for Blockchain Contributions

> [!CAUTION]
> Modifying the mining logic, hash functions, or Merkle tree implementation can silently corrupt the entire chain. All such changes require:
> - A detailed explanation in the PR description
> - A reproducible test case showing the chain remains valid before and after
> - Explicit review by a core maintainer

- **Do not** change the block schema without a migration plan
- **Do not** modify `blockchain.json` or `worker_blockchain.json` directly in commits
- **Do** write unit tests for any new verification logic
- **Do** document the cryptographic rationale for any algorithm change

---

## 🤖 AI Assistant Module Guide

The AI module (`backend/ai.py`) interfaces with **NVIDIA NIM API** (default: `gpt-oss-120b`) and includes a local fallback for offline operation.

### Adding New AI Capabilities

1. New prompt templates should live in clearly named constants at the top of `ai.py`
2. Context injection (alert data, blockchain state) must be **size-bounded** — never send unbounded data to the API
3. All API calls must have retry logic and graceful degradation to the local fallback
4. User inputs must be sanitized before inclusion in prompts (prevent prompt injection)

### Environment Variables

| Variable | Purpose |
|---|---|
| `NVIDIA_API_KEY` | Authentication for NVIDIA NIM API |
| `NVIDIA_MODEL` | (Optional) Override default model name |

---

## 🧪 Testing Requirements

### Backend Testing

```bash
cd backend
pip install pytest pytest-asyncio httpx

# Run tests
pytest tests/ -v
```

For new backend features, include:
- **Unit tests** for pure functions (detection patterns, hash functions, data parsers)
- **Integration tests** for new API endpoints using `httpx.AsyncClient`

### Frontend Testing

```bash
cd frontend
npm test
```

For new frontend components, include:
- **Render tests** — does the component mount without errors?
- **Interaction tests** — do click handlers, filters, and state changes work?

### RLE Engine Testing

The RLE engine can be tested by writing crafted HTTP log lines to `input.log`. A test log generator template:

```bash
# SQL Injection test
echo '192.168.1.100 - - [03/May/2026:12:00:00 +0000] "GET /search?q=UNION+SELECT+1,2,3-- HTTP/1.1" 200 1234' >> backend/input.log

# Brute Force simulation (paste 5+ times rapidly)
echo '10.0.0.5 - - [03/May/2026:12:00:01 +0000] "POST /login HTTP/1.1" 401 89' >> backend/input.log
```

---

## 🐛 Reporting Bugs

Found something broken? Great catch! Please follow this process:

### 1. Search First

Check [existing issues](https://github.com/cyberhub2025/CyberDefenseX/issues) to avoid duplicates.

### 2. Open a Bug Report

Use the **Bug Report** issue template and include:

```markdown
**🐛 Bug Description**
A clear description of what the bug is.

**📋 Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**✅ Expected Behavior**
What you expected to happen.

**❌ Actual Behavior**
What actually happened.

**📸 Screenshots / Logs**
Attach relevant browser console errors or backend tracebacks.

**💻 Environment**
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 124]
- Node.js: [e.g. 20.x]
- Python: [e.g. 3.11]
```

### Priority Labels

| Label | Description |
|---|---|
| `critical` | System crash, data loss, security breach |
| `high` | Feature broken, major UX issue |
| `medium` | Minor feature broken, workaround exists |
| `low` | Cosmetic, documentation |

---

## ✨ Requesting Features

Have an idea that could make CyberDefenseX smarter or more powerful?

1. **Check the [Roadmap](README.md#-roadmap)** — it might already be planned
2. **Search [existing issues](https://github.com/cyberhub2025/CyberDefenseX/issues)** for similar proposals
3. **Open a Feature Request** using the template:

```markdown
**🚀 Feature Summary**
A concise description of the feature.

**💡 Motivation / Problem Solved**
Why is this feature needed? What problem does it solve?

**📐 Proposed Implementation**
High-level description of how you'd implement it.

**🔗 Related Issues / PRs**
Link any related discussions.

**📊 Impact Assessment**
Which modules would be affected? (frontend / backend / blockchain / AI)
```

---

## 🔐 Security Vulnerability Disclosure

> [!CAUTION]
> **DO NOT open public GitHub issues for security vulnerabilities.**

If you discover a security vulnerability — especially in the blockchain integrity layer, authentication flows, or RLE engine — please follow **responsible disclosure**:

1. **Email**: Contact the maintainers privately at the email on the GitHub profile
2. **Include**: Detailed description, reproduction steps, and potential impact
3. **Wait**: Allow up to **72 hours** for an initial response before any public disclosure
4. **Credit**: Responsible reporters will be credited in the security advisory

We take all security reports seriously and will work with you to resolve issues promptly.

---

## 🎨 Style Guides

### Python (Backend)

- Follow **[PEP 8](https://peps.python.org/pep-0008/)** — use `black` for auto-formatting
- Use **type hints** on all function signatures
- Write **docstrings** for all public functions and classes
- Maximum line length: **120 characters**

```bash
# Auto-format before committing
pip install black
black backend/
```

### JavaScript / React (Frontend)

- Follow **[Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)**
- Use **functional components** with hooks — no class components
- Prefer **named exports** over default exports for components
- Keep component files **under 400 lines** — split large components
- Use `const` by default, `let` only when reassignment is needed

```bash
# Lint before committing
cd frontend
npm run lint
```

### CSS

- Use **BEM-like naming** for component-specific classes: `.threats-table__row--critical`
- All new CSS variables must be defined on `:root` in `index.css`
- Mobile-first responsive design with breakpoints at `768px` and `1200px`
- No `!important` — structure your selectors properly

### Git

- Keep commits atomic — one logical change per commit
- Rebase rather than merge when updating your branch
- Delete your feature branch after the PR is merged

---

## 🏆 Recognition & Credits

We believe in recognizing every form of contribution.

### Contributor Tiers

| Tier | Criteria |
|---|---|
| 🥉 **Community Contributor** | 1+ merged PR or significant bug report |
| 🥈 **Active Contributor** | 5+ merged PRs or sustained involvement |
| 🥇 **Core Contributor** | Consistent high-impact contributions over time |
| 🌟 **Maintainer** | Trusted with repo access and PR reviews |

All contributors are featured in our README and in the GitHub Contributors graph.

### Hall of Fame

A special thank you to our founding contributors who built the foundation:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/shuvojitss">
        <img src="https://github.com/shuvojitss.png" width="80" alt="Shuvojit Samanta"/>
        <br /><b>Shuvojit Samanta</b>
      </a>
      <br/>🏗️ Project Architect & AI/ML
    </td>
    <td align="center">
      <a href="https://github.com/gitadak">
        <img src="https://github.com/gitadak.png" width="80" alt="Soumyadeep Adak"/>
        <br /><b>Soumyadeep Adak</b>
      </a>
      <br/>⛓️ Blockchain & Smart Contracts
    </td>
    <td align="center">
      <a href="https://github.com/Piyush-Sarkar">
        <img src="https://github.com/Piyush-Sarkar.png" width="80" alt="Piyush Sarkar"/>
        <br /><b>Piyush Sarkar</b>
      </a>
      <br/>🎨 Research & Frontend Design
    </td>
    <td align="center">
      <a href="https://github.com/imon005">
        <img src="https://github.com/imon005.png" width="80" alt="Imon Purkait"/>
        <br /><b>Imon Purkait</b>
      </a>
      <br/>🔐 Ethical Hacking & Security
    </td>
  </tr>
</table>

---

## 📬 Getting Help

Still have questions? We're here to help:

- 💬 **GitHub Discussions** — [Start a discussion](https://github.com/cyberhub2025/CyberDefenseX/discussions)
- 🐛 **GitHub Issues** — [Browse or open issues](https://github.com/cyberhub2025/CyberDefenseX/issues)
- 📖 **Deep Wiki** — [Full technical docs](https://deepwiki.com/cyberhub2025/CyberDefenseX)
- 🌐 **Live Demo** — [Try the platform](https://cyberdefensex.dpdns.org/)

---

<div align="center">

**Made with ❤️ by the CyberDefenseX Community**

*Autonomous. Transparent. Unbreakable.*

[![Star this repo](https://img.shields.io/github/stars/cyberhub2025/CyberDefenseX?style=social)](https://github.com/cyberhub2025/CyberDefenseX)

</div>
