# Elite Video Editing Roadmap & Duo Tracker

An outcome-driven execution roadmap and multi-user progress tracker for mastering commercial short-form video editing in DaVinci Resolve.

---

## 📌 Overview

This project provides a structured, execution-focused curriculum based on Sean Kang's video editing courses (`Baby Resolve`, `Elite`, `Freelance MVP`, `Elite Pro`). 

Rather than consuming raw course footage passively, the curriculum is structured into **4 sequential sprints** designed to produce client-ready portfolio assets while establishing commercial workflows.

---

## 🏗️ Architecture & Sprint Breakdown

```text
SPRINT 0: Environment & Assets Setup
└── Ingest core assets, configure left-hand shortcuts (Q-W-E-S-D), enable Live Save.

SPRINT 1: Production Pipeline & 4 Core Reels
└── Master A-roll rough cuts, audio normalization, kinetic subtitles (Hormozi style).
└── Deliverables: 4 export-ready commercial Reels.

SPRINT 2: Retention Engineering & Case Studies
└── High-retention hooks, dynamic zooming, motion graphics, audio ducking.
└── Deliverables: Case studies based on David Goggins, Daniel Iles, and storytelling formats.

SPRINT 3: Inbound & Outbound Client Acquisition
└── Portfolio bundling, SEO-optimized Fiverr gig setup, targeted Upwork proposal outreach.
└── Milestone: First paid client contract.

SPRINT 4: Retainer Scaling & System Stabilization
└── Convert transactional projects into monthly recurring retainers ($500–$1,000/mo).
```

---

## ⚡ Key Features

- **Deliverable-Centric (Output-Driven):** Tasks are tied directly to tangible `.mp4` exports rather than video watch time.
- **Smart Knowledge Mapping:** Every task includes direct references for:
  - Technical troubleshooting (`Baby Resolve`, `Fusion 101`).
  - High-end visual upgrades (`Elite Pro Breakdown`, `Keyframe Animation`).
  - Commercial positioning & pricing models (`Freelance MVP`, `Upwork MVP`).
- **Duo / Multi-User Mode:**
  - Independent progress tracking for two learners (`User A` and `User B`).
  - Real-time cloud sync via Firebase Realtime Database.
  - Zero-dependency local persistence (`localStorage`) fallback.
  - Editable user aliases directly from the UI.
- **Zero Build Tooling:** Pure HTML5, modern CSS (glassmorphism theme), and vanilla JavaScript. Runs out-of-the-box in any browser or static host.

---

## 🚀 Getting Started

### Local Usage
Clone the repository and open `index.html`:

```bash
git clone git@github.com:langpn/elite-roadmap.git
cd elite-roadmap
open index.html
```

### GitHub Pages Deployment
1. Go to repository **Settings** > **Pages**.
2. Under **Build and deployment** > **Branch**, select `main` and `/ (root)`.
3. Save. The dashboard will be available at `https://<username>.github.io/elite-roadmap/`.

---

## ⚙️ Cloud Sync Configuration

The dashboard uses Firebase Realtime Database for cross-device live sync:

1. Click the **Cloud Sync** indicator in the navigation bar.
2. Enter a shared `Duo Room ID` (e.g. `team_duo_2026`).
3. Changes made on one device will instantly reflect on the other.

*If using a private Firebase instance, update the `firebaseConfig` object in `index.html`.*

---

## 📄 License

MIT License. Designed for personal and collaborative learning workflows.
