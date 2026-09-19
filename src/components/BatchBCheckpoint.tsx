import { browserAcceptance, brewPlanMeta } from "../data/brewPlanning";

const evidenceRows = [
  { item: "Brew source baseline", value: brewPlanMeta.sourceShort, status: "ok" },
  { item: "Static regression", value: `${brewPlanMeta.readinessVerification.testPass} tests + readiness PASS`, status: "ok" },
  { item: "Canonical relay", value: "127.0.0.1:9333 PASS", status: "ok" },
  { item: "Chrome CDP", value: "127.0.0.1:7430 PASS", status: "ok" },
  { item: "Posting invocation", value: "ATTEMPTED", status: "ok" },
  { item: "Composer availability", value: "UNAVAILABLE", status: "blocked" },
  { item: "Visible submitted message", value: "NOT PROVEN", status: "blocked" },
];

const decisionTree = [
  {
    condition: "Wrong page / wrong conversation bound",
    classification: "TARGET_SELECTION_DEFECT",
    action: "Fix target binding only; do not change semantic reasoning or posting selectors.",
  },
  {
    condition: "Correct target but page not loaded/authenticated or composer absent",
    classification: "PAGE_STATE_BLOCKER",
    action: "Preserve tool code; prove page/auth/composer state first.",
  },
  {
    condition: "Correct loaded target has a visible usable composer but canonical tool cannot detect/use it",
    classification: "POSTING_TOOL_DEFECT",
    action: "A posting-selector/tool patch is then evidence-justified.",
  },
];

export default function BatchBCheckpoint() {
  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-rose-300 to-pink-300 bg-clip-text text-transparent">
            Batch B Browser Acceptance
          </span>
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Current live acceptance boundary at Brew <code className="text-rose-300 bg-rose-500/10 px-1.5 py-0.5 rounded">{brewPlanMeta.sourceShort}</code>.
          Relay and CDP are proven; end-user posting remains partial.
        </p>
      </div>

      <div className="rounded-2xl bg-amber-500/5 border border-amber-500/20 p-6 mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
            {browserAcceptance.status}
          </span>
          <span className="text-sm text-gray-200 font-mono">{browserAcceptance.blocker}</span>
        </div>
        <p className="text-sm text-gray-400">{browserAcceptance.posting}.</p>
        <p className="text-sm text-gray-400 mt-2">
          Source patch justified: <span className="text-red-300 font-mono">NO</span>
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Observed evidence</h3>
        <div className="rounded-xl bg-white/[0.02] border border-white/10 overflow-hidden">
          {evidenceRows.map((row, index) => (
            <div key={row.item} className={`flex items-center justify-between gap-4 p-3 ${index ? "border-t border-white/5" : ""}`}>
              <span className="text-sm text-gray-300">{row.item}</span>
              <div className="flex items-center gap-2 text-right">
                <span className={`text-xs font-mono ${row.status === "ok" ? "text-green-400" : "text-amber-400"}`}>{row.value}</span>
                <span className={`w-2 h-2 rounded-full ${row.status === "ok" ? "bg-green-400" : "bg-amber-400"}`}></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-blue-500/5 border border-blue-500/20 p-6 mb-8">
        <h3 className="font-bold text-blue-300 mb-2">Next evidence question</h3>
        <p className="text-sm text-gray-200 leading-relaxed">{browserAcceptance.nextEvidence}</p>
      </div>

      <div className="space-y-3 mb-8">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Classification tree</h3>
        {decisionTree.map((item) => (
          <div key={item.classification} className="rounded-xl bg-white/[0.02] border border-white/10 p-4">
            <div className="flex flex-wrap gap-2 items-center mb-2">
              <span className="text-xs text-gray-300">{item.condition}</span>
              <span className="text-[10px] px-2 py-0.5 rounded border border-purple-500/30 bg-purple-500/10 text-purple-300 font-mono">
                {item.classification}
              </span>
            </div>
            <p className="text-xs text-gray-500">{item.action}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-5">
        <h3 className="font-semibold text-red-300 mb-3">Do not infer from this checkpoint</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>• Do not classify the posting tool as broken merely because the composer was unavailable.</li>
          <li>• Do not restore autonomy modules or add another browser/relay authority.</li>
          <li>• Do not treat relay/CDP health as proof that the requested message reached ChatGPT.</li>
          <li>• Do not patch selectors until the exact correct target visibly exposes a usable composer and the canonical tool still fails.</li>
        </ul>
      </div>
    </div>
  );
}
