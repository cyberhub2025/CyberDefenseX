<!-- SECURITY.md — CyberDefenseX Ultra -->

<div align="center">

<img src="https://img.shields.io/badge/STATUS-ACTIVELY%20MAINTAINED-00ff88?style=for-the-badge&logo=shieldsdotio&logoColor=black" />
<img src="https://img.shields.io/badge/SECURITY%20POLICY-v1.0.0-7c3aed?style=for-the-badge&logo=shield&logoColor=white" />
<img src="https://img.shields.io/badge/LAST%20UPDATED-MAY%202026-0ea5e9?style=for-the-badge" />

</div>

---

```
 ██████╗██╗   ██╗██████╗ ███████╗██████╗ ██████╗ ███████╗███████╗███████╗███╗   ██╗███████╗███████╗     ██╗  ██╗
██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝████╗  ██║██╔════╝██╔════╝     ╚██╗██╔╝
██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝██║  ██║█████╗  █████╗  █████╗  ██╔██╗ ██║███████╗█████╗  ████  ╚███╔╝ 
██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗██║  ██║██╔══╝  ██╔══╝  ██╔══╝  ██║╚██╗██║╚════██║██╔══╝        ██╔██╗ 
╚██████╗   ██║   ██████╔╝███████╗██║  ██║██████╔╝███████╗██║     ███████╗██║ ╚████║███████║███████╗     ██╔╝ ██╗
 ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚══════╝╚══════╝     ╚═╝  ╚═╝
                                    S E C U R I T Y   P O L I C Y
```

<div align="center">

# 🛡️ Security Policy — CyberDefenseX Ultra

### *Protecting the Platform That Protects You*

