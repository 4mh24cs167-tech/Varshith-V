function Chrome({ title, badge, children }: { title: string; badge?: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="project-screenshot">
      <rect width="400" height="240" rx="8" fill="#0B0C10" />
      {/* title bar */}
      <rect width="400" height="32" fill="#0F1117" />
      <circle cx="16" cy="16" r="4" fill="#FF5F57" />
      <circle cx="30" cy="16" r="4" fill="#FEBC2E" />
      <circle cx="44" cy="16" r="4" fill="#28C840" />
      <text x="200" y="20" textAnchor="middle" fill="#5A5C6A" fontSize="9" fontFamily="Inter, sans-serif" fontWeight={500}>
        {title}
      </text>
      {badge && (
        <rect x={320} y="8" width={60} height={16} rx="4" fill="rgba(59,124,255,0.12)" />
      )}
      {/* sidebar */}
      <rect x="0" y="32" width="72" height="208" fill="#0C0D12" />
      {Array.from({ length: 5 }).map((_, i) => (
        <rect key={i} x="8" y={44 + i * 32} width="56" height="20" rx="4" fill={i === 0 ? "rgba(59,124,255,0.12)" : "rgba(255,255,255,0.02)" } />
      ))}
      {/* divider */}
      <line x1="72" y1="32" x2="72" y2="240" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      {children}
    </svg>
  );
}

/* ── UniConv: File Converter UI ───────────────────────────── */
export function UniConvScreenshot() {
  return (
    <Chrome title="UniConv — Converter" badge="LIVE">
      {/* search bar */}
      <rect x="84" y="42" width="200" height="24" rx="6" fill="rgba(255,255,255,0.04)" />
      <text x="94" y="58" fill="#5A5C6A" fontSize="9" fontFamily="Inter, sans-serif">Search tools...</text>

      {/* tool cards grid */}
      {[
        { label: "PDF → Word", icon: "📄", x: 84, y: 78, accent: true },
        { label: "Merge PDF", icon: "📑", x: 192, y: 78 },
        { label: "Compress", icon: "🗜", x: 300, y: 78 },
        { label: "Image Tools", icon: "🖼", x: 84, y: 120, accent: true },
        { label: "Audio/Video", icon: "🎬", x: 192, y: 120 },
        { label: "OCR", icon: "🔍", x: 300, y: 120 },
        { label: "TTS", icon: "🔊", x: 84, y: 162 },
        { label: "QR Code", icon: "⬛", x: 192, y: 162 },
      ].map((item, i) => (
        <g key={i}>
          <rect x={item.x} y={item.y} width="88" height="32" rx="6" fill={item.accent ? "rgba(59,124,255,0.08)" : "rgba(255,255,255,0.02)"} stroke={item.accent ? "rgba(59,124,255,0.15)" : "rgba(255,255,255,0.04)"} strokeWidth="1" />
          <text x={item.x + 28} y={item.y + 20} fill={item.accent ? "#3B7CFF" : "#8B8D9A"} fontSize="8" fontFamily="Inter, sans-serif" fontWeight={500}>{item.icon}</text>
          <text x={item.x + 44} y={item.y + 20} fill={item.accent ? "#F0F0F5" : "#8B8D9A"} fontSize="8" fontFamily="Inter, sans-serif">{item.label}</text>
        </g>
      ))}

      {/* stats sidebar items */}
      <text x="12" y="120" fill="#3A3C48" fontSize="7" fontFamily="Inter, sans-serif">📊 Dashboard</text>
      <text x="12" y="152" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">History</text>
      <text x="12" y="184" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">Settings</text>
      <text x="12" y="216" fill="#3B7CFF" fontSize="7" fontFamily="Inter, sans-serif" fontWeight={600}>PRO ↑</text>
    </Chrome>
  );
}

