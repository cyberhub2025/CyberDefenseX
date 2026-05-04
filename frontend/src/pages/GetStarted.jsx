import React from "react";
import "./GetStarted.css";



const steps = [
  {
    title: "Open the live frontend",
    body: "Visit cyberdefensex.dpdns.org to use the React dashboard instantly.",
    action: {
      label: "Open live site",
      href: "https://cyberdefensex.dpdns.org/",
    },
  },
  {
    title: "Download the backend",
    body: "Grab the backend folder as a zip from the official repository.",
    action: {
      label: "Download backend",
      href: "https://download-directory.github.io/?url=https://github.com/cyberhub2025/CyberDefenseX_Ultra/tree/main/backend",
    },
  },
  {
    title: "Unzip the backend",
    body: "Extract the archive to a folder you can run locally.",
  },
  {
    title: "Configure settings",
    body: "Use the Settings page in the dashboard to add your OAuth and API keys.",
  },
  {
    title: "Run app.py",
    body: "Install requirements if needed, then launch the API server.",
  },
];

const features = [
  {
    title: "Real-time threat detection",
    body: "RLE streams logs, detects attacks, and emits live SSE updates.",
  },
  {
    title: "Blockchain audit trail",
    body: "Alerts are hashed into an immutable ledger with tamper checks.",
  },
  {
    title: "AI security assistant",
    body: "NVIDIA NIM models summarize alerts and suggest actions.",
  },
  {
    title: "Automated reports",
    body: "Generate PDF reports for compliance and incident response.",
  },
  {
    title: "Threat map + analytics",
    body: "Geographic threat intel, severity trends, and asset insights.",
  },
  {
    title: "Flexible auth",
    body: "Local users plus Google and GitHub OAuth integration.",
  },
];

const resetChecklist = [
  "Stop the backend before clearing any files.",
  "Delete backend/app_data.db and backend/users.db to rebuild fresh databases.",
  "Clear generated PDFs in backend/reports so reports start clean.",
  "Reset blockchain data by deleting blockchain.json and worker_blockchain.json.",
  "Replace or clear Blockchain/leader/alerts.xlsx to remove demo alerts.",
];

export default function GetStarted() {


  return (
    <div className="gs-page">
      <div className="gs-background" aria-hidden="true">
        <div className="gs-orb gs-orb-a" />
        <div className="gs-orb gs-orb-b" />
        <div className="gs-orb gs-orb-c" />
        <div className="gs-gridlines" />
      </div>

      <div className="gs-content">
        <header className="gs-hero">
          <div className="gs-hero-left">
            <div className="gs-eyebrow">Get Started</div>
            <h1>Launch CyberDefenseX in minutes</h1>
            <p>
              A clean, immersive setup path that keeps the frontend live on the web while you
              run the backend locally. Follow the steps, paste your environment file, and you are
              ready to investigate.
            </p>
            <div className="gs-actions">
              <a className="gs-btn gs-primary" href="https://cyberdefensex.dpdns.org/" target="_blank" rel="noopener noreferrer">
                Open live frontend
              </a>
              <a className="gs-btn gs-glass gs-download" href="https://download-directory.github.io/?url=https://github.com/cyberhub2025/CyberDefenseX_Ultra/tree/main/backend" target="_blank" rel="noopener noreferrer">
                <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" focusable="false">
                  <path d="M12 3a1 1 0 0 1 1 1v9.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.42l2.3 2.3V4a1 1 0 0 1 1-1z" fill="currentColor" />
                  <path d="M5 19a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z" fill="currentColor" />
                </svg>
                Download backend
              </a>

            </div>
            <div className="gs-pill-row">
              <span>FastAPI</span>
              <span>React 18</span>
              <span>Blockchain ledger</span>
              <span>AI assistant</span>
            </div>
          </div>

          <div className="gs-hero-right">
            <div className="gs-glass-card">
              <div className="gs-card-title">Quick launch</div>
              <ol className="gs-steps-compact">
                {steps.map((step, index) => (
                  <li key={step.title}>
                    <span className="gs-step-number">{index + 1}</span>
                    <div>
                      <div className="gs-step-title">{step.title}</div>
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </header>

        <section className="gs-section">
          <div className="gs-section-head">
            <h2>Step-by-step setup</h2>
            <p>Everything you need to boot the system and keep the UX online.</p>
          </div>
          <div className="gs-card-grid">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="gs-card"
                style={{ "--delay": `${index * 90}ms` }}
              >
                <div className="gs-card-index">{String(index + 1).padStart(2, "0")}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                {step.action ? (
                  <a className="gs-link" href={step.action.href} target="_blank" rel="noopener noreferrer">
                    {step.action.label}
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="gs-section gs-oauth">
          <div className="gs-section-head">
            <h2>OAuth Configuration</h2>
            <p>To enable social login, configure your OAuth providers with these authorized URIs. Once generated, add your Client IDs and Secrets in the platform's Settings page.</p>
          </div>
          <div className="gs-split">
            <div className="gs-card">
              <h3>Google OAuth</h3>
              <p>Create credentials in the Google Cloud Console (APIs & Services).</p>
              <ul className="gs-reset-list" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                <li><strong>Authorized JavaScript origins:</strong><br/> <code>http://localhost:3000</code><br/> <code>https://cyberdefensex.dpdns.org</code></li>
                <li style={{ marginTop: '0.5rem' }}><strong>Authorized redirect URIs:</strong><br/> <code>http://localhost:8000/auth/google/callback</code></li>
              </ul>
            </div>
            <div className="gs-card">
              <h3>GitHub OAuth</h3>
              <p>Create an OAuth App in your GitHub Developer Settings.</p>
              <ul className="gs-reset-list" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                <li><strong>Homepage URL:</strong><br/> <code>https://cyberdefensex.dpdns.org</code></li>
                <li style={{ marginTop: '0.5rem' }}><strong>Authorization callback URL:</strong><br/> <code>http://localhost:8000/auth/github/callback</code></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="gs-section gs-run">
          <div className="gs-section-head">
            <h2>Run the backend</h2>
            <p>From inside the backend folder, install dependencies and launch.</p>
          </div>
          <div className="gs-split">
            <div className="gs-card">
              <h3>Commands</h3>
              <pre className="gs-code-block small">
                <code>{"pip install -r requirements.txt\npython app.py"}</code>
              </pre>
              <p className="gs-muted">Backend API starts at http://localhost:8000</p>
            </div>
          </div>
        </section>

        <section className="gs-section">
          <div className="gs-section-head">
            <h2>What you get</h2>
            <p>Detailed capabilities included with the platform.</p>
          </div>
          <div className="gs-card-grid three">
            {features.map((feature, index) => (
              <article
                key={feature.title}
                className="gs-card"
                style={{ "--delay": `${index * 80}ms` }}
              >
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="gs-section gs-reset">
          <div className="gs-section-head">
            <h2>Demo data and reset checklist</h2>
            <p>Demo data ships with the backend. Reset everything before production use.</p>
          </div>
          <div className="gs-card">
            <ul className="gs-reset-list">
              {resetChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <footer className="gs-footer">
          <div>
            Need help? Check the docs or open the live demo to explore the UI instantly.
          </div>
          <div className="gs-footer-actions">
            <a className="gs-link" href="https://deepwiki.com/cyberhub2025/CyberDefenseX_Ultra" target="_blank" rel="noopener noreferrer">
              Open documentation
            </a>
            <a className="gs-link" href="https://cyberdefensex.dpdns.org/" target="_blank" rel="noopener noreferrer">
              Launch live demo
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