[![Responsible Disclosure](https://img.shields.io/badge/Responsible-Disclosure-22c55e?style=flat-square&logo=hackerone)](https://github.com/cyberhub2025/CyberDefenseX_Ultra/security/advisories/new)
[![Blockchain Integrity](https://img.shields.io/badge/Blockchain-Tamper--Proof-7c3aed?style=flat-square&logo=ethereum)](https://cyberdefensex.dpdns.org/)
[![AI Powered](https://img.shields.io/badge/AI-NVIDIA%20NIM%20Secured-00d4ff?style=flat-square&logo=nvidia)](https://cyberdefensex.dpdns.org/)
[![Auth](https://img.shields.io/badge/Auth-OAuth2%20%2B%20Sessions-f59e0b?style=flat-square&logo=auth0)](https://cyberdefensex.dpdns.org/)

</div>

---

## 📋 Table of Contents

| # | Section |
|---|---------|
| 1 | [🔖 Supported Versions](#-supported-versions) |
| 2 | [🚨 Reporting a Vulnerability](#-reporting-a-vulnerability) |
| 3 | [⚡ Response Timeline](#-response-timeline) |
| 4 | [🏗️ Security Architecture](#-security-architecture) |
| 5 | [🔐 Authentication & Authorization](#-authentication--authorization) |
| 6 | [⛓️ Blockchain Integrity Layer](#-blockchain-integrity-layer) |
| 7 | [🤖 AI Assistant Security](#-ai-assistant-security) |
| 8 | [🗄️ Data Security & Storage](#-data-security--storage) |
| 9 | [🌐 API & Network Security](#-api--network-security) |
| 10 | [🔍 Attack Detection Engine Security](#-attack-detection-engine-security) |
| 11 | [📦 Dependency Security](#-dependency-security) |
| 12 | [🚫 Out of Scope](#-out-of-scope) |
| 13 | [🏅 Hall of Fame](#-hall-of-fame) |
| 14 | [📜 Legal & Safe Harbor](#-legal--safe-harbor) |

---

## 🔖 Supported Versions

We actively maintain and apply security patches to the following versions:

| Version | Branch | Support Status | Security Patches |
|---------|--------|---------------|-----------------|
| `1.x` (latest) | `main` | ✅ **Fully Supported** | ✅ Active |
| Pre-release builds | `dev` | ⚠️ **Best Effort** | ⚠️ Limited |
| Older forks / snapshots | N/A | ❌ **Unsupported** | ❌ None |

> [!IMPORTANT]
> Always use the latest commit on `main` for the most secure and stable experience. Older snapshots or forks may contain unpatched vulnerabilities.

---

## 🚨 Reporting a Vulnerability

> [!CAUTION]
> **DO NOT** open a public GitHub Issue for security vulnerabilities. Public disclosure before a patch is released puts all users at risk.

### Preferred Disclosure Channels

We follow a **coordinated responsible disclosure** policy. Please use one of the following methods:

#### 🔒 Option 1 — GitHub Private Security Advisory (Preferred)

Use GitHub's built-in private vulnerability reporting:

```
https://github.com/cyberhub2025/CyberDefenseX_Ultra/security/advisories/new
```

This creates an encrypted, private thread between you and the maintainers — **fully confidential** until a patch is released.

#### 📧 Option 2 — Direct Contact

Reach the core security team via GitHub profiles:

| Maintainer | Role | GitHub |
|------------|------|--------|
| Shuvojit Samanta | Project Architect & AI/ML Lead | [@shuvojitss](https://github.com/shuvojitss) |
| Soumyadeep Adak | Blockchain & Security Dev | [@gitadak](https://github.com/gitadak) |
| Piyush Sarkar | Researcher & Frontend Security | [@Piyush-Sarkar](https://github.com/Piyush-Sarkar) |
| Imon Purkait | Ethical Hacker & Cybersecurity Specialist | [@imon005](https://github.com/imon005) |

### 📝 What to Include in Your Report

Please provide as much detail as possible. A complete report helps us respond faster:

```
VULNERABILITY REPORT TEMPLATE
══════════════════════════════════════════════════════════════
Title          : [Short descriptive title]
Severity       : Critical / High / Medium / Low / Informational
CVSS Score     : [If you've calculated one]
Affected Area  : [Backend API / Frontend / Blockchain / Auth / AI]
Component      : [Filename or endpoint, e.g., app.py /api/alerts]

Description
───────────
[Detailed description of the vulnerability]

Steps to Reproduce
──────────────────
1.
2.
3.

Proof of Concept
────────────────
[Code snippet, screenshot, or HTTP request/response]

Expected Behavior
─────────────────
[What should happen]

Actual Behavior
───────────────
[What actually happens — the vulnerability]

Potential Impact
────────────────
[What an attacker could do with this]

Suggested Fix (Optional)
─────────────────────────
[Your recommendation, if any]
══════════════════════════════════════════════════════════════
```

---

## ⚡ Response Timeline

We are committed to prompt, transparent communication throughout the disclosure process:

```
Day 0   ──┬── Report Received
           │    ↓
Day 1-2 ──┼── Acknowledgement sent to reporter
           │    ↓
Day 3-7 ──┼── Triage & severity assessment completed
           │    ↓
Day 7-30 ─┼── Patch developed and internally tested
           │    ↓
Day 30   ──┼── Coordinated public disclosure + CVE (if applicable)
           │    ↓
Day 30+  ──┴── Reporter credited in Hall of Fame (if desired)
```

| Severity | Acknowledgement | Patch Target | Disclosure |
|----------|----------------|--------------|------------|
| 🔴 **Critical** | < 24 hours | ≤ 7 days | After patch |
| 🟠 **High** | < 48 hours | ≤ 14 days | After patch |
| 🟡 **Medium** | < 72 hours | ≤ 30 days | After patch |
| 🟢 **Low / Info** | < 7 days | Next release | After patch |

---

## 🏗️ Security Architecture

CyberDefenseX Ultra is built with a **defense-in-depth** philosophy — multiple independent security layers that don't rely on a single point of trust.

```
┌─────────────────────────────────────────────────────────────────┐
│                        SECURITY LAYERS                          │
│                                                                 │
│  ┌──────────────┐   ┌─────────────┐   ┌──────────────────────┐  │
│  │   React SPA  │   │  FastAPI    │   │  Blockchain Layer    │  │
│  │  (Frontend)  │   │  Backend    │   │  (Tamper Detection)  │  │
│  │              │   │             │   │                      │  │
│  │ • CSP        │   │ • CORS      │   │ • SHA-256 Hash Chain │  │
│  │ • OAuth2     │   │ • JWT/Sess  │   │ • Merkle Trees       │  │
│  │ • HTTPS Only │   │ • RLE Guard │   │ • Leader-Worker Rep  │  │
│  │ • No .env    │   │ • Rate Lim  │   │ • Integrity Alerts   │  │
│  │   exposure   │   │ • Input Val │   │                      │  │
│  └──────┬───────┘   └──────┬──────┘   └──────────┬───────────┘  │
│         │                  │                     │              │
│         └──────────────────┴─────────────────────┘              │
│                           │                                     │
│                  ┌────────▼────────┐                            │
│                  │  SQLite Storage │                            │
│                  │ • users.db      │                            │
│                  │ • app_data.db   │                            │
│                  │ • alerts.xlsx   │                            │
│                  └─────────────────┘                            │
└─────────────────────────────────────────────────────────────────┘
```

### Security Principles

- **Zero Trust by Default** — Every request is authenticated; no implicit trust between components
- **Least Privilege** — API keys, DB access, and OAuth scopes are scoped to the minimum required
- **Immutable Audit Trail** — All alert records are blockchain-protected; tampering is detected and alerted
- **Fail-Safe Defaults** — The system fails closed; errors don't expose sensitive data

---

## 🔐 Authentication & Authorization

### Authentication Methods

| Method | Provider | Implementation | Session Storage |
|--------|----------|----------------|----------------|
| Local Credentials | Built-in | bcrypt password hashing | Signed server-side session |
| Google OAuth 2.0 | Google Identity | `authlib` OAuth2 client | Signed server-side session |
| GitHub OAuth | GitHub Apps | `authlib` OAuth2 client | Signed server-side session |

### Security Hardening Measures

```python
# Session security (backend/app.py)
app.add_middleware(SessionMiddleware,
    secret_key=SECRET_KEY,   # From .env — never hardcoded
    https_only=True,         # Cookies only over HTTPS
    same_site="lax"          # CSRF mitigation
)
```

### Security Best Practices for Operators

> [!WARNING]
> The default `SECRET_KEY` in the repository is a **placeholder**. You MUST replace it with a cryptographically strong random string before any production deployment.

```bash
# Generate a secure SECRET_KEY (Linux/macOS)
python3 -c "import secrets; print(secrets.token_hex(64))"

# PowerShell (Windows)
python -c "import secrets; print(secrets.token_hex(64))"
```

**Recommended `.env` hardening checklist:**

- [ ] `SECRET_KEY` — minimum 64 hex characters, randomly generated
- [ ] `NVIDIA_API_KEY` — never committed to version control; use `.gitignore`
- [ ] OAuth credentials — stored only in `.env`, never in frontend code
- [ ] `FRONTEND_URL` — explicitly whitelist only known origins
- [ ] Rotate all secrets immediately if a `.env` file is ever accidentally committed

---

## ⛓️ Blockchain Integrity Layer

One of CyberDefenseX Ultra's most distinctive security features is its **built-in tamper-evident blockchain** for protecting alert integrity.

### How It Works

```
Alert Detected → RLE Engine → excel2.xlsx → Leader Node
                                                  │
                              ┌───────────────────▼──────────────────────┐
                              │           Block Construction             │
                              │   • Previous block hash (SHA-256)        │
                              │   • Alert data payload                   │
                              │   • Merkle root of all transactions      │
                              │   • Timestamp + Nonce                    │
                              └───────────────────┬──────────────────────┘
                                                  │
                              ┌───────────────────▼──────────────────────┐
                              │           Worker Replication             │
                              │   • HTTP broadcast to worker nodes       │
                              │   • Workers verify chain hash continuity │
                              │   • Mismatch → Integrity Alert fired     │
                              └──────────────────────────────────────────┘
```

### Integrity Guarantees

| Guarantee | Mechanism |
|-----------|-----------|
| **Data Immutability** | SHA-256 hash chaining — any change invalidates all subsequent blocks |
| **Tamper Detection** | Background integrity checker polls `/blockchain/verify` continuously |
| **Alert Notification** | SSE push fires `notifications.new` event on any detected tampering |
| **Backup Comparison** | `alerts_backup.xlsx` is compared against live data to catch file-level tampering |
| **Multi-node Consensus** | Worker nodes independently verify the Leader's chain |

> [!NOTE]
> The blockchain does **not** use Proof-of-Work mining — it uses a hash-chain model optimized for audit-trail integrity rather than distributed consensus, making it fast and suitable for real-time SOC operations.

---

## 🤖 AI Assistant Security

The AI Assistant is powered by **NVIDIA NIM (GPT-oss-120B)** and has specific security boundaries enforced.

### Data Handling

- **Context Scope** — The AI receives only sanitized alert summaries from `app_data.db`, never raw log data containing potentially sensitive payload strings
- **No PII Transmission** — User identity data is never sent to the NVIDIA NIM API
- **API Key Isolation** — The `NVIDIA_API_KEY` lives exclusively in `backend/.env` and is never exposed to the frontend or included in API responses
- **Local Fallback** — If the NIM API is unavailable, the assistant falls back gracefully without leaking error details to the client

### Prompt Injection Awareness

> [!WARNING]
> Be aware that attackers who can inject data into monitored log files could theoretically craft log entries that influence AI assistant responses (indirect prompt injection). Future versions will include explicit prompt sanitization layers.

**Current mitigations:**
- Alert data passed to the AI is pre-processed and structured — raw log strings are not forwarded verbatim
- AI responses are rendered as plain text in the frontend — no HTML/script execution

---

## 🗄️ Data Security & Storage

### Database Security

| Database | Contents | Access Control | Encryption |
|----------|----------|----------------|------------|
| `users.db` | User accounts, OAuth tokens, password hashes | Backend-only; never exposed via API | Passwords hashed (bcrypt) |
| `app_data.db` | Alerts, statuses, notifications, reports | Authenticated API endpoints only | SQLite file-level (OS permissions) |
| `blockchain.json` | Immutable blockchain ledger | Read-only via `/blockchain/verify` | SHA-256 hash chain |
| `alerts.xlsx` | Master alert spreadsheet | Protected by blockchain hash verification | Hash-compared on every read |

### File Security Recommendations

> [!CAUTION]
> The following files contain sensitive data and must **never** be committed to version control or exposed publicly:

```
backend/.env              # API keys, SECRET_KEY, OAuth credentials
backend/users.db          # User credentials (even hashed)
backend/app_data.db       # Internal alert and notification data
backend/input.log         # Raw network log data — may contain PII
backend/Blockchain/leader/blockchain.json  # Audit ledger
```

**Verify your `.gitignore` covers these files:**

```gitignore
# Secrets
backend/.env

# Databases
backend/*.db

# Logs
backend/*.log

# Generated files
backend/reports/
backend/Blockchain/leader/blockchain.json
backend/Blockchain/worker/worker_blockchain.json
```

---

## 🌐 API & Network Security

### CORS Configuration

The backend enforces strict CORS origin whitelisting via `FRONTEND_URL` in `.env`:

```python
# backend/app.py
app.add_middleware(CORSMiddleware,
    allow_origins=FRONTEND_URL.split(","),  # Only whitelisted origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
```

**Allowed Origins (Production):**
- `https://cyberdefensex.dpdns.org`
- `https://cyberhub2025.github.io`

### API Endpoint Security

| Endpoint Category | Auth Required | Rate Limited | Notes |
|-------------------|--------------|-------------|-------|
| `/api/alerts` | ✅ Yes | Recommended | Returns live threat data |
| `/api/notifications` | ✅ Yes | Recommended | Internal event stream |
| `/api/ai/chat` | ✅ Yes | ✅ Critical | Proxies to paid NIM API |
| `/api/reports/generate` | ✅ Yes | Recommended | CPU-intensive PDF generation |
| `/stream/events` | ✅ Yes | N/A | SSE real-time push |
| `/blockchain/verify` | ✅ Yes | Low priority | Read-only integrity check |
| `/auth/login` | ❌ Public | ✅ Critical | Brute force target |
| `/auth/google` | ❌ Public | Recommended | OAuth redirect |
| `/auth/github` | ❌ Public | Recommended | OAuth redirect |

> [!TIP]
> It is strongly recommended to place the backend behind a **reverse proxy** (nginx, Caddy, or Cloudflare Tunnel) that enforces TLS termination, rate limiting, and request logging in production.

### SSE Security

Server-Sent Events (`/stream/events`) deliver real-time data to authenticated clients. Ensure:

- SSE connections are authenticated at the HTTP level before the stream is opened
- The event bus does not broadcast sensitive raw data — only structured event types (`alerts.changed`, `notifications.new`, `logs.received`)

---

## 🔍 Attack Detection Engine Security

### RLE (Real-time Log Engine) — Security Considerations

The RLE engine (`rle.py`) processes raw HTTP access logs from `input.log`. This introduces specific security considerations:

```
input.log (raw syslog) ──▶ rle.py parser ──▶ Structured Alert Objects
                              │
                              ├── Regex pattern matching (no eval)
                              ├── IP extraction and geolocation
                              └── Severity scoring algorithm
```

**Security properties:**
- Pattern matching uses compiled regex — no dynamic code execution
- Log lines are parsed as strings only — never executed or eval'd
- Malformed log lines are skipped with error logging, not propagated

**Known limitation:**
- Extremely high-volume log ingestion (>10k lines/sec) may cause alert queue backpressure — implement log rotation and rate controls at the syslog source

### Detected Attack Types & False Positive Rates

| Attack Type | Detection Method | Expected False Positive Rate |
|-------------|-----------------|------------------------------|
| SQL Injection | Regex keyword patterns | Low — specific SQL syntax |
| XSS | Script/cookie injection patterns | Low–Medium |
| DoS | ≥30 req/IP/URL in 2s window | Medium — may catch crawlers |
| Brute Force | ≥5 HTTP 401 from same IP in 10s | Low |
| Directory Traversal | Path traversal pattern match | Low |
| Session Hijacking | localStorage/cookie XSS patterns | Low |

---

## 📦 Dependency Security

### Backend Dependencies (Python)

| Package | Version | Purpose | Security Notes |
|---------|---------|---------|----------------|
| `fastapi` | 0.104.1 | API framework | Actively maintained; check for updates |
| `uvicorn[standard]` | 0.24.0 | ASGI server | Standard mode includes websocket support |
| `authlib` | 1.3.0 | OAuth2 client | Pinned version — verify against CVE database |
| `python-multipart` | 0.0.6 | File upload parsing | Needed for form data |
| `itsdangerous` | 2.1.2 | Session signing | Core session security dependency |
| `openai` | 1.12.0 | NVIDIA NIM SDK | Proxied API calls only |
| `sse-starlette` | 1.8.2 | Server-Sent Events | Authenticated streams |
| `reportlab` | 4.2.0 | PDF generation | No external resources loaded in PDFs |

### Keeping Dependencies Secure

```bash
# Audit Python dependencies for known CVEs
pip install pip-audit
pip-audit -r backend/requirements.txt

# Check for outdated packages
pip list --outdated

# Update all dependencies
pip install --upgrade -r backend/requirements.txt
```

```bash
# Audit Node.js dependencies
cd frontend
npm audit
npm audit fix
```

> [!TIP]
> Consider enabling **Dependabot** in your GitHub repository settings to automatically receive PRs for dependency updates with known CVEs.

---

## 🚫 Out of Scope

The following are **not** considered valid security vulnerabilities for this project:

| Category | Examples |
|----------|---------|
| **Self-affecting issues** | XSS that only affects your own session |
| **Social engineering** | Phishing attempts against maintainers |
| **DoS via resource exhaustion** | Overwhelming the dev server with traffic |
| **Issues in unsupported versions** | Forks, snapshots, or outdated branches |
| **Missing security headers on dev server** | Uvicorn dev mode lacks production headers by design |
| **Theoretical issues without PoC** | Reports with no reproducible steps |
| **Third-party services** | GitHub, Google OAuth, NVIDIA NIM — report these to their respective teams |
| **UI/UX concerns** | Confusing workflows are UX bugs, not security issues |
| **Informational findings** | Banner grabbing, version disclosure in non-sensitive contexts |

---

## 🏅 Hall of Fame

We deeply appreciate responsible security researchers. All reporters who submit valid, previously-unknown vulnerabilities and follow responsible disclosure will be credited here (with permission).

| Researcher | Severity | CVE | Year |
|------------|----------|-----|------|
| *Be the first! Report a vulnerability responsibly.* | — | — | — |

> To be listed here, submit a valid vulnerability via the private advisory channel and indicate that you'd like to be credited (with your preferred name/handle/profile link).

---

## 📜 Legal & Safe Harbor

### Our Commitment to Researchers

CyberDefenseX Ultra and its maintainers (**cyberhub2025**) commit to the following for researchers acting in good faith:

- ✅ We will **not pursue legal action** against researchers who comply with this policy
- ✅ We will **acknowledge your contribution** in our Hall of Fame (if desired)
- ✅ We will **respond promptly** within the timelines stated in this policy
- ✅ We will **keep your report confidential** until a coordinated disclosure date is agreed

### Researcher Obligations (Good Faith Rules)

To qualify for safe harbor, researchers must:

- ❌ **Not access**, modify, or destroy any user data beyond what is necessary to demonstrate the vulnerability
- ❌ **Not disrupt** production services or perform denial-of-service attacks
- ❌ **Not socially engineer** maintainers, users, or third parties
- ❌ **Not publicly disclose** the vulnerability before a patch is available and a disclosure date is agreed
- ✅ **Report findings promptly** and allow reasonable time for remediation
- ✅ **Use test environments** when possible instead of production systems

> [!NOTE]
> This policy is based on the principles of [disclose.io](https://disclose.io/) and ISO/IEC 29147 (Vulnerability Disclosure) and ISO/IEC 30111 (Vulnerability Handling Processes).

---

## 🔗 Related Security Resources

| Resource | Link |
|----------|------|
| 📖 Full Documentation | [deepwiki.com/cyberhub2025/CyberDefenseX_Ultra](https://deepwiki.com/cyberhub2025/CyberDefenseX_Ultra) |
| 🌐 Live Platform | [cyberdefensex.dpdns.org](https://cyberdefensex.dpdns.org/) |
| 🤝 Contributing Guide | [CONTRIBUTING.md](./CONTRIBUTING.md) |
| 📋 Project README | [README.md](./README.md) |
| 🔒 Private Advisory | [Submit Advisory](https://github.com/cyberhub2025/CyberDefenseX_Ultra/security/advisories/new) |
| 🐛 Public Issues | [GitHub Issues](https://github.com/cyberhub2025/CyberDefenseX_Ultra/issues) *(non-security only)* |

---

<div align="center">

---

```
████████████████████████████████████████████████████████████████████
█                                                                  █
█        S E C U R I T Y   I S   N O T   A   F E A T U R E         █
█                  I T ' S   A   F O U N D A T I O N               █
█                                                                  █
████████████████████████████████████████████████████████████████████
```

**Built with ❤️ by the CyberDefenseX Team**

[![GitHub](https://img.shields.io/badge/GitHub-cyberhub2025-181717?style=for-the-badge&logo=github)](https://github.com/cyberhub2025)
[![Platform](https://img.shields.io/badge/Platform-CyberDefenseX-7c3aed?style=for-the-badge&logo=shield)](https://cyberdefensex.dpdns.org/)

*This document is reviewed and updated with every major release.*
*Last reviewed: May 2026*

</div>
