// Not used, but would be nice to get it to work

const schemaFile = Bun.file("./dbschema/interfaces.ts");

const getSchema = async (): Promise<string> => {
  const text = await schemaFile.text();

  const defaultExports = text
    .match(/export namespace \$default {\n((?:.*?|\n)*?)\n}/)
    ?.at(1);

  return defaultExports?.replaceAll("extends std.$Object ", "") ?? "";
};

const getExports = (
  defaultSchema: string,
): { name: string; value: string }[] => {
  const exports = defaultSchema.match(
    /export interface .+ {\n((?:.*?|\n)*?)}/g,
  );

  return (exports?.map((part) => {
    const trimedPart = part.replace("export interface ", "");
    const match = trimedPart.match(/(.+) ({\n(?:.*?|\n)*?})/);
    const name = match?.at(1) || "";
    const value = match?.at(2) || "";

    return { name, value };
  }) ?? []);
};

const writeTypeboxInterface = async () => {
  const schemaText = await getSchema();
  const exports = getExports(schemaText);
  let exportsText = "";

  for (const part of exports) {
    exportsText += `\nexport const ${part.name}Model = Parse(\`${part.value}\`);`;
  }

  const interfaceText = `
import { Parse } from "@sinclair/typebox/syntax";
${exportsText}
`.trim();
  await Bun.write("./dbschema/typeboxInterfaces.ts", interfaceText);
};

writeTypeboxInterface();
