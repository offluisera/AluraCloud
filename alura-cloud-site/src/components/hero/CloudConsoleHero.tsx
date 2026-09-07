"use client";
import React, { useState, useEffect, useRef } from "react";

interface ServiceNode {
  id: string;
  name: string;
  type: string;
  status: "active" | "optimal" | "synced";
  metric: string;
  detail: string;
  x: number;
  y: number;
}

const NODES: ServiceNode[] = [
  { id: "edge", name: "Edge Anycast", type: "Gateway", status: "optimal", metric: "3.2ms", detail: "48 PoPs globais com terminação TLS 1.3", x: 60, y: 130 },
  { id: "auth", name: "Zero-Trust Auth", type: "Security", status: "active", metric: "100%", detail: "Políticas IAM e validação JWT em edge", x: 170, y: 65 },
  { id: "api", name: "Core Services", type: "Compute", status: "active", metric: "1.42M req/s", detail: "Clusters de microsserviços auto-escaláveis", x: 230, y: 145 },
  { id: "cache", name: "In-Memory Mesh", type: "Cache", status: "optimal", metric: "99.8% hit", detail: "Distribuição ultra-rápida com replicação síncrona", x: 340, y: 80 },
  { id: "db", name: "Distributed DB", type: "Storage", status: "synced", metric: "Multi-AZ", detail: "Replicação geográfica contínua com failover automático", x: 370, y: 160 },
];

const LOG_ENTRIES = [
  { time: "00:01", tag: "GATEWAY", msg: "Edge router balanceou 48k requisições em SP", ok: true },
  { time: "00:03", tag: "SECURITY", msg: "WAF bloqueou tentativa de injeção em edge", ok: true },
  { time: "00:05", tag: "PIPELINE", msg: "Build v2.4.8 sincronizado com zero-downtime", ok: true },
  { time: "00:08", tag: "STORAGE", msg: "Snapshots criptografados Multi-AZ concluídos", ok: true },
  { time: "00:10", tag: "TELEMETRIA", msg: "Latência média regional estável em 11.4ms", ok: true },
];

