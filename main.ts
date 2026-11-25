// Make the AI Judge Laugh - one-line office joke entry.
// The winning line from the local head-to-head race is written verbatim
// to the harness output file, with no trailing newline added. A small
// guard re-checks the sealed gate shape (single line, 1-199 characters,
// plain ASCII) before anything reaches disk, so a stray edit to the
// line fails loudly here instead of silently at grading time.
import { writeFileSync } from "node:fs";

const LINE: string =
  "My boss called me reliable, then rewarded me with everyone else's urgent work before lunch.";

const OUTPUT_PATH: string = "/output/entry.txt";

function assertGateShape(text: string): void {
  if (text.length < 1 || text.length > 199) {
    throw new Error("entry line outside the 1-199 character gate");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry line must stay on a single line");
  }
  for (const ch of text) {
    if (ch.charCodeAt(0) > 127) {
      throw new Error("entry line must stay plain ASCII");
    }
  }
}

assertGateShape(LINE);
writeFileSync(OUTPUT_PATH, LINE, "utf8");
