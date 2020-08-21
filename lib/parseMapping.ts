import { error } from "./utils";

/* eslint no-param-reassign: ["error", { "props": false }] */
const parseMapping = (
  field: string,
  config: { [key: string]: any },
  track
): { [key: string]: any } => {
  Object.keys(config).forEach((prop: string) => {
    switch (prop) {
      case "type":
      case "default":
        break;
      case "dependsOn":
        if (typeof config[prop] !== "string" && !Array.isArray(config[prop]))
          error("'dependsOn' must be the string name of an attribute or alias");
        break;
      case "transform":
        if (typeof config[prop] !== "function")
          error(`${prop} must be a function`);
        break;
      case "coerce":
      case "onUpdate":
      case "hidden":
      case "save":
        if (typeof config[prop] !== "boolean")
          error(`${prop} must be a boolean`);
        break;
      case "required":
        if (typeof config[prop] !== "boolean" && config[prop] !== "always")
          error("'required' must be a boolean or set to 'always'");
        break;
      case "alias":
      case "map":
        if (
          typeof config[prop] !== "string" ||
          track.fields.includes(config[prop].trim()) ||
          config[prop].trim().length === 0
        )
          error(`${prop} must be a unique string`);
        break;
      case "setType":
        if (config.type !== "set")
          error("'setType' is only valid for type 'set'");
        if (!["string", "number", "binary"].includes(config[prop]))
          error("Invalid 'setType', must be 'string', 'number' or 'binary'");
        break;
      case "delimiter":
        if (
          typeof config[prop] !== "string" ||
          config[prop].trim().length === 0
        )
          error("'delimiter' must be a 'string'");
        config[prop] = config[prop].trim();
        break;
      case "prefix":
      case "suffix":
        if (config.type && config.type !== "string")
          error(`'${prop}' can only be used on 'string' types`);
        if (
          typeof config[prop] !== "string" ||
          config[prop].trim().length === 0
        )
          error(`'${prop}' must be a 'string'`);
        break;
      case "partitionKey":
      case "sortKey":
        if (config.map || config.alias)
          error(
            `Attributes with a '${prop}' cannot have a 'map' or 'alias' associated`
          );
        if (
          typeof config[prop] === "boolean" ||
          typeof config.prop === "string" ||
          Array.isArray(config[prop])
        ) {
          const indices: any[] = Array.isArray(config[prop])
            ? config[prop]
            : [config[prop]];
          indices.forEach((item) => {
            if (typeof item === "boolean") {
              if (!track.keys[prop]) {
                track.keys[prop] = item ? field : undefined;
              } else
                error(
                  `'${track.keys[prop]}' has already been declared as the '${prop}'`
                );

              if (
                track.keys.partitionKey &&
                track.keys.partitionKey === track.keys.sortKey
              )
                error(
                  `'${field}' attribute cannot be both the partitionKey and the sortKey`
                );
            } else {
              if (typeof item !== "string")
                error(
                  `Index assignments for '${field}' must be string or boolean value`
                );

              if (!track.keys[item]) track.keys[item] = {};
              track.keys[item][prop] = !track.keys[item][prop]
                ? field
                : error(
                    `'${track.keys[item][prop]}' has already been declared as the '${prop}' for the '${item}' index`
                  );

              if (track.keys[item].partitionKey === track.keys[item].sortKey)
                error(
                  `'${field}' attribute cannot both be the partitionKey and the sortKey for the '${item}' index`
                );
            }
          });
        } else error(`'${prop}' must be a boolean, string, or array`);
        break;
      default:
        error(`'${prop}' is not a valid property type`);
    }
  });

  if (config.alias && config.map)
    error(`'${field}' cannot contain both an alias and a map`);

  if (!config.type) config.type = "string";

  if (
    ["string", "boolean", "number"].includes(config.type) &&
    typeof config.coerce === "undefined"
  )
    config.coerce = true;

  if (config.default !== undefined) track.defaults[field] = config.default;

  if (config.required === true) track.required[config.map || field] = false;

  if (config.required === "always") track.required[config.map || field] = true;

  const { map, alias, ...newConfig } = config;

  return {
    [field]: config,
    ...(alias
      ? {
          [alias]: { ...newConfig, map: field },
        }
      : {}),
    ...(map ? { [map]: { ...newConfig, alias: field } } : {}),
  };
};

export { parseMapping as default };
