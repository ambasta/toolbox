interface AttributeType {
  partitionKey?: boolean;
  sortKey?: boolean;
  hidden?: boolean;
  map?: string;
  alias?: string;
  type?: "string" | "number";
}

interface CompositeKey {
  keyName: string;
  keyIndex: number;
}

interface Attribute {
  [key: string]: AttributeType | CompositeKey;
}

interface EntityDefinition {
  name: string;
  attributes: Attribute;
  table: string;
}

class Entity<Schema = never, HiddenKeys extends Partial<String> = never> {
}

export { AttributeType, CompositeKey, Attribute, EntityDefinition, Entity };
