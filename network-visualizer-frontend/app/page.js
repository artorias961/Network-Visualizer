"use client";
import { useEffect, useState } from "react";
import NetworkGraph from "./components/NetworkGraph";
import TerminalLog from "./components/TerminalLog";

export default function Home() {
  const [devices, setDevices] = useState({});
  const [traffic, setTraffic] = useState([]);

  useEffect(() => {
    // Function to fetch devices and traffic from the backend
    const fetchData = () => {
      fetch("http://localhost:8000/devices")
        .then(res => res.json())
        .then(data => setDevices(data.devices || {}));
      fetch("http://localhost:8000/traffic")
        .then(res => res.json())
        .then(data => setTraffic(data.traffic || []));
    };
    fetchData(); // Initial fetch when page loads
    const interval = setInterval(fetchData, 2000); // Fetch every 2 seconds
    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="bg-black text-green-400 min-h-screen font-mono">
      <h1 className="text-2xl mb-6">[ NETWORK VISUALIZER ]</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <NetworkGraph devices={devices} traffic={traffic} />
        <TerminalLog traffic={traffic} />
      </div>
    </div>
  );
}
