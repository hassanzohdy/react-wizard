import { Wizard } from "./types";

let currentWizard: Wizard = {};

export function setWizard(wizardData: Wizard) {
  currentWizard = wizardData;
}

export function getWizard(): Wizard {
  return currentWizard;
}
