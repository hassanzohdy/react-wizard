import { getWizard } from "./wizard";
import cloneModules from "../commands/clone-modules";

export default function letTheMagicBegin() {
  const wizard = getWizard();

  if (wizard.cloneables) {
    cloneModules(wizard);
  }
}
