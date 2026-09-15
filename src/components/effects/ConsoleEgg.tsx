import { useCallback, useEffect, useRef, useState } from "react";

type Line = { kind: "in" | "out"; text: string };

const HELP: Line[] = [
  { kind: "in", text: "type 'help' to list commands" },
  { kind: "in", text: "type 'clear' to wipe the screen" },
  { kind: "in", text: "type 'close' (or press Esc) to leave" },
];

function run(cmd: string, input: string): Line[] {
  const out: Line[] = [];
  const push = (text: string) => out.push({ kind: "out", text });
  switch (cmd.trim().toLowerCase()) {
    case "":
      break;
    case "help":
      HELP.forEach((l) => out.push(l));
      break;
    case "status": {
      out.push({ kind: "in", text: "$ system.status()" });
      push("ENGINEERING MODE: ACTIVE");
      push("STATUS: BUILDING REAL SYSTEMS");
      push("TRACK: BUILD → LEARN → EVOLVE");
      break;
    }
    case "stack": {
      out.push({ kind: "in", text: "$ system.stack()" });
      push("CORE: TypeScript · React · Node.js");
      push("WEB: Next.js · Express · NestJS · FastAPI");
      push("DATA: PostgreSQL · Supabase · Prisma");
      break;
    }
    case "build": {
      out.push({ kind: "in", text: "$ system.build()" });
      push("4 SYSTEMS SHIPPED · ALL DEPLOYED");
      break;
    }
    case "clear":
      return [];
    case "close":
    case "exit":
      return [{ kind: "in", text: "$ session closed" }];
    default:
      out.push({ kind: "in", text: `$ ${input}` });
      push(`unknown command: ${cmd.trim().toLowerCase()}`);
      push("run 'help'");
  }
  return out;
}

export function ConsoleEgg() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [exit, setExit] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => {
      setLines([]);
      setExit(null);
    }, 250);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      setLines([{ kind: "in", text: "> system.console()" }, ...HELP]);
      window.setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, open]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputRef.current?.value ?? "";
    const result = run(input, input);
    if (inputRef.current) inputRef.current.value = "";
    if (result.length === 1 && result[0].text === "$ session closed") {
      setExit("closed");
      close();
      return;
    }
    setLines((prev) => [...prev, ...result]);
  };

  return (
    <div className={`console-egg ${open ? "is-open" : ""}`} data-open={open || undefined}>
      <button
        type="button"
        className="console-toggle text-micro"
        aria-expanded={open}
        aria-label={open ? "Close engineering console" : "Open engineering console"}
        onClick={() => (open ? close() : setOpen(true))}
      >
        [ _ ] console
      </button>
      {open ? (
        <div className="console-panel" role="dialog" aria-label="Engineering console">
          <div className="console-head text-micro">
            <span>VARSHITH // ENGINEERING CONSOLE</span>
            <button type="button" aria-label="Close console" onClick={close}>
              ✕
            </button>
          </div>
          <div className="console-body" ref={scrollRef}>
            {lines.map((l, i) => (
              <p key={i} className={l.kind === "in" ? "console-in" : "console-out"}>
                {l.text}
              </p>
            ))}
            {exit ? <p className="console-out">{exit}</p> : null}
          </div>
          <form onSubmit={submit} className="console-form">
            <span aria-hidden="true">&gt;</span>
            <input
              ref={inputRef}
              aria-label="Console command"
              autoComplete="off"
              spellCheck={false}
            />
          </form>
        </div>
      ) : null}
    </div>
  );
}