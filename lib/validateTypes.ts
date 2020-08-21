import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { hasValue, toBool } from "./utils";

const validateType = (client: DocumentClient) => (
  mapping,
  field: string,
  value: any
) => {
  if (!hasValue(value)) return value;

  switch (mapping.type) {
    case "string":
      if (typeof value === "string" || mapping.coerce) return String(value);
      throw new Error(`'${field}' must be of type string`);
    case "boolean":
      if (typeof value === "boolean" || mapping.coerce) return toBool(value);
      throw new Error(`'${field}' must be of type boolean`);
    case "number":
      if (typeof value === "number" || mapping.coerce) {
        if (String(parseInt(value, 10)) === String(value))
          return parseInt(value, 10);
        if (String(parseFloat(value)) === String(value))
          return parseFloat(value);
        throw new Error(
          `Could not convert '${value}' to a number for field '${field}'`
        );
      }
      throw new Error(`'${field}' must be of type 'number'`);
    case "list":
      if (Array.isArray(value)) return value;
      if (mapping.coerce)
        return String(value)
          .split(",")
          .map((token: string) => token.trim());
      throw new Error(`'${field}' must be a 'list' (array)`);
    case "map":
      if (typeof value === "object" && !Array.isArray(value)) return value;
      throw new Error(`'${field}' must be a 'map' (object)`);
    case "set":
      if (Array.isArray(value)) {
        if (!client)
          throw new Error(
            "DynamoDB DocumentClient is required for this operation"
          );
        const setValue = client.createSet(value, { validate: true });
        if (!mapping.setType || mapping.setType === setValue.type.toLowerCase())
          return setValue;
        throw new Error(
          `'${field}' must be a valid 'set' (array) of type '${mapping.setType}'`
        );
      }
      throw new Error(`'${field}' must be a valid 'set' (array)`);
    default:
      return value;
  }
};

export { validateType as default };