/* ── MRF R&D: Research Dashboard ──────────────────────────── */
export function MRFRDScreenshot() {
  return (
    <Chrome title="MRF R&D — Research Portal" badge="LIVE">
      {/* header stats */}
      <rect x="84" y="38" width="120" height="44" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <text x="94" y="56" fill="#5A5C6A" fontSize="8" fontFamily="Inter, sans-serif">Active Projects</text>
      <text x="94" y="72" fill="#F0F0F5" fontSize="14" fontFamily="Inter, sans-serif" fontWeight={700}>24</text>

      <rect x="212" y="38" width="120" height="44" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <text x="222" y="56" fill="#5A5C6A" fontSize="8" fontFamily="Inter, sans-serif">Publications</text>
      <text x="222" y="72" fill="#F0F0F5" fontSize="14" fontFamily="Inter, sans-serif" fontWeight={700}>18</text>

      {/* data table */}
      <rect x="84" y="94" width="316" height="28" rx="4" fill="rgba(59,124,255,0.06)" />
      <text x="94" y="112" fill="#3B7CFF" fontSize="8" fontFamily="Inter, sans-serif" fontWeight={600}>Project Name</text>
      <text x="200" y="112" fill="#5A5C6A" fontSize="8" fontFamily="Inter, sans-serif">PI</text>
      <text x="260" y="112" fill="#5A5C6A" fontSize="8" fontFamily="Inter, sans-serif">Status</text>
      <text x="340" y="112" fill="#5A5C6A" fontSize="8" fontFamily="Inter, sans-serif">Progress</text>

      {[
        { name: "AI in Healthcare", pi: "Dr. Sharma", status: "Active", prog: 75 },
        { name: "Smart Grid Systems", pi: "Dr. Patel", status: "Review", prog: 45 },
        { name: "NLP Research", pi: "Dr. Kumar", status: "Active", prog: 90 },
        { name: "IoT Sensor Network", pi: "Dr. Reddy", status: "Active", prog: 60 },
      ].map((row, i) => (
        <g key={i}>
          <rect x="84" y={126 + i * 26} width="316" height="22" fill="rgba(255,255,255,0.01)" />
          <text x="94" y={140 + i * 26} fill="#F0F0F5" fontSize="8" fontFamily="Inter, sans-serif">{row.name}</text>
          <text x="200" y={140 + i * 26} fill="#8B8D9A" fontSize="8" fontFamily="Inter, sans-serif">{row.pi}</text>
          <rect x="260" y={130 + i * 26} width="40" height="14" rx="3" fill={row.status === "Active" ? "rgba(16,185,129,0.12)" : "rgba(251,191,36,0.12)"} />
          <text x="280" y={140 + i * 26} fill={row.status === "Active" ? "#10B981" : "#FBBF24"} fontSize="7" fontFamily="Inter, sans-serif" fontWeight={500}>{row.status}</text>
          <rect x="320" y={134 + i * 26} width={row.prog * 0.6} height="6" rx="3" fill="#3B7CFF" opacity="0.7" />
        </g>
      ))}

      {/* sidebar */}
      <text x="12" y="80" fill="#3A3C48" fontSize="7" fontFamily="Inter, sans-serif">📊 Dashboard</text>
      <text x="12" y="112" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">Proposals</text>
      <text x="12" y="144" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">Milestones</text>
      <text x="12" y="176" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">Publications</text>
      <text x="12" y="208" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">Reports</text>
    </Chrome>
  );
}

