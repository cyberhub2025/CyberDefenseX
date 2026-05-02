# CyberDefense SOC Platform — Architecture & What's New

---

## What's New (v2.0 — Production Architecture)

### 🚀 Event-Driven Architecture with SSE Fan-Out

The entire data pipeline has been rebuilt from a **polling-heavy** model to an **event-driven** model with **Server-Sent Events (SSE)** push to the frontend.

| Feature | Before (v1) | After (v2) |
|---------|-------------|------------|
| **Alert data delivery** | Every API call re-parses xlsx from disk | In-memory `AlertsCache` — refreshes only on change |
| **Frontend updates** | Blind polling every 5–30s | SSE push — instant updates when data changes |
| **Backend coordination** | 5 independent polling loops, zero coordination | Centralised `EventBus` — components react to events |
| **Logging** | Scattered `print()` statements | Structured logging with levels, timestamps, rotation |
| **FastAPI lifecycle** | Deprecated `@app.on_event` decorators | Modern `lifespan` async context manager |
| **Data latency** | 12s+ (chained polling delays) | ~100ms (event propagation) |
| **Frontend network load** | Constant requests regardless of changes | 90%+ reduction — fetch only on server push |

---

## System Architecture

### High-Level Data Flow

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           EXTERNAL LOG SOURCES                                  │
│                    (Servers, Firewalls, Endpoints, etc.)                        │
└───────────────────────────────┬─────────────────────────────────────────────────┘
                                │ POST /receive-logs
                                ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              BACKEND (FastAPI)                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                      │
│  │  Receiver     │───▶│  input.log   │◀───│  RLE Engine  │                      │
│  │  (reciever.py)│    │              │    │  (rule.py)   │                      │
│  └──────┬───────┘    └──────────────┘    └──────┬───────┘                      │
│         │ emit                                   │ emit                         │
│         │ "logs.received"                        │ "alerts.changed"             │
│         ▼                                        ▼                              │
│  ┌──────────────────────────────────────────────────────┐                      │
│  │                    EVENT BUS                          │                      │
│  │               (event_bus.py — asyncio)                │                      │
│  │                                                      │                      │
│  │   Events: logs.received │ alerts.changed │ *          │                      │
│  └────┬──────────┬──────────┬───────────────────────────┘                      │
│       │          │          │                                                   │
│       ▼          ▼          ▼                                                   │
│  ┌────────┐ ┌────────┐ ┌────────────────┐                                     │
│  │ Alerts │ │Broadcast│ │ SSE Endpoint   │                                     │
│  │ Cache  │ │ Thread  │ │ /api/events    │                                     │
│  └───┬────┘ └───┬────┘ └───────┬────────┘                                     │
│      │          │              │                                                │
│      ▼          ▼              │  Server-Sent Events                            │
│  ┌────────┐ ┌────────────┐    │                                                │
│  │REST API│ │ Blockchain │    │                                                │
│  │endpoints│ │  Leader    │    │                                                │
│  └────────┘ └────────────┘    │                                                │
└───────────────────────────────┼────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND (React)                                      │
│                                                                                 │
│   useEventStream('alerts.changed', () => refetch())                            │
│                                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │ Overview │ │ Threats  │ │  Assets  │ │Blockchain│ │ Reports  │            │
│  │          │ │          │ │          │ │          │ │          │            │
│  │ SSE+60s  │ │ SSE+30s  │ │ on-mount │ │ SSE+60s  │ │ on-mount │            │
│  │ fallback │ │ fallback │ │          │ │ fallback │ │          │            │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘            │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Details

### 1. Event Bus (`event_bus.py`)

The backbone of the event-driven architecture. A process-local async pub/sub system.

- **Thread-safe**: Background threads (RLE, Broadcast) call `emit_threadsafe()` which schedules delivery on the asyncio event loop
- **Wildcard subscriptions**: SSE endpoint subscribes to `"*"` to stream all events
- **Backpressure**: Queues cap at 256 items; overflowed consumers are dropped automatically

```python
# Producer (from any thread)
event_bus.emit_threadsafe("alerts.changed", {"trigger": "rle", "count": 5})

# Consumer (async context)
async for event in event_bus.subscribe("alerts.changed"):
    handle(event)
```

### 2. Alerts Cache (`alerts_cache.py`)

Eliminates the **#1 performance bottleneck** — per-request Excel parsing.

- **Lazy refresh**: Marks itself dirty when `alerts.changed` fires; rebuilds on next read
- **Thread-safe**: Protected by a threading lock for concurrent access
- **Pre-built overview**: Caches the computed overview payload so `/api/overview` is instant

```
Before: GET /api/alerts → parse xlsx → write DB → read DB → build response  (200-500ms)
After:  GET /api/alerts → return cached list                                 (<1ms)
```

### 3. SSE Endpoint (`GET /api/events`)

Server-Sent Events endpoint that pushes real-time notifications to all connected browsers.

**Event Types:**

| Event | Trigger | Frontend Action |
|-------|---------|-----------------|
| `alerts.changed` | RLE detects threat, status updated | Refetch alerts, overview, charts |
| `logs.received` | New logs arrive via `/receive-logs` | Refetch overview stats |

### 4. Frontend Hook (`useEventStream.js`)

Custom React hook that wraps `EventSource` with:
- **Auto-reconnect** on connection loss (3s delay)
- **Typed subscriptions** — each component subscribes to specific events
- **Fallback polling** — safety-net `setInterval` in case SSE disconnects

