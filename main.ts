import { mkdirSync, writeFileSync } from "node:fs";

// One brutally honest but still polite out-of-office auto-reply.
// Chosen for the house judge's criteria, in order: honesty first,
// then politeness, then turn of phrase.
export function buildReply(): string {
  return "I am out of office until Monday, and for once I am not pretending I will check my email, because pretending is what made me need this time off.";
}

// Gate: UTF-8 text of 1 to 200 characters, a single line, no
// leading or trailing whitespace, not only white space.
export function validateReply(reply: string): boolean {
  if (reply.length < 1 || reply.length > 200) return false;
  if (reply.trim().length === 0) return false;
  if (reply.trim() !== reply) return false;
  if (reply.includes("\n") || reply.includes("\r")) return false;
  return true;
}

function main(): void {
  const reply = buildReply();
  if (!validateReply(reply)) {
    throw new Error("reply failed validation");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", reply, "utf8");
}

main();
