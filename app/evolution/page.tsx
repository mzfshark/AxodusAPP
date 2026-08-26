import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer, PageHero, StatusBadge } from "../ui";
export const metadata: Metadata = {
  title: "Project Evolution",
  description:
    "A staged, directional view of how Axodus may progress from research toward operational maturity.",
};
const phases = [
  {
    n: "01",
    name: "Concept and Research",
    state: "Foundation",
    desc: "Define the thesis, investigate the problem space and establish a public intellectual foundation.",
  },
  {
    n: "02",
    name: "Documentation and Governance Foundation",
    state: "In development",
    desc: "Structure project records, governance principles, review practices and institutional framing.",
  },
  {
    n: "03",
    name: "Prototype Development",
    state: "Current stage",
    desc: "Translate selected concepts into bounded prototype work without implying production readiness.",
  },
  {
    n: "04",
    name: "Validation and Ecosystem Experiments",
    state: "Future direction",
    desc: "Test assumptions and components through controlled experiments, subject to resources and prior evidence.",
  },
  {
    n: "05",
    name: "Progressive Operational Maturity",
    state: "Long-term direction",
    desc: "Potentially evolve validated components toward responsible operations. Timing and outcome are not guaranteed.",
  },
] as const;
type PhaseStatus = "checked" | "active" | "pending";
function getPhaseStatus(index: number): PhaseStatus {
  if (index < 2) {
    return "checked";
  }
  if (index === 2) {
    return "active";
  }
  return "pending";
}
function getPhaseMark(status: PhaseStatus) {
  if (status === "checked") {
    return "●";
  }
  if (status === "active") {
    return "◉";
  }
  return "○";
}
function getPhaseLabel(status: PhaseStatus) {
  if (status === "checked") {
    return "Completed";
  }
  if (status === "active") {
    return "In progress";
  }
  return "Upcoming";
}
export default function Evolution() {
  return (
    <main>
      {" "}
      <PageHero
        eyebrow="02 · Project evolution"
        title={
          <>
            {" "}
            A direction built in <em>deliberate stages.</em>{" "}
          </>
        }
        dek="The phases below describe a possible path for Axodus. They are directional—not promises, schedules or evidence of future funding."
        aside={<StatusBadge>Phase 03 · Prototype</StatusBadge>}
      />{" "}
      <section className="section shell">
        {" "}
        <div className="phase-list">
          {" "}
          {phases.map((phase, index) => {
            const phaseStatus = getPhaseStatus(index);
            return (
              <article
                className={
                  phaseStatus === "active" ? "phase-item active" : "phase-item"
                }
                key={phase.n}
              >
                {" "}
                <div className="phase-num"> {phase.n} </div>{" "}
                <div className="phase-content">
                  {" "}
                  <StatusBadge> {phase.state} </StatusBadge>{" "}
                  <h2>{phase.name}</h2> <p>{phase.desc}</p>{" "}
                </div>{" "}
                <span
                  className={`phase-mark ${phaseStatus}`}
                  aria-label={getPhaseLabel(phaseStatus)}
                  title={getPhaseLabel(phaseStatus)}
                >
                  {" "}
                  {getPhaseMark(phaseStatus)}{" "}
                </span>{" "}
              </article>
            );
          })}{" "}
        </div>{" "}
        <p className="direction-note">
          {" "}
          <strong>Directional model.</strong> Progression depends on research
          findings, validation, resources, governance decisions and external
          conditions. Future phases may change or may not occur.{" "}
        </p>{" "}
      </section>{" "}
      <section className="section dark-panel">
        {" "}
        <div className="shell evolution-rule">
          {" "}
          <p className="eyebrow">
            {" "}
            <span /> Evolution principle{" "}
          </p>{" "}
          <blockquote>
            {" "}
            Advance only when the evidence justifies the next layer of
            complexity.{" "}
          </blockquote>{" "}
          <Link className="button light" href="/prototype">
            {" "}
            Review current status ↗{" "}
          </Link>{" "}
        </div>{" "}
      </section>{" "}
      <div className="section shell">
        {" "}
        <Disclaimer />{" "}
      </div>{" "}
    </main>
  );
}
