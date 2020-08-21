import { DocumentClient } from "aws-sdk/clients/dynamodb";

const normalizeData = (client: DocumentClient) => (
  schema,
  linked,
  data,
  filter: boolean = false
) => {
  const validateType = validateTypes(client);

  const dependsOn = (map, attr) => {
    if (schema[attr].dependsOn) {
      const dependencies: any[] = Array.isArray(schema[attr].dependsOn)
        ? schema[attr].dependsOn
        : [schema[attr].dependsOn];

      dependencies.forEach((depend) => {
        if (schema[depend]) {
          if (typeof map[depend] === "function") map = dependsOn(map, depend);
        } else {
          throw new Error(`'${depend}' is not a valid attribute or alias name`);
        }
      });
      map[attr] = map[attr](map);
      return map;
    }
    try {
      map[attr] = map[attr](map);

      if (schema[attr].alias) map[schema[attr].alias] = map[attr];
      if (schema[attr].map) map[schema[attr].map] = map[attr];
    } catch (err) {
      // TODO: Find a better way to prevent this for missing fields
    }
    return map;
  };

  const dataMap = Object.keys(data).reduce((acc, field) => {});
};