/* ── No-Due Portal: Workflow UI ────────────────────────────── */
export function NoDuePortalScreenshot() {
  return (
    <Chrome title="No-Due Portal — Clearance" badge="LIVE">
      {/* progress steps */}
      {["Submit Request", "Verification", "Dept Clearance", "Approval", "Complete"].map((step, i) => (
        <g key={i}>
          <circle cx={96 + i * 72} cy="60" r="10" fill={i < 3 ? "#3B7CFF" : "rgba(255,255,255,0.04)"} />
          <text x={96 + i * 72} y="64" textAnchor="middle" fill={i < 3 ? "white" : "#3A3C48"} fontSize="8" fontFamily="Inter, sans-serif" fontWeight={600}>{i + 1}</text>
          {i < 4 && <line x1={106 + i * 72} y1="60" x2={130 + i * 72} y2="60" stroke={i < 2 ? "#3B7CFF" : "rgba(255,255,255,0.06)"} strokeWidth="1.5" />}
          <text x={96 + i * 72} y="78" textAnchor="middle" fill={i < 3 ? "#8B8D9A" : "#3A3C48"} fontSize="6" fontFamily="Inter, sans-serif">{step}</text>
        </g>
      ))}

      {/* department cards */}
      {[
        { dept: "CSE", status: "Cleared", color: "#10B981" },
        { dept: "ECE", status: "Pending", color: "#FBBF24" },
        { dept: "Library", status: "Cleared", color: "#10B981" },
        { dept: "Hostel", status: "Pending", color: "#FBBF24" },
        { dept: "Accounts", status: "Pending", color: "#FBBF24" },
      ].map((item, i) => (
        <g key={i}>
          <rect x="84" y={100 + i * 26} width="316" height="22" rx="4" fill="rgba(255,255,255,0.02)" />
          <rect x="84" y={100 + i * 26} width="3" height="22" rx="1.5" fill={item.color} />
          <text x="96" y={114 + i * 26} fill="#F0F0F5" fontSize="9" fontFamily="Inter, sans-serif" fontWeight={500}>{item.dept}</text>
          <rect x="340" y={104 + i * 26} width="48" height="14" rx="3" fill={item.color === "Cleared" ? "rgba(16,185,129,0.1)" : "rgba(251,191,36,0.1)"} />
          <text x="364" y={114 + i * 26} textAnchor="middle" fill={item.color} fontSize="7" fontFamily="Inter, sans-serif" fontWeight={600}>{item.status}</text>
        </g>
      ))}

      {/* sidebar */}
      <text x="12" y="80" fill="#3A3C48" fontSize="7" fontFamily="Inter, sans-serif">📋 Requests</text>
      <text x="12" y="112" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">My Status</text>
      <text x="12" y="144" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">History</text>
      <text x="12" y="176" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">Guidelines</text>
    </Chrome>
  );
}

/* ── EventFlow: Event Management ───────────────────────────── */
export function EventFlowScreenshot() {
  return (
    <Chrome title="EventFlow — Events" badge="LIVE">
      {/* stats row */}
      {[
        { label: "Total Events", val: "12" },
        { label: "Pending", val: "3" },
        { label: "Completed", val: "9" },
      ].map((s, i) => (
        <g key={i}>
          <rect x={84 + i * 108} y="38" width="96" height="36" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          <text x={94 + i * 108} y="54" fill="#5A5C6A" fontSize="8" fontFamily="Inter, sans-serif">{s.label}</text>
          <text x={94 + i * 108} y="68" fill="#F0F0F5" fontSize="14" fontFamily="Inter, sans-serif" fontWeight={700}>{s.val}</text>
        </g>
      ))}

      {/* event table */}
      <rect x="84" y="86" width="316" height="22" rx="4" fill="rgba(59,124,255,0.06)" />
      <text x="94" y="100" fill="#3B7CFF" fontSize="8" fontFamily="Inter, sans-serif" fontWeight={600}>Event</text>
      <text x="180" y="100" fill="#5A5C6A" fontSize="8" fontFamily="Inter, sans-serif">Date</text>
      <text x="240" y="100" fill="#5A5C6A" fontSize="8" fontFamily="Inter, sans-serif">Venue</text>
      <text x="330" y="100" fill="#5A5C6A" fontSize="8" fontFamily="Inter, sans-serif">Status</text>

      {[
        { name: "Tech Symposium", date: "Jan 15", venue: "Auditorium", status: "Approved", sc: "#10B981" },
        { name: "Code Hackathon", date: "Feb 01", venue: "Lab 3", status: "Pending", sc: "#FBBF24" },
        { name: "AI Workshop", date: "Feb 20", venue: "Hall A", status: "Draft", sc: "#8B8D9A" },
        { name: "Cricket Match", date: "Mar 05", venue: "Ground", status: "Approved", sc: "#10B981" },
      ].map((row, i) => (
        <g key={i}>
          <rect x="84" y={112 + i * 24} width="316" height="20" fill="rgba(255,255,255,0.01)" />
          <text x="94" y={126 + i * 24} fill="#F0F0F5" fontSize="8" fontFamily="Inter, sans-serif">{row.name}</text>
          <text x="180" y={126 + i * 24} fill="#8B8D9A" fontSize="8" fontFamily="Inter, sans-serif">{row.date}</text>
          <text x="240" y={126 + i * 24} fill="#8B8D9A" fontSize="8" fontFamily="Inter, sans-serif">{row.venue}</text>
          <text x="330" y={126 + i * 24} fill={row.sc} fontSize="8" fontFamily="Inter, sans-serif" fontWeight={500}>{row.status}</text>
        </g>
      ))}

      {/* sidebar */}
      <text x="12" y="80" fill="#3A3C48" fontSize="7" fontFamily="Inter, sans-serif">📅 Events</text>
      <text x="12" y="112" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">Registrations</text>
      <text x="12" y="144" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">Feedback</text>
      <text x="12" y="176" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">AI Eval</text>
    </Chrome>
  );
}

