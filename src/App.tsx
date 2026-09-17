import { useState, useEffect } from "react";
import PlanGraph from "./components/PlanGraph";
import VerifiedStatus from "./components/VerifiedStatus";
import DriftRecovery from "./components/DriftRecovery";
import UpstreamReuse from "./components/UpstreamReuse";
import Invariants from "./components/Invariants";
import BatchBCheckpoint from "./components/BatchBCheckpoint";
import DriveReconciliation from "./components/DriveReconciliation";
import GenuineGaps from "./components/GenuineGaps";
import BirdEyeSection from "./components/BirdEyeSection";
import HeroSection from "./components/HeroSection";

type Section = "overview" | "plan" | "status" | "drive" | "gaps" | "birdeye" | "drift" | "upstream" | "invariants" | "batch-b";

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
    { id: "plan", label: "Plan Graph", icon: "fa-diagram-project" },
    { id: "status", label: "Verified Status", icon: "fa-circle-check" },
    { id: "drive", label: "Drive Reconciliation", icon: "fa-folder-open" },
    { id: "gaps", label: "Genuine Gaps", icon: "fa-triangle-exclamation" },
    { id: "birdeye", label: "BirdEye MCP", icon: "fa-eye" },
    { id: "drift", label: "Drift Recovery", icon: "fa-arrows-rotate" },
    { id: "upstream", label: "Upstream Reuse", icon: "fa-book" },
    { id: "invariants", label: "Invariants", icon: "fa-shield-halved" },
    { id: "batch-b", label: "Batch B", icon: "fa-flask" },
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
                Brew <span className="text-purple-400">Plan & Features</span>
              </span>
            </div>
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
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
        <section id="plan" className="pt-24">
          <PlanGraph />
        </section>

        <section id="status" className="pt-24">
          <VerifiedStatus />
        </section>

        <section id="drive" className="pt-24">
          <DriveReconciliation />
        </section>

        <section id="gaps" className="pt-24">
          <GenuineGaps />
        </section>

        <section id="birdeye" className="pt-24">
          <BirdEyeSection />
        </section>

        <section id="drift" className="pt-24">
          <DriftRecovery />
        </section>

        <section id="upstream" className="pt-24">
          <UpstreamReuse />
        </section>

        <section id="invariants" className="pt-24">
          <Invariants />
        </section>

        <section id="batch-b" className="pt-24">
          <BatchBCheckpoint />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-gray-500 text-sm">
        <p>Brew Agent System — Plan & Implementation Features</p>
        <p className="mt-1 text-gray-600">
          Source: Letterblack0306/GPT-Knowledge • plan.json + status.json • Drive reconciliation at c37205cb
        </p>
      </footer>
    </div>
  );
}