export default function CloudConsoleHero() {
  const [activeTab, setActiveTab] = useState<"topology" | "telemetry" | "logs">("topology");
  const [selectedNode, setSelectedNode] = useState<ServiceNode>(NODES[2]); // Default to Core Services
  const [logs, setLogs] = useState(LOG_ENTRIES);
  const [metricPing, setMetricPing] = useState(0);

  // Heartbeat metric simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMetricPing((prev) => (prev + 1) % 100);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cloud-console-wrapper">
      {/* Console Chassis */}
      <div className="cloud-console-chassis">
        {/* Header Bar */}
        <div className="console-header">
          <div className="console-controls">
            <span className="ctrl-dot ctrl-red" />
            <span className="ctrl-dot ctrl-yellow" />
            <span className="ctrl-dot ctrl-green" />
            <span className="console-title-text">ALURA-CLOUD // CLUSTER-MONITOR</span>
          </div>

          <div className="console-status-badge">
            <span className="status-ping-dot" />
            <span className="status-label">PROD: SAO-01 • 11.4ms</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="console-tabs">
          <button
            type="button"
            className={`console-tab ${activeTab === "topology" ? "active" : ""}`}
            onClick={() => setActiveTab("topology")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Topologia de Rede
          </button>

          <button
            type="button"
            className={`console-tab ${activeTab === "telemetry" ? "active" : ""}`}
            onClick={() => setActiveTab("telemetry")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            Telemetria (Live)
          </button>

          <button
            type="button"
            className={`console-tab ${activeTab === "logs" ? "active" : ""}`}
            onClick={() => setActiveTab("logs")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
            Event Stream
          </button>
        </div>

        {/* Body Content Based on Active Tab */}
        <div className="console-body">
          {activeTab === "topology" && (
            <div className="topology-view">
              {/* Interactive Topology SVG */}
              <div className="topology-canvas">
                <svg viewBox="0 0 450 220" className="topology-svg">
                  <defs>
                    <linearGradient id="lineGrd" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00DF81" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#2CC295" stopOpacity="0.4" />
                    </linearGradient>

                    <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Interconnecting Connection Lines */}
                  <path d="M60,130 Q115,70 170,65" stroke="rgba(0,223,129,0.3)" strokeWidth="1.5" strokeDasharray="3,3" fill="none" />
                  <path d="M60,130 Q145,150 230,145" stroke="url(#lineGrd)" strokeWidth="1.5" fill="none" />
                  <path d="M170,65 Q200,105 230,145" stroke="rgba(0,223,129,0.3)" strokeWidth="1.5" strokeDasharray="3,3" fill="none" />
                  <path d="M230,145 Q285,90 340,80" stroke="url(#lineGrd)" strokeWidth="1.5" fill="none" />
                  <path d="M230,145 Q300,165 370,160" stroke="url(#lineGrd)" strokeWidth="1.5" fill="none" />
                  <path d="M340,80 Q365,120 370,160" stroke="rgba(0,223,129,0.3)" strokeWidth="1.5" strokeDasharray="3,3" fill="none" />

                  {/* Animated Data Packets Traveling */}
                  <circle r="3" fill="#00DF81" filter="url(#nodeGlow)">
                    <animateMotion dur="4s" repeatCount="indefinite" path="M60,130 Q145,150 230,145" />
                  </circle>
                  <circle r="2.5" fill="#00FFB3" filter="url(#nodeGlow)">
                    <animateMotion dur="3.2s" repeatCount="indefinite" begin="0.8s" path="M230,145 Q285,90 340,80" />
                  </circle>
                  <circle r="2.5" fill="#2CC295" filter="url(#nodeGlow)">
                    <animateMotion dur="3.8s" repeatCount="indefinite" begin="1.2s" path="M230,145 Q300,165 370,160" />
                  </circle>

                  {/* Nodes */}
                  {NODES.map((node) => {
                    const isSelected = selectedNode.id === node.id;
                    return (
                      <g
                        key={node.id}
                        className={`node-group ${isSelected ? "selected" : ""}`}
                        onClick={() => setSelectedNode(node)}
                        style={{ cursor: "pointer" }}
                      >
                        {/* Outer interactive hover ring */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={isSelected ? 18 : 14}
                          fill={isSelected ? "rgba(0,223,129,0.15)" : "rgba(3,24,22,0.8)"}
                          stroke={isSelected ? "#00DF81" : "rgba(0,223,129,0.35)"}
                          strokeWidth={isSelected ? 2 : 1}
                          filter={isSelected ? "url(#nodeGlow)" : undefined}
                          className="node-ring"
                        />
                        {/* Core active center */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={4}
                          fill={isSelected ? "#00FFB3" : "#00DF81"}
                        />
                        {/* Label */}
                        <text
                          x={node.x}
                          y={node.y + 24}
                          textAnchor="middle"
                          fill={isSelected ? "#00DF81" : "rgba(241,247,246,0.7)"}
                          fontSize="9"
                          fontWeight={isSelected ? "600" : "400"}
                          fontFamily="monospace"
                        >
                          {node.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Node Detail Inspector Strip */}
              <div className="node-detail-card">
                <div className="detail-top">
                  <span className="detail-tag">{selectedNode.type}</span>
                  <span className="detail-name">{selectedNode.name}</span>
                  <span className="detail-metric">Status: <strong>{selectedNode.metric}</strong></span>
                </div>
                <p className="detail-desc">{selectedNode.detail}</p>
              </div>
            </div>
          )}

          {activeTab === "telemetry" && (
            <div className="telemetry-view">
              <div className="metrics-grid">
                <div className="metric-box">
                  <span className="metric-label">UPTIME ANUAL</span>
                  <span className="metric-val text-green">99.994%</span>
                  <span className="metric-sub">Alta Disponibilidade</span>
                </div>
                <div className="metric-box">
                  <span className="metric-label">LATÊNCIA REGIONAL</span>
                  <span className="metric-val">11.4 ms</span>
                  <span className="metric-sub">P95 Brasil</span>
                </div>
                <div className="metric-box">
                  <span className="metric-label">THROUGHPUT</span>
                  <span className="metric-val text-green">1.42M/s</span>
                  <span className="metric-sub">Auto-distribuído</span>
                </div>
                <div className="metric-box">
                  <span className="metric-label">NÓS ATIVOS</span>
                  <span className="metric-val">48 / 48</span>
                  <span className="metric-sub">100% Saudáveis</span>
                </div>
              </div>

              {/* Visual simulated pulse bar */}
              <div className="telemetry-graph-bar">
                <div className="graph-header">
                  <span>FLUXO DE CARGA EM TEMPO REAL</span>
                  <span className="graph-pulse-tag">● SINCRONIZADO</span>
                </div>
                <div className="graph-bars">
                  {[35, 48, 42, 60, 52, 75, 68, 85, 72, 90, 80, 65, 88, 70, 95, 82, 78, 92, 85, 96].map((h, idx) => (
                    <div
                      key={idx}
                      className="graph-col"
                      style={{
                        height: `${Math.min(100, h + ((metricPing + idx) % 15) - 7)}%`,
                        background: idx > 15 ? "#00DF81" : "rgba(0, 223, 129, 0.45)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "logs" && (
            <div className="logs-view">
              <div className="logs-list">
                {logs.map((log, i) => (
                  <div key={i} className="log-row">
                    <span className="log-time">[{log.time}]</span>
                    <span className="log-tag">{log.tag}:</span>
                    <span className="log-msg">{log.msg}</span>
                    <span className="log-status">✓</span>
                  </div>
                ))}
              </div>
              <div className="logs-footer">
                <span className="console-prompt">alura-cloud:~$</span>
                <span className="cursor-blink">_</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .cloud-console-wrapper {
          width: 100%;
          max-width: 540px;
          perspective: 1200px;
          margin: 0 auto;
        }

        .cloud-console-chassis {
          background: rgba(3, 18, 15, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 223, 129, 0.22);
          border-radius: 16px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 35px rgba(0, 223, 129, 0.08);
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;
        }

        .cloud-console-chassis:hover {
          border-color: rgba(0, 223, 129, 0.4);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 50px rgba(0, 223, 129, 0.15);
        }

        .console-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.25rem;
          background: rgba(2, 11, 10, 0.6);
          border-bottom: 1px solid rgba(0, 223, 129, 0.12);
        }

        .console-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .ctrl-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
        }
        .ctrl-red { background: #ff5f56; opacity: 0.8; }
        .ctrl-yellow { background: #ffbd2e; opacity: 0.8; }
        .ctrl-green { background: #00DF81; opacity: 0.9; }

        .console-title-text {
          font-family: monospace;
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          color: rgba(241, 247, 246, 0.6);
          margin-left: 0.5rem;
        }

        .console-status-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: monospace;
          font-size: 0.68rem;
          color: #00DF81;
          background: rgba(0, 223, 129, 0.08);
          border: 1px solid rgba(0, 223, 129, 0.2);
          padding: 0.2rem 0.6rem;
          border-radius: 12px;
        }

        .status-ping-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00DF81;
          box-shadow: 0 0 6px #00DF81;
          animation: pulse-ping 2s infinite ease-in-out;
        }

        @keyframes pulse-ping {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.4); opacity: 1; }
        }

        .console-tabs {
          display: flex;
          background: rgba(2, 11, 10, 0.4);
          border-bottom: 1px solid rgba(0, 223, 129, 0.1);
          padding: 0.25rem 0.5rem 0;
          gap: 0.25rem;
        }

        .console-tab {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: transparent;
          border: none;
          color: rgba(241, 247, 246, 0.6);
          font-size: 0.75rem;
          padding: 0.6rem 0.9rem;
          border-radius: 6px 6px 0 0;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .console-tab:hover {
          color: #f1f7f6;
          background: rgba(0, 223, 129, 0.05);
        }

        .console-tab.active {
          color: #00DF81;
          background: rgba(0, 223, 129, 0.12);
          border-bottom: 2px solid #00DF81;
        }

        .console-body {
          padding: 1.25rem;
          min-height: 270px;
        }

        /* Topology View */
        .topology-canvas {
          background: radial-gradient(circle at center, rgba(0, 223, 129, 0.04) 0%, transparent 70%);
          border-radius: 8px;
          border: 1px solid rgba(0, 223, 129, 0.08);
          padding: 0.25rem;
        }

        .topology-svg {
          width: 100%;
          height: auto;
          display: block;
        }

        .node-group text {
          user-select: none;
        }

        .node-ring {
          transition: all 0.25s ease;
        }

        .node-group:hover .node-ring {
          stroke: #00DF81;
          stroke-width: 2px;
          filter: drop-shadow(0 0 5px rgba(0, 223, 129, 0.6));
        }

        .node-detail-card {
          margin-top: 1rem;
          padding: 0.75rem 1rem;
          background: rgba(2, 14, 12, 0.7);
          border: 1px solid rgba(0, 223, 129, 0.18);
          border-radius: 8px;
        }

        .detail-top {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.3rem;
        }

        .detail-tag {
          font-size: 0.62rem;
          text-transform: uppercase;
          background: rgba(0, 223, 129, 0.15);
          color: #00DF81;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          font-family: monospace;
        }

        .detail-name {
          font-size: 0.8rem;
          font-weight: 600;
          color: #f1f7f6;
        }

        .detail-metric {
          margin-left: auto;
          font-size: 0.72rem;
          color: rgba(241, 247, 246, 0.7);
          font-family: monospace;
        }

        .detail-metric strong {
          color: #00DF81;
        }

        .detail-desc {
          font-size: 0.72rem;
          color: rgba(170, 203, 196, 0.85);
          margin: 0;
          line-height: 1.4;
        }

        /* Telemetry View */
        .metrics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .metric-box {
          background: rgba(2, 14, 12, 0.6);
          border: 1px solid rgba(0, 223, 129, 0.15);
          border-radius: 8px;
          padding: 0.75rem;
          display: flex;
          flex-direction: column;
        }

        .metric-label {
          font-size: 0.62rem;
          font-family: monospace;
          color: rgba(170, 203, 196, 0.7);
          letter-spacing: 0.05em;
        }

        .metric-val {
          font-size: 1.35rem;
          font-weight: 700;
          color: #f1f7f6;
          margin: 0.2rem 0;
          font-family: var(--font-display, sans-serif);
        }

        .text-green {
          color: #00DF81;
        }

        .metric-sub {
          font-size: 0.68rem;
          color: rgba(170, 203, 196, 0.6);
        }

        .telemetry-graph-bar {
          background: rgba(2, 14, 12, 0.6);
          border: 1px solid rgba(0, 223, 129, 0.15);
          border-radius: 8px;
          padding: 0.75rem 1rem;
        }

        .graph-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.65rem;
          font-family: monospace;
          color: rgba(170, 203, 196, 0.8);
          margin-bottom: 0.6rem;
        }

        .graph-pulse-tag {
          color: #00DF81;
        }

        .graph-bars {
          display: flex;
          align-items: flex-end;
          gap: 5px;
          height: 48px;
        }

        .graph-col {
          flex: 1;
          border-radius: 2px 2px 0 0;
          transition: height 0.3s ease;
        }

        /* Logs View */
        .logs-view {
          background: rgba(2, 10, 8, 0.9);
          border: 1px solid rgba(0, 223, 129, 0.15);
          border-radius: 8px;
          padding: 0.85rem;
          font-family: monospace;
          font-size: 0.72rem;
        }

        .logs-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .log-row {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          line-height: 1.4;
        }

        .log-time {
          color: rgba(112, 125, 125, 0.8);
        }

        .log-tag {
          color: #00DF81;
          font-weight: 600;
        }

        .log-msg {
          color: rgba(241, 247, 246, 0.85);
          flex: 1;
        }

        .log-status {
          color: #00DF81;
          font-weight: bold;
        }

        .logs-footer {
          margin-top: 0.75rem;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(0, 223, 129, 0.1);
          color: #00DF81;
        }

        .cursor-blink {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
