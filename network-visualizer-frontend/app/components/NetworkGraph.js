"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

// NetworkGraph component displays a force-directed graph of network devices and their traffic
export default function NetworkGraph({ devices, traffic }) {
  // Create a ref for the SVG element so D3 can manipulate it directly
  const ref = useRef();

  useEffect(() => {
    // Select the SVG and clear previous content (prevents duplicate drawings)
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    // Transform devices into D3 node objects (each needs an id)
    const nodes = Object.keys(devices).map(ip => ({ id: ip }));

    // Transform traffic into D3 link objects (source and target are node ids)
    const links = traffic.map(t => ({
      source: t.src,
      target: t.dst,
    }));

    // Create D3 force simulation (handles layout physics)
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).distance(80).id(d => d.id)) // Links between nodes
      .force("charge", d3.forceManyBody().strength(-300)) // Node repulsion
      .force("center", d3.forceCenter(250, 200)) // Center the graph
      .on("tick", ticked); // Update SVG positions on each tick

    // This function redraws nodes, links, and labels every tick of the simulation
    function ticked() {
      // Draw (or update) lines for links (edges)
      svg.selectAll("line")
        .data(links)
        .join("line")
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)
        .attr("stroke", "#00FFC6"); // Neon blue color

      // Draw (or update) circles for nodes
      svg.selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", 20)
        .attr("fill", "#21E6C1") // Neon green/cyan color
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

      // Draw (or update) labels for nodes (showing the IP address)
      svg.selectAll("text")
        .data(nodes)
        .join("text")
        .attr("x", d => d.x)
        .attr("y", d => d.y + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "#fff")
        .attr("font-size", "10px")
        .text(d => d.id);
    }

    // Cleanup: stop the simulation if the component unmounts or dependencies change
    return () => simulation.stop();
  }, [devices, traffic]);

  // Render the SVG element D3 will use
  return (
    <svg
      ref={ref}
      width={500}
      height={400}
      style={{
        background: "#151515",
        borderRadius: 16,
        boxShadow: "0 0 30px #00FFC6",
      }}
    />
  );
}
