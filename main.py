# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sniffer import devices, traffic, run_sniffer_in_thread
import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Start the sniffer when API launches
run_sniffer_in_thread()

@app.get("/devices")
def get_devices():
    # Optionally, only return devices seen in the last 2 minutes
    current_time = time.time()
    filtered = {ip: ts for ip, ts in devices.items() if current_time - ts < 120}
    return {"devices": filtered}

@app.get("/traffic")
def get_traffic():
    # Last 100 traffic records
    return {"traffic": traffic[-100:]}

@app.get("/help")
def get_help():
    return {
        "help": [
            "=== Docker Quick Reference ===",
            "",
            "1. BUILD AND RUN THE APP",
            "--------------------------------",
            "Build a new image from your code:",
            "    docker build -t network-visualizer .",
            "",
            "Run the container (first time or after removing it):",
            "    docker run -p 8000:8000 --name network-visualizer-backend network-visualizer",
            "",
            "2. WORKING WITH EXISTING CONTAINERS",
            "--------------------------------",
            "Stop the running container:",
            "    docker stop network-visualizer-backend",
            "",
            "Start an existing (stopped) container (no code changes):",
            "    docker start network-visualizer-backend",
            "",
            "Remove a stopped container (needed if you want to re-run with new code):",
            "    docker rm network-visualizer-backend",
            "",
            "View logs from your container:",
            "    docker logs network-visualizer-backend",
            "",
            "List all containers (running & stopped):",
            "    docker ps -a",
            "",
            "List running containers:",
            "    docker ps",
            "",
            "3. UPDATING CODE (REBUILD WORKFLOW)",
            "--------------------------------",
            "If you change your code, do this:",
            "    docker stop network-visualizer-backend",
            "    docker rm network-visualizer-backend",
            "    docker build -t network-visualizer .",
            "    docker run -p 8000:8000 --name network-visualizer-backend network-visualizer",
            "",
            "4. REMOVE OLD IMAGES (OPTIONAL)",
            "--------------------------------",
            "List images:",
            "    docker images",
            "Remove an old image:",
            "    docker rmi network-visualizer",
            "",
            "=== SUMMARY ===",
            "- You need only a Dockerfile (no docker-compose.yaml on Windows).",
            "- After running, visit: http://localhost:8000/docs",
            "- If you update your code, rebuild the image and remove/recreate the container.",
            "",
            "TIP: A container is a running instance of your image. If you want new code to run, build a new image, remove the old container, and run a new one.",
        ]
    }


