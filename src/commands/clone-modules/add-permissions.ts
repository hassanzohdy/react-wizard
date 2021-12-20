import fs from "@flk/fs";
import { toCamelCase } from "@mongez/reinforcements";
import { CloneableModule, ModuleSetup } from "./../../helpers/types";
import * as path from "path";

export default function addPermissions(
  moduleInfo: CloneableModule,
  setupOptions: ModuleSetup,
  appName: string,
  moduleName: string,
  appDirectory: string
) {
  // check if permissions is enabled
  if (
    moduleInfo?.appendTo?.permissions === false ||
    setupOptions?.appendTo?.permissions === false
  )
    return;

  let permissionsPath =
    moduleInfo?.appendTo?.permissions || setupOptions?.appendTo?.permissions;

  if (permissionsPath === true) {
    permissionsPath = "helpers/permissions.ts";
  }

  let fullPermissionsPath = path.resolve(
    appDirectory,
    permissionsPath as string
  );

  // TODO: check if file exists
  let permissionsFileContent = fs.get(fullPermissionsPath) as string;

  const permissionImportName = `${toCamelCase(moduleName)}Permissions`;

  const importStatement = `import ${permissionImportName} from "apps/${appName}/${permissionsPath!.replace(
    /.ts|.js|.tsx|.jsx$/,
    ""
  )}";`;

  if (permissionsFileContent.includes(importStatement)) return;

  permissionsFileContent = permissionsFileContent.replace(
    "// imports, DO NOT remove this line",
    `${importStatement}
// imports, DO NOT remove this line
`
  );
  permissionsFileContent = permissionsFileContent.replace(
    "// contents: DO NOT remove this line",
    `${permissionImportName},
  // contents: DO NOT remove this line`
  );

  fs.put(fullPermissionsPath, permissionsFileContent);
}
