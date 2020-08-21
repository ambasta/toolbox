import parseEntityAttributes from "./parseEntityAttributes";
import { EntityConfiguration, Track } from "./entityConfiguration";

const parseEntity = (entity: EntityConfiguration) => {
  const parsedEntity: EntityConfiguration = entity;
  if (parsedEntity.name.trim().length === 0)
    throw new Error("'name' must be defined");

  if (parsedEntity.created.trim().length === 0) parsedEntity.created = "_ct";

  if (parsedEntity.createdAlias.trim().length === 0)
    parsedEntity.createdAlias = "created";

  if (parsedEntity.modified.trim().length === 0) parsedEntity.modified = "_md";

  if (parsedEntity.modifiedAlias.trim().length === 0)
    parsedEntity.modifiedAlias = "modified";

  if (parsedEntity.typeAlias.trim().length === 0)
    parsedEntity.typeAlias = "entity";

  if (Array.isArray(parsedEntity.attributes))
    throw new Error("Please provide a valid 'attributes' object");

  Object.keys(parsedEntity).forEach((key) => {
    if (typeof parsedEntity[key] === "string")
      parsedEntity[key] = parsedEntity[key].trim();
  });

  if (parsedEntity.timestamps) {
    parsedEntity.attributes[parsedEntity.created] = {
      type: "string",
      alias: parsedEntity.createdAlias,
      default: () => new Date().toISOString(),
    };
    parsedEntity.attributes[parsedEntity.modified] = {
      type: "string",
      alias: parsedEntity.modifiedAlias,
      default: () => new Date().toISOString(),
    };
  }

  const track: Track = {
    fields: Object.keys(parsedEntity.attributes),
    defaults: {},
    required: {},
    linked: {},
    keys: {},
  };

  return {
    name: parsedEntity.name,
    schema: parseEntityAttributes(parsedEntity.attributes, track, false),
    defaults: track.defaults,
    required: track.required,
    linked: track.linked,
    autoExecute: parsedEntity.autoExecute,
    autoParse: parsedEntity.autoParse,
    _etAlias: parsedEntity.typeAlias,
    ...(parsedEntity.table ? { table: parsedEntity.table } : {}),
  };
};

export { parseEntity as default };
