"use client";
// TerminalLog component displays recent packet traffic as a terminal-style log
export default function TerminalLog({ traffic }) {
  return (
    <div className="bg-black p-4 rounded-xl shadow-lg w-full max-w-xs h-[400px] overflow-y-scroll border border-green-500">
      <h2 className="text-lg text-green-400 mb-2">[ Packet Log ]</h2>
      <pre>
        {traffic
          .slice(-30)         // Take only the most recent 30 packets
          .reverse()          // Show newest on top
          .map((t, i) => (
            // Render each packet as a line in the log
            <div key={i}>
              [{new Date(t.timestamp * 1000).toLocaleTimeString()}] {t.src} → {t.dst} ({t.proto})
            </div>
        ))}
      </pre>
    </div>
  );
}
