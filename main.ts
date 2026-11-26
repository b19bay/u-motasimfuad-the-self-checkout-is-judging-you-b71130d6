import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "Twelve yoghurts. I have scanned your entire personality and it expires Friday.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    console.error("MAKEFUN_OUTPUT_DIR is not set");
    process.exit(1);
  }
  if (LINE.length !== 78 || [...LINE].length !== 78) {
    console.error(`line must be exactly 78 characters, got ${LINE.length}`);
    process.exit(1);
  }
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  const back = readFileSync(target, "utf8");
  if (back !== LINE) {
    console.error("read-back mismatch: entry.txt is not byte-identical to the line");
    process.exit(1);
  }
}

main();
