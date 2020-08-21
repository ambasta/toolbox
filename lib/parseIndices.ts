import { Index, Indices } from "../src/interfaces";

const parseIndices = (indices: Indices, partitionKey: string): Indices => {
  const indexes: Indices = {};

  Object.keys(indices).forEach((key) => {
    const index: Index = indices[key];

    if (index.partitionKey === undefined && index.sortKey === undefined)
      throw new Error(
        `A 'partitionKey', 'sortKey', or both must be provided for index '${key}'`
      );

    if (index.partitionKey && index.partitionKey === partitionKey)
      delete index.partitionKey;

    indexes[key] = index;
  });

  return indexes;
};

export { parseIndices as default };
