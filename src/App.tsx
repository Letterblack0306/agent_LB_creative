import { useState, useEffect } from "react";
import ArchitectureFlow from "./components/ArchitectureFlow";
import ReferenceAgents from "./components/ReferenceAgents";
import InputOutputModel from "./components/InputOutputModel";
import StatusTracker from "./components/StatusTracker";
import HeroSection from "./components/HeroSection";
import ComparisonTable from "./components/ComparisonTable";

type Section = "overview" | "architecture" | "references" | "io-model" | "status";

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: { id: Section; label: string; icon: string }[] = [
    { id: "overview", label: "Overview", icon: "fa-compass" },
    { id: "architecture", label: "Architecture", icon: "fa-diagram-project" },
    { id: "references", label: "Reference Agents", icon: "fa-book" },
    { id: "io-model", label: "I/O Model", icon: "fa-right-left" },
    { id: "status", label: "Status", icon: "fa-clipboard-check" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-gray-100 font-sans">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-[#0a0e1a]/95 backdrop-blur-md shadow-lg shadow-purple-900/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
                <i className="fa-solid fa-mug-hot text-white text-sm"></i>
              </div>
              <span className="font-bold text-lg tracking-tight">
                Brew <span className="text-purple-400">Agent System</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? "bg-purple-500/20 text-purple-300"
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                  }`}
                >
                  <i className={`fa-solid ${item.icon} mr-1.5`}></i>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <HeroSection />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Overview / Comparison Table */}
        <section id="overview" className="pt-24">
          <ComparisonTable />
        </section>

        {/* Architecture Flow */}
        <section id="architecture" className="pt-24">
          <ArchitectureFlow />
        </section>

        {/* Reference Agents */}
        <section id="references" className="pt-24">
          <ReferenceAgents />
        </section>

        {/* Input/Output Model */}
        <section id="io-model" className="pt-24">
          <InputOutputModel />
        </section>

        {/* Status Tracker */}
        <section id="status" className="pt-24">
          <StatusTracker />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-gray-500 text-sm">
        <p>Brew Agent System — Architecture Documentation & Reference Map</p>
        <p className="mt-1 text-gray-600">
          GPT-Knowledge verified • Drive index confirmed • Memory anchors validated
        </p>
      </footer>
    </div>
  );
}
