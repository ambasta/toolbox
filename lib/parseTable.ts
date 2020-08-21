import { TableConstructorOptions } from "../src/interfaces";
import parseIndices from "./parseIndices";
import parseTableAttributes from "./parseTableAttributes";

const parseTableOptions = (options: TableConstructorOptions): any => {
  const parsedOptions: TableConstructorOptions = {
    name: options.name.trim(),
    partitionKey: options.partitionKey.trim(),
  };

  if (parsedOptions.name.length === 0)
    throw new Error("'name' must be defined");

  if (parsedOptions.partitionKey.length === 0)
    throw new Error("'partitionKey' must be defined");

  if (options.alias && options.alias.trim().length > 0)
    parsedOptions.alias = options.alias.trim();

  if (options.sortKey && options.sortKey.trim().length > 0)
    parsedOptions.sortKey = options.sortKey;

  if (typeof options.entityField === "boolean") {
    if (options.entityField) parsedOptions.entityField = "_et";
  } else parsedOptions.entityField = options.entityField?.trim() || "_et";

  if (options.entityField) parsedOptions.entityField = "string";

  if (options.indices)
    parsedOptions.indices = parseIndices(options.indices, options.partitionKey);

  parsedOptions.attributes = parseTableAttributes(
    options.attributes || {},
    parsedOptions.partitionKey,
    parsedOptions.sortKey
  );
};

export { parseTableOptions as default };
