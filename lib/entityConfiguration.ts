interface EntityConfiguration {
  name: string;
  timestamps: boolean;
  created: string;
  createdAlias: string;
  modified: string;
  modifiedAlias: string;
  typeAlias: string;
  attributes: object;
  autoExecute: boolean;
  autoParse: boolean;
  table: string;
}

interface Track {
  fields: any;
  defaults: any;
  required: any;
  linked: any;
  keys: any;
}

export { EntityConfiguration, Track };
