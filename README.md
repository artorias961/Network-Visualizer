# Network-Visualizer: A Real-Time Local Network Traffic Visualization System
<img width="2048" height="1365" alt="image" src="https://github.com/user-attachments/assets/21413c88-2bfa-45a7-8880-558fb2466f7e" />

## Abstract
**Network-Visualizer** is a local network traffic visualization system that passively observes packets on an authorized network segment and renders inferred device-to-device interactions in an interactive graph-based dashboard. The software is organized as (i) a Python backend for capture and aggregation, and (ii) a web frontend for interactive visualization. The primary aim is to support exploratory analysis of local connectivity patterns and traffic flows through a reproducible, extensible implementation.

> **Ethical / legal note:** Packet capture can expose sensitive information. Use this project only on networks you own or where you have explicit authorization.



## Research Motivation
Interpreting network behavior from raw packet streams is cognitively demanding due to volume, heterogeneity, and temporal dynamics. Visual analytics—particularly graph representations—can reduce this burden by mapping communicating entities to nodes and observed exchanges to edges. This project operationalizes that idea for local subnet monitoring: it collects packet-derived interaction evidence and presents it as a continuously updating network graph suitable for exploratory inspection.



## System Overview
The repository comprises two major components:

### 1) Backend (Python)
- **Role:** Passive packet capture and lightweight flow/event summarization exposed via an HTTP API.
- **Key files (root):**
  - `main.py` — FastAPI application and API endpoints
  - `sniffer.py` — packet capture / tracking logic
  - `requirements.txt` — Python dependencies
  - `Dockerfile` — container build recipe

### 2) Frontend (Next.js)
- **Role:** Interactive visualization (e.g., force-directed graph + event/log view).
- **Location:** `network-visualizer-frontend/`



## Repository Layout
```text
.
├── main.py
├── sniffer.py
├── requirements.txt
├── Dockerfile
└── network-visualizer-frontend/
```



## Reproducibility & Setup

### Prerequisites
- Docker (recommended for consistent environment + capabilities)
- Node.js + npm (for the frontend)
- Local administrator/root privileges may be required for packet capture.

### 1) Clone
```bash
git clone https://github.com/artorias961/Network-Visualizer.git
cd Network-Visualizer
```

### 2) Backend: Build + Run (Docker)
```bash
docker build -t network-visualizer-backend .
docker run --cap-add=NET_RAW --network=host -p 8000:8000 network-visualizer-backend
```

### 3) Frontend: Install + Run
```bash
cd network-visualizer-frontend
npm install
npm run dev
```

Then open `http://localhost:3000`.



## Methodological Notes
The visualization depicts observed communication evidence rather than ground-truth topology. Visibility depends on interface placement, OS permissions, and traffic characteristics.



## Limitations
- Passive capture is constrained by system permissions.
- Visualization reflects observations, not authenticated device identity.
- Scalability may require aggregation or streaming improvements.



## Suggested Extensions
- WebSocket or SSE-based streaming
- Temporal aggregation and weighted edges
- MAC/vendor inference via ARP and OUI lookup
- Anomaly detection heuristics

