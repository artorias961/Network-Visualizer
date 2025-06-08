# sniffer.py
from scapy.all import sniff, Ether, IP
from threading import Thread
import time

# Shared data structures
devices = {}
traffic = []

def packet_callback(packet):
    if IP in packet and Ether in packet:
        src = packet[IP].src
        dst = packet[IP].dst
        proto = packet[IP].proto
        # Add devices
        devices[src] = time.time()
        devices[dst] = time.time()
        # Log traffic (could be expanded)
        traffic.append({
            'src': src,
            'dst': dst,
            'proto': proto,
            'timestamp': time.time()
        })
        # Limit traffic log size (optional)
        if len(traffic) > 500:
            traffic.pop(0)

def start_sniffer():
    sniff(prn=packet_callback, store=0)

# Thread it so FastAPI can run too
def run_sniffer_in_thread():
    t = Thread(target=start_sniffer, daemon=True)
    t.start()
