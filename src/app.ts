#!/usr/bin/env node
import yargs from "yargs";
import { randomBytes } from "crypto";
import ncp from "copy-paste";

const argv = yargs(process.argv.slice(2))
  .usage("Usage: -l <length>")
  .options({
    length: {
      alias: "l",
      describe: "Length of the generated random hash",
      type: "number",
      default: 24,
    },
    copy: {
      alias: "c",
      describe: "Copy the generated random hash to clipboard",
      type: "boolean",
      default: false,
    },
  })
  .parseSync();

const { length, copy } = argv;
const bytes = randomBytes(length);
const hash = bytes.toString("hex");

if (length < 2) {
  console.error("Length must be at least 2");
  process.exit(1);
} else console.log(hash);

if (copy) ncp.copy(hash, () => process.exit(0));
