import * as path from "path";
import { cwd } from "process";

export function root(...appendPath: string[]): string {
  return path.resolve(cwd(), ...appendPath);
}

export function src(...appendPath: string[]): string {
  return root("src", ...appendPath);
}

export function mongezRoot(...appendPath: string[]): string {
  return root("mongez", ...appendPath);
}

export function wizardPath(): string {
  return root("mongez.json");
}