/* ── ReliefChain: Donation Flow ────────────────────────────── */
export function ReliefChainScreenshot() {
  return (
    <Chrome title="ReliefChain — Aid Flow" badge="LIVE">
      {/* pipeline visualization */}
      {["Donation", "Verify", "Allocate", "Deliver", "Impact"].map((step, i) => (
        <g key={i}>
          <rect x={88 + i * 74} y="44" width="56" height="36" rx="6" fill="rgba(59,124,255,0.06)" stroke="rgba(59,124,255,0.12)" strokeWidth="1" />
          <circle cx={102 + i * 74} cy="58" r="6" fill="#3B7CFF" opacity="0.8" />
          <text x={116 + i * 74} y="58" fill="#8B8D9A" fontSize="7" fontFamily="Inter, sans-serif">{step}</text>
          <text x={116 + i * 74} y="72" fill="#F0F0F5" fontSize="8" fontFamily="Inter, sans-serif" fontWeight={600}>
            {["₹2.4L", "✓", "₹1.8L", "✓", "42 families"][i]}
          </text>
          {i < 4 && <text x={148 + i * 74} y="64" fill="#3A3C48" fontSize="14" fontFamily="Inter, sans-serif">→</text>}
        </g>
      ))}

      {/* recent donations */}
      <rect x="84" y="100" width="316" height="22" rx="4" fill="rgba(255,255,255,0.02)" />
      <text x="94" y="114" fill="#5A5C6A" fontSize="8" fontFamily="Inter, sans-serif" fontWeight={600}>Donor</text>
      <text x="160" y="114" fill="#5A5C6A" fontSize="8" fontFamily="Inter, sans-serif">Amount</text>
      <text x="240" y="114" fill="#5A5C6A" fontSize="8" fontFamily="Inter, sans-serif">Campaign</text>
      <text x="340" y="114" fill="#5A5C6A" fontSize="8" fontFamily="Inter, sans-serif">Status</text>

      {[
        { donor: "Anonymous", amt: "₹50,000", camp: "Flood Relief", st: "Delivered", sc: "#10B981" },
        { donor: "R. Sharma", amt: "₹25,000", camp: "Earthquake", st: "In Transit", sc: "#FBBF24" },
        { donor: "Tech Corp", amt: "₹1,00,000", camp: "Flood Relief", st: "Verified", sc: "#3B7CFF" },
        { donor: "P. Kumar", amt: "₹10,000", camp: "Education", st: "Delivered", sc: "#10B981" },
      ].map((row, i) => (
        <g key={i}>
          <rect x="84" y={126 + i * 24} width="316" height="20" fill="rgba(255,255,255,0.01)" />
          <text x="94" y={140 + i * 24} fill="#F0F0F5" fontSize="8" fontFamily="Inter, sans-serif">{row.donor}</text>
          <text x="160" y={140 + i * 24} fill="#3B7CFF" fontSize="8" fontFamily="Inter, sans-serif" fontWeight={600}>{row.amt}</text>
          <text x="240" y={140 + i * 24} fill="#8B8D9A" fontSize="8" fontFamily="Inter, sans-serif">{row.camp}</text>
          <text x="340" y={140 + i * 24} fill={row.sc} fontSize="8" fontFamily="Inter, sans-serif" fontWeight={500}>{row.st}</text>
        </g>
      ))}

      {/* sidebar */}
      <text x="12" y="80" fill="#3A3C48" fontSize="7" fontFamily="Inter, sans-serif">💰 Donations</text>
      <text x="12" y="112" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">Campaigns</text>
      <text x="12" y="144" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">Beneficiaries</text>
      <text x="12" y="176" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">Audit Log</text>
    </Chrome>
  );
}

