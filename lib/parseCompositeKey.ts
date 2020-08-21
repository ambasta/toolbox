import parseMapping from "./parseMapping";

const parseCompositeKey = (
  field: string,
  config: any[],
  track: { [key: string]: any },
  schema: { [key: string]: any }
) => {
  if (config.length >= 2 && config.length <= 3) {
    const [link, pos, third] = config;

    if (!schema[link])
      throw new Error(`'${field}' must reference another field`);

    if (typeof pos !== "number" || parseInt(String(pos), 10) !== pos)
      throw new Error(`'${field}' position value must be integer`);

    let subConfig: { type: any; [key: string]: any };

    if (!third) subConfig = { type: "string" };
    else if (["string", "boolean", "number"].includes(third))
      subConfig = { type: third };
    else if (typeof third === "object" && !Array.isArray(third))
      subConfig = third;
    else
      throw new Error(
        `'${field}' type must be 'string', 'number', 'boolean' or a configuration object`
      );

    if (!track.linked[link]) track.linked[link] = [];
    track.linked[link][pos] = field;

    return {
      [field]: {
        save: true,
        ...parseMapping(field, subConfig, track)[field],
        link,
        pos,
      },
      ...(subConfig.alias
        ? {
            [subConfig.alias]: { ...subConfig, map: field },
          }
        : {}),
    };
  }
  throw new Error("Composite key configurations must have 2 or 3 items");
};

export { parseCompositeKey as default };
