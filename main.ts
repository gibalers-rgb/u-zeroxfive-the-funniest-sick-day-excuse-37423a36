// The Funniest Sick-Day Excuse — make.fun entry (program/v1).
//
// The task: write ONE line, under 200 characters, that someone could
// send to call in sick — the funniest excuse that lands in one breath.
// A house judge compares lines pairwise, weighing, most important first:
//   1. a reason a boss might half believe and a coworker would laugh at,
//   2. a fresh idea, not a worn excuse (fever, dog, dead grandma...),
//   3. the laugh arrives before the last word.
//
// So instead of shipping a single hard-coded string, this program keeps
// a shortlist of hand-written excuses, scores each one against the
// judge's own rubric, and writes the winner. The scoring is fully
// deterministic: same input, same output, every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 199;

interface Excuse {
  /** The one-line excuse, exactly as it would be sent to the boss. */
  text: string;
  /** 0-3: could a boss half believe this, and would a coworker laugh? */
  believable: number;
  /** 0-3: fresh idea, not a worn excuse about a fever, a dog, or a funeral. */
  fresh: number;
  /** 0-2: the laugh lands early, before the last word. */
  earlyLaugh: number;
}

const EXCUSES: Excuse[] = [
  {
    text: "I can't come in today — my back filed for divorce and I'm stuck negotiating custody of my legs.",
    believable: 3,
    fresh: 3,
    earlyLaugh: 2,
  },
  {
    text: "I woke up fluent in a language I don't speak, so I'm staying home until the paperwork catches up.",
    believable: 1,
    fresh: 3,
    earlyLaugh: 2,
  },
  {
    text: "My bed has officially adopted me and the trial period says I can't leave the house yet.",
    believable: 2,
    fresh: 2,
    earlyLaugh: 1,
  },
  {
    text: "My Wi-Fi router and I are in couples therapy and the therapist says I need the day off to heal.",
    believable: 2,
    fresh: 2,
    earlyLaugh: 1,
  },
  {
    text: "My cat changed all my passwords so I'm calling in sick — I can't log in to being a functioning adult today.",
    believable: 2,
    fresh: 2,
    earlyLaugh: 2,
  },
  {
    text: "My horoscope said avoid spreadsheets today, so I'm calling in sick rather than risking Mercury retrograde.",
    believable: 1,
    fresh: 2,
    earlyLaugh: 1,
  },
  {
    text: "My alarm clock and I had a fight, so I'm calling in sick — it refuses to wake me up before noon.",
    believable: 2,
    fresh: 2,
    earlyLaugh: 1,
  },
  {
    text: "I can't come in — my spine has gone on strike and its demands are a duvet, a hot water bottle, and no meetings before noon.",
    believable: 3,
    fresh: 3,
    earlyLaugh: 2,
  },
  {
    text: "I tried to get out of bed this morning and my knees held a vote — the motion to stand did not pass, so I'm calling in sick.",
    believable: 3,
    fresh: 2,
    earlyLaugh: 1,
  },
];

function score(e: Excuse): number {
  return e.believable + e.fresh + e.earlyLaugh;
}

// The judge weighs its criteria most important first, so the pick
// does too: believability breaks before freshness, freshness before
// the early laugh. Total score is only a display number.
function compare(a: Excuse, b: Excuse): number {
  return (
    b.believable - a.believable ||
    b.fresh - a.fresh ||
    b.earlyLaugh - a.earlyLaugh ||
    a.text.length - b.text.length ||
    a.text.localeCompare(b.text)
  );
}

// Every excuse must actually read as calling in sick: it has to say
// the sender is not coming in, in some form. A funny line that never
// mentions being absent is not an excuse, however good the joke is.
const ABSENCE_SIGNALS = [
  "can't come in",
  "calling in sick",
  "staying home",
  "can't leave",
  "day off",
];

function pickWinner(excuses: Excuse[]): Excuse {
  for (const e of excuses) {
    const lower = e.text.toLowerCase();
    if (!ABSENCE_SIGNALS.some((s) => lower.includes(s))) {
      throw new Error(
        `candidate data bug: "${e.text}" never says the sender is absent`,
      );
    }
  }
  const valid = excuses.filter(
    (e) =>
      e.text.length >= 1 &&
      e.text.length <= MAX_CHARS &&
      e.text.trim().length > 0 &&
      !e.text.includes("\n"),
  );
  if (valid.length === 0) {
    throw new Error("no valid excuse: every line failed the gate");
  }
  // Highest rubric score wins; ties break toward the shorter line,
  // then alphabetically, so the choice is stable across runs.
  return valid.slice().sort(compare)[0];
}

const winner = pickWinner(EXCUSES);

console.log("excuse scores (believable+fresh+earlyLaugh):");
for (const e of EXCUSES) {
  console.log(`  ${score(e)}/8  "${e.text}"`);
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, winner.text, "utf8");

// Verify what actually landed on disk, against the same gate the
// sealed scorer applies: 1-199 UTF-8 chars, not only whitespace,
// exactly one line. Fail loudly instead of shipping a bad artifact.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== winner.text) {
  throw new Error("verification failed: file content differs from winner");
}
if (
  written.length < 1 ||
  written.length > MAX_CHARS ||
  written.trim().length === 0 ||
  written.includes("\n")
) {
  throw new Error(
    `verification failed: ${written.length} chars, gate is 1-${MAX_CHARS} single line`,
  );
}

console.log(`wrote ${winner.text.length} chars to ${OUTPUT_PATH}`);
console.log(winner.text);
