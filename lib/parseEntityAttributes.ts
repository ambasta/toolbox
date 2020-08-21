import parseMapping from "./parseMapping";
import parseCompositeKey from "./parseCompositeKey";
import { validTypes } from "./utils";

const parseEntityAttributes = (attributes, track, nested: bool) => {
  const newAttributes = Object.keys(attributes).reduce((acc, field) => {
    if (typeof attributes[field] === "string") {
      if (validTypes.includes(attributes[field]))
        return Object.assign(
          acc,
          parseMapping(field, { type: attributes[field] }, track)
        );
      throw new TypeError(field);
    }

    if (Array.isArray(attributes[field])) {
      return Object.assign(
        acc,
        parseCompositeKey(field, attributes[field], track, attributes)
      );
    }

    if (
      !attributes[field].type ||
      validTypes.includes(attributes[field].type)
    ) {
      return Object.assign(
        acc,
        parseMapping(field, attributes[field], track),
        nested
      );
    }
    throw new TypeError(field);
  });

  if (!track.keys.partitionKey)
    throw new Error("Entity requires a partitionKey attribute");

  return {
    keys: track.keys,
    newAttributes,
  };
};

export { parseEntityAttributes as default };