/* ── PlacePro: Placement Dashboard ─────────────────────────── */
export function PlaceProScreenshot() {
  return (
    <Chrome title="PlacePro — MITM Placements" badge="LIVE">
      {/* top stats */}
      {[
        { label: "Students", val: "1,240" },
        { label: "Companies", val: "86" },
        { label: "Placed", val: "78%" },
      ].map((s, i) => (
        <g key={i}>
          <rect x={84 + i * 108} y="38" width="96" height="36" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          <text x={94 + i * 108} y="54" fill="#5A5C6A" fontSize="8" fontFamily="Inter, sans-serif">{s.label}</text>
          <text x={94 + i * 108} y="68" fill="#F0F0F5" fontSize="14" fontFamily="Inter, sans-serif" fontWeight={700}>{s.val}</text>
        </g>
      ))}

      {/* chart bars */}
      {[65, 80, 55, 90, 72, 85, 60, 95].map((h, i) => (
        <rect key={i} x={96 + i * 36} y={160 - h * 1.2} width="20" height={h * 1.2} rx="3" fill="#3B7CFF" opacity={0.3 + (i / 8) * 0.5} />
      ))}
      <text x="94" y="170" fill="#3A3C48" fontSize="7" fontFamily="Inter, sans-serif">Mon</text>
      <text x="130" y="170" fill="#3A3C48" fontSize="7" fontFamily="Inter, sans-serif">Tue</text>
      <text x="166" y="170" fill="#3A3C48" fontSize="7" fontFamily="Inter, sans-serif">Wed</text>
      <text x="202" y="170" fill="#3A3C48" fontSize="7" fontFamily="Inter, sans-serif">Thu</text>
      <text x="238" y="170" fill="#3A3C48" fontSize="7" fontFamily="Inter, sans-serif">Fri</text>
      <text x="274" y="170" fill="#3A3C48" fontSize="7" fontFamily="Inter, sans-serif">Sat</text>

      {/* recent drives */}
      {[
        { co: "Google", role: "SDE Intern", pkg: "₹45L", st: "Open" },
        { co: "Microsoft", role: "SDE", pkg: "₹38L", st: "Closed" },
        { co: "Amazon", role: "SDE-1", pkg: "₹35L", st: "Open" },
      ].map((row, i) => (
        <g key={i}>
          <rect x="84" y={100 + i * 28} width="316" height="24" rx="4" fill="rgba(255,255,255,0.02)" />
          <circle cx="96" cy={112 + i * 28} r="8" fill="rgba(59,124,255,0.1)" />
          <text x="96" y={115 + i * 28} textAnchor="middle" fill="#3B7CFF" fontSize="8" fontFamily="Inter, sans-serif" fontWeight={700}>{row.co[0]}</text>
          <text x="110" y={112 + i * 28} fill="#F0F0F5" fontSize="9" fontFamily="Inter, sans-serif" fontWeight={500}>{row.co}</text>
          <text x="180" y={112 + i * 28} fill="#8B8D9A" fontSize="8" fontFamily="Inter, sans-serif">{row.role}</text>
          <text x="260" y={112 + i * 28} fill="#10B981" fontSize="9" fontFamily="Inter, sans-serif" fontWeight={600}>{row.pkg}</text>
          <rect x="320" y={106 + i * 28} width="40" height="14" rx="3" fill={row.st === "Open" ? "rgba(59,124,255,0.1)" : "rgba(255,255,255,0.04)"} />
          <text x="340" y={116 + i * 28} textAnchor="middle" fill={row.st === "Open" ? "#3B7CFF" : "#5A5C6A"} fontSize="7" fontFamily="Inter, sans-serif" fontWeight={500}>{row.st}</text>
        </g>
      ))}

      {/* sidebar */}
      <text x="12" y="80" fill="#3A3C48" fontSize="7" fontFamily="Inter, sans-serif">💼 Placements</text>
      <text x="12" y="112" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">Drives</text>
      <text x="12" y="144" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">Students</text>
      <text x="12" y="176" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">Reports</text>
    </Chrome>
  );
}

