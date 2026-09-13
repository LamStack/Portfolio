"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { projects } from "@/data/projects";
import { certifications, education, experience, skills, socials } from "@/data/content";

type Line = { id: number; kind: "input" | "output"; content: ReactNode };

const PROMPT = "lamees@portfolio";

function neofetch() {
  return (
    <pre className="whitespace-pre-wrap leading-relaxed">
      <span className="text-cyan">{PROMPT}</span>
      {"\n"}
      {"-".repeat(24)}
      {"\n"}
      OS: LameesOS (Next.js 16)
      {"\n"}
      Uptime: {education.period}
      {"\n"}
      Host: University of Bahrain
      {"\n"}
      Shell: react-terminal 1.0
      {"\n"}
      Certs: {certifications.length}
      {"\n"}
      Projects: {projects.length}
    </pre>
  );
}

let idCounter = 0;
function nextId() {
  return idCounter++;
}

function runCommand(raw: string): ReactNode {
  const cmd = raw.trim();
  const [name, ...rest] = cmd.split(/\s+/);
  const arg = rest.join(" ");

  switch (name?.toLowerCase()) {
    case "":
      return null;
    case "help":
      return (
        <div>
          Available commands:
          <div className="grid grid-cols-2 gap-x-6 mt-1 text-text-dim">
            <span>help</span>
            <span>about</span>
            <span>whoami</span>
            <span>projects</span>
            <span>skills</span>
            <span>experience</span>
            <span>certifications</span>
            <span>contact</span>
            <span>neofetch</span>
            <span>echo &lt;text&gt;</span>
            <span>sudo &lt;anything&gt;</span>
            <span>clear</span>
          </div>
        </div>
      );
    case "about":
    case "whoami":
      return "Lamees Adel, Computer Engineering student, Azure AI Engineer Associate. Building AI products that people actually enjoy using.";
    case "projects":
      return (
        <div className="space-y-1">
          {projects.map((p) => (
            <div key={p.name}>
              <span className="text-cyan">{p.name}</span>
              <span className="text-text-dim"> : {p.tagline} : {p.repo}</span>
            </div>
          ))}
        </div>
      );
    case "skills":
      return (
        <div className="space-y-1">
          {Object.entries(skills).map(([group, list]) => (
            <div key={group}>
              <span className="text-violet">{group}:</span>{" "}
              <span className="text-text-dim">{list.join(", ")}</span>
            </div>
          ))}
        </div>
      );
    case "experience":
      return (
        <div className="space-y-1">
          {experience.map((e) => (
            <div key={e.role}>
              <span className="text-cyan">{e.role}</span>
              <span className="text-text-dim"> at {e.org} ({e.period})</span>
            </div>
          ))}
        </div>
      );
    case "certifications":
    case "certs":
      return (
        <div className="space-y-1">
          {certifications.map((c) => (
            <div key={c.name} className="text-text-dim">
              {c.name} <span className="text-text-dim/60">({c.issuer})</span>
            </div>
          ))}
        </div>
      );
    case "contact":
      return (
        <div className="space-y-1 text-text-dim">
          <div>email: {socials.email}</div>
          <div>github: {socials.github}</div>
          <div>linkedin: {socials.linkedin}</div>
        </div>
      );
    case "neofetch":
      return neofetch();
    case "echo":
      return arg || "";
    case "sudo":
      return "Permission denied: you are not root here, but you can open the Resume app instead.";
    case "date":
      return new Date().toString();
    default:
      return `command not found: ${name}. Type "help" for a list of commands.`;
  }
}

export function TerminalApp() {
  const [lines, setLines] = useState<Line[]>([
    { id: nextId(), kind: "output", content: 'Welcome. Type "help" to get started.' },
  ]);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const cmd = value;
    setValue("");

    if (cmd.trim().toLowerCase() === "clear") {
      setLines([]);
      return;
    }

    const output = runCommand(cmd);
    setLines((prev) => [
      ...prev,
      { id: nextId(), kind: "input", content: cmd },
      ...(output !== null ? [{ id: nextId(), kind: "output" as const, content: output }] : []),
    ]);
  }

  return (
    <div
      className="h-full flex flex-col p-4 font-mono text-[13px] text-text bg-[#04050a]"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-y-auto space-y-1.5">
        {lines.map((l) => (
          <div key={l.id}>
            {l.kind === "input" ? (
              <div>
                <span className="text-cyan">{PROMPT}</span>
                <span className="text-text-dim">:~$ </span>
                <span>{l.content}</span>
              </div>
            ) : (
              <div className="text-text-dim">{l.content}</div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={submit} className="flex items-center gap-2 pt-2">
        <span className="text-cyan">{PROMPT}</span>
        <span className="text-text-dim">:~$</span>
        <input
          ref={inputRef}
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 bg-transparent outline-none text-text"
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
}
