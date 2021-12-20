import fs from "@flk/fs";
import { Wizard } from "./types";
import directory from "./directory";
import { logging } from "./log";
import { mongezRoot, wizardPath } from "./paths";
import { setWizard } from "./wizard";

export default function bootstrap() {
  const wizard: Wizard = fs.getJson(wizardPath());

  setWizard(wizard);

  directory(mongezRoot());
  logging({
    ...wizard?.logging,
  });
}
