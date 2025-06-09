# Network Packet Visualizer

*A real-time, Watch Dogs–inspired network activity visualizer built with FastAPI, Scapy, Next.js, D3.js, and Docker.*

---

## Project Purpose & Background

**Inspiration:**
This project is inspired by the *Watch Dogs* video game series, where players can “see” the digital world around them—mapping devices, tracking connections, and visualizing real-time data flows in a slick, hacker-themed UI.
The goal here is to **bring that experience to real life**: to passively “map” your local network and show all the devices and their interactions, live.

**Why build this?**

* For fun, learning, and to get a “hacker” perspective on your own digital space.
* To improve your understanding of networking, web backends, and real-time web dashboards.
* To create an awesome, portfolio-worthy project that’s as fun to use as it is to build.

---

## Tech Stack & Why We Chose It

* **Python + Scapy:**
  Scapy is a powerful, scriptable packet sniffer—easy to use for capturing and analyzing network traffic in real time.
* **FastAPI:**
  Modern, async-friendly Python web framework. It exposes APIs for the frontend to fetch real-time device/traffic data.
* **Next.js (React):**
  Provides a fast, modular, component-based frontend with great developer experience and easy styling/theming.
* **D3.js:**
  Best-in-class JavaScript library for dynamic, interactive data visualizations—used here to create the force-directed “network map.”
* **Tailwind CSS:**
  Utility-first CSS framework for quickly building a dark, neon-styled “hacker” interface.
* **Docker (+ Docker Compose):**
  Containerizes the backend (and optionally the frontend), making setup and deployment reliable across different machines.

---

## Features

* **Passive network traffic sniffing** (no packets sent)
* **Real-time discovery** of devices (by IP address)
* **Mapping of live network connections** between devices
* **Interactive, animated graph** showing network structure and activity
* **Terminal-style log** for packet history

---

## Project Structure

```
/network-visualizer-backend    # FastAPI + Scapy backend (in Docker)
  |- main.py                   # FastAPI app, API endpoints
  |- sniffer.py                # Scapy sniffer, device/traffic tracker
  |- requirements.txt
  |- Dockerfile

/network-visualizer-frontend   # Next.js frontend (D3.js, Tailwind)
  |- app/
      |- components/
          |- NetworkGraph.js
          |- TerminalLog.js
      |- page.js
  |- package.json
  |- tailwind.config.js
```

---

## Setup & Usage

### 1. Clone the Repo

```sh
git clone https://github.com/yourname/network-packet-visualizer.git
cd network-packet-visualizer
```

---

### 2. Backend (FastAPI + Scapy in Docker)

**Requirements:**

* Docker installed
* Linux is preferred (network sniffing in Docker works best)

**Build and run the backend:**

```sh
cd network-visualizer-backend
docker build -t network-visualizer-backend .
docker run --cap-add=NET_RAW --network=host -p 8000:8000 network-visualizer-backend
```

Or, with **Docker Compose** (recommended):

```sh
docker compose up --build
```

*(Make sure your **`** includes **`** and **\`\`** for the backend service.)*

---

### 3. Frontend (Next.js App)

**Setup:**

```sh
cd network-visualizer-frontend
npm install
```

**Start development server:**

```sh
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the dashboard.

**(Optional) Dockerize the frontend:**

* Add a `Dockerfile` to your frontend and update `docker-compose.yaml` to run both frontend and backend together.

---

### 4. How It Works

* The **backend** runs continuously, sniffing all visible network traffic.
  It exposes API endpoints at:

  * `GET /devices` — returns the set of detected devices (IPs)
  * `GET /traffic` — returns the most recent packet flows (source IP, dest IP, protocol, timestamp)
* The **frontend** polls these endpoints every 2 seconds, building:

  * An **animated network graph** (with D3.js) showing devices as nodes and connections as lines.
  * A **terminal-style log** listing recent packet events.

---

## Useful Commands

### Backend:

* Build Docker image:

  ```sh
  docker build -t network-visualizer-backend .
  ```
* Run Docker container (standalone):

  ```sh
  docker run --cap-add=NET_RAW --network=host -p 8000:8000 network-visualizer-backend
  ```
* With Docker Compose (from project root):

  ```sh
  docker compose up --build
  ```
* API Endpoints:

  * [http://localhost:8000/devices](http://localhost:8000/devices)
  * [http://localhost:8000/traffic](http://localhost:8000/traffic)

### Frontend:

* Install dependencies:

  ```sh
  npm install
  ```
* Start dev server:

  ```sh
  npm run dev
  ```
* Visit: [http://localhost:3000](http://localhost:3000)

---

## Why These Libraries & Approaches?

* **Scapy**: Easiest way to sniff and analyze packets in Python, perfect for a passive monitoring tool.
* **FastAPI**: Fast, modern, and async—great for live data APIs.
* **Next.js + D3.js**: Powerful combo for real-time web apps; easy to build, style, and scale up for features like alerts or deeper analytics.
* **Tailwind**: Lets you create a “hacker” aesthetic with minimal CSS headaches.
* **Docker**: Ensures everyone can run the project exactly the same way, regardless of OS/setup.

---

## Contributing / Expanding

* Add protocol or port filters to the sniffer for deeper analysis
* Add authentication to the frontend/backend for private deployments
* Expand graph with device types, hostnames, or vendor lookups
* Add WebSocket support for real “push” updates
* Polish the UI with more Watch Dogs–style themes

---

## Disclaimer

This project is for educational and ethical use only.
**Sniffing network traffic on networks you do not own or have explicit permission to monitor may be illegal.**
Use responsibly and only on your own networks.

---

## Credits

* Inspired by Ubisoft’s *Watch Dogs* series
* Built with Python, FastAPI, Scapy, React, Next.js, D3.js, and Tailwind CSS

---

*Enjoy visualizing your own network—like a hacker protagonist in your own game!*