```javascript
// In any React component:
useEventStream('alerts.changed', () => fetchAlerts());
```

### 5. Structured Logger (`logger.py`)

Production-grade logging replacing all `print()` calls.

| Env Variable | Default | Purpose |
|-------------|---------|---------|
| `LOG_LEVEL` | `INFO` | Minimum log level |
| `LOG_FILE` | _(empty)_ | Path for rotating file output |
| `LOG_MAX_BYTES` | `10485760` | Max file size before rotation (10 MB) |
| `LOG_BACKUP_COUNT` | `5` | Number of rotated files to keep |

```
[2026-04-30 11:30:00] INFO     app                       Application startup complete
[2026-04-30 11:30:01] INFO     rle                       RLE streaming monitor started...
[2026-04-30 11:30:05] INFO     receiver                  Received 42 new log lines from 192.168.1.100
[2026-04-30 11:30:06] INFO     rle                       Added 3 alerts to Blockchain/leader/excel2.xlsx
```

---

## Backend Module Map

```
backend/
├── app.py                  # Main FastAPI server (all REST routes, lifespan, SSE)
├── event_bus.py            # ★ NEW — Async pub/sub event bus
├── alerts_cache.py         # ★ NEW — Materialised alert cache
├── logger.py               # ★ NEW — Structured logging configuration
├── reciever.py             # Log ingestion handler (emits events)
├── rule.py                 # Real-time Log Engine (emits events)
├── ai.py                   # AI assistant (NVIDIA NIM / local fallback)
├── report.py               # PDF report generation
├── requirements.txt        # Python dependencies (+ sse-starlette)
├── .env                    # Environment configuration
├── app_data.db             # Unified SQLite (alerts, threats, reports, senders)
├── users.db                # User authentication database
├── input.log               # Raw log ingestion buffer
├── reports/                # Generated PDF reports
└── Blockchain/
    └── leader/
        ├── blockchain.py   # Blockchain leader node (mounted at /blockchain)
        ├── broadcast.py    # Alert broadcast watcher
        ├── config.py       # Cluster configuration
        ├── alerts.xlsx     # Blockchain-verified alert ledger
        └── excel2.xlsx     # RLE-detected threats (input for broadcast)
```

## Frontend Module Map

```
frontend/src/
├── App.js                  # Root router + theme management
├── index.js                # Entry point
├── index.css               # Global design system
├── hooks/
│   └── useEventStream.js   # ★ NEW — SSE subscription hook
├── components/
│   └── Sidebar.js          # Navigation sidebar
└── pages/
    ├── Overview.js          # Dashboard (SSE-driven)
    ├── Threats.js           # Threat table (SSE-driven)
    ├── Blockchain.js        # Node health dashboard (SSE-driven)
    ├── Vulnerabilities.js   # Attack charts
    ├── Assets.js            # Log sender assets
    ├── ThreatMap.js         # Global threat globe
    ├── Reports.js           # PDF report management
    ├── AIAssistant.js       # AI chat interface
    ├── Settings.js          # User preferences
    ├── Login.js             # Authentication
    ├── Landing.jsx          # Landing page
    ├── OAuthCallback.js     # OAuth flow handler
    └── OAuthSuccess.js      # OAuth success redirect
```

---

## API Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| `GET` | `/` | Health check | No |
| `GET` | `/api/events` | ★ **SSE stream** — real-time event push | No |
| `POST` | `/api/signup` | Create account | No |
| `POST` | `/api/login` | Email/password login | No |
| `GET` | `/auth/google` | Google OAuth start | No |
| `GET` | `/auth/github` | GitHub OAuth start | No |
| `GET` | `/api/alerts` | All alerts with status | Session |
| `GET` | `/api/overview` | Dashboard overview payload | Session |
| `PATCH` | `/api/alerts/{id}/status` | Update alert status | Session |
| `GET` | `/api/vuln-charts` | Vulnerability chart data | Session |
| `GET` | `/api/target-attack-matrix` | Target vs attack pivot | Session |
| `POST` | `/api/assistant/chat` | AI assistant | Session |
| `GET` | `/api/reports` | List generated reports | Session |
| `POST` | `/api/reports/generate` | Generate PDF report | Session |
| `GET` | `/api/reports/{id}/download` | Download PDF | Session |
| `GET` | `/api/assets` | Log sender assets | Session |
| `POST` | `/receive-logs` | Ingest external logs | No |
| `*` | `/blockchain/*` | Blockchain leader API (sub-app) | Varies |

---

## Running in Production

### Environment Variables

```bash
# Required
SECRET_KEY=<random-secret-for-sessions>
FRONTEND_URL=https://your-domain.com
BACKEND_URL=https://api.your-domain.com

# Optional — OAuth
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

# Optional — AI
NVIDIA_API_KEY=...

# Optional — Logging
LOG_LEVEL=INFO          # DEBUG | INFO | WARNING | ERROR
LOG_FILE=app.log        # Empty = stdout only

# Optional — Tuning
RLE_POLL_SECONDS=5
RLE_CONTEXT_SECONDS=15
```

### Start Command

```bash
# Development
python app.py

# Production (behind reverse proxy)
uvicorn app:app --host 0.0.0.0 --port 8000 --workers 1
```

> **Note:** Workers must be set to `1` because the EventBus and AlertsCache are in-process singletons. For horizontal scaling, introduce Redis pub/sub as an external event bus.