/* ── PetCommunity: Pet Social Platform ─────────────────────── */
export function PetCommunityScreenshot() {
  return (
    <Chrome title="PetCommunity — Connect" badge="BETA">
      {/* feed header */}
      <rect x="84" y="38" width="316" height="32" rx="6" fill="rgba(255,255,255,0.02)" />
      <circle cx="104" cy="54" r="8" fill="rgba(124,92,255,0.15)" />
      <text x="120" y="52" fill="#F0F0F5" fontSize="9" fontFamily="Inter, sans-serif" fontWeight={600}>Buddy the Golden Retriever</text>
      <text x="120" y="64" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">posted 2h ago · Mumbai, IN</text>

      {/* post image area */}
      <rect x="84" y="78" width="316" height="90" rx="6" fill="rgba(124,92,255,0.04)" />
      <circle cx="200" cy="110" r="20" fill="rgba(124,92,255,0.1)" />
      <text x="200" y="114" textAnchor="middle" fill="#7C5CFF" fontSize="16">🐕</text>
      <text x="200" y="140" textAnchor="middle" fill="#8B8D9A" fontSize="8" fontFamily="Inter, sans-serif">Weekend park adventure!</text>

      {/* interactions */}
      <rect x="84" y="176" width="316" height="24" rx="4" fill="rgba(255,255,255,0.01)" />
      <text x="94" y="192" fill="#8B8D9A" fontSize="8" fontFamily="Inter, sans-serif">❤️ 24 likes</text>
      <text x="150" y="192" fill="#8B8D9A" fontSize="8" fontFamily="Inter, sans-serif">💬 8 comments</text>
      <text x="220" y="192" fill="#8B8D9A" fontSize="8" fontFamily="Inter, sans-serif">🔄 Match: 94%</text>

      {/* sidebar */}
      <text x="12" y="80" fill="#3A3C48" fontSize="7" fontFamily="Inter, sans-serif">🏠 Feed</text>
      <text x="12" y="112" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">Matches</text>
      <text x="12" y="144" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">Clinics</text>
      <text x="12" y="176" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">Q&A</text>
    </Chrome>
  );
}

/* ── ENILS: Learning System ────────────────────────────────── */
export function EnilsScreenshot() {
  return (
    <Chrome title="ENILS — Offline Learning" badge="WIP">
      {/* voice interface */}
      <rect x="84" y="38" width="316" height="60" rx="8" fill="rgba(6,182,212,0.06)" stroke="rgba(6,182,212,0.1)" strokeWidth="1" />
      <circle cx="110" cy="68" r="16" fill="rgba(6,182,212,0.1)" />
      <text x="110" y="72" textAnchor="middle" fill="#06B6D4" fontSize="12">🎤</text>
      <text x="136" y="60" fill="#F0F0F5" fontSize="9" fontFamily="Inter, sans-serif" fontWeight={500}>Listening...</text>
      <text x="136" y="74" fill="#5A5C6A" fontSize="8" fontFamily="Inter, sans-serif">"Explain photosynthesis"</text>

      {/* wave bars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <rect key={i} x={90 + i * 14} y="114" width="6" height={8 + Math.sin(i * 0.8) * 16} rx="3" fill="#06B6D4" opacity={0.2 + Math.sin(i * 0.8) * 0.3} />
      ))}

      {/* AI response */}
      <rect x="84" y="140" width="316" height="52" rx="8" fill="rgba(59,124,255,0.06)" stroke="rgba(59,124,255,0.08)" strokeWidth="1" />
      <text x="94" y="158" fill="#3B7CFF" fontSize="8" fontFamily="Inter, sans-serif" fontWeight={600}>ENILS Tutor</text>
      <text x="94" y="172" fill="#8B8D9A" fontSize="8" fontFamily="Inter, sans-serif">Photosynthesis is how plants...</text>
      <text x="94" y="184" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">Using sunlight to convert CO₂ into energy.</text>

      {/* sidebar */}
      <text x="12" y="80" fill="#3A3C48" fontSize="7" fontFamily="Inter, sans-serif">📚 Lessons</text>
      <text x="12" y="112" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">Progress</text>
      <text x="12" y="144" fill="#5A5C6A" fontSize="7" fontFamily="Inter, sans-serif">Vocabulary</text>
      <text x="12" y="176" fill="#10B981" fontSize="7" fontFamily="Inter, sans-serif">● Offline Ready</text>
    </Chrome>
  );
}
