export function StatsBar({
  yesPct, leftLabel, rightLabel,
}: {
  yesPct: number; leftLabel: string; rightLabel: string;
}) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.08em", color: "var(--ink)" }}>
          {leftLabel} {yesPct}%
        </span>
        <span style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", letterSpacing: "0.08em", color: "var(--muted)" }}>
          {rightLabel} {100 - yesPct}%
        </span>
      </div>
      <div style={{ height: "6px", backgroundColor: "var(--border)", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: 0, left: 0, height: "100%",
          width: `${yesPct}%`, backgroundColor: "var(--ink)",
          transition: "width 1s ease",
        }} />
      </div>
    </div>
  );
}
