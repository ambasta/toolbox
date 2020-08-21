import { DocumentClient } from "aws-sdk/clients/dynamodb";

export type DynamoDBPrimitives =
  | string
  | number
  | DocumentClient.DynamoDbSet
  | boolean
  | DocumentClient.binaryType;

export type DynamoDBArray = Array<DynamoDBPrimitives>;

export type DynamoDBSimpleTypes = DynamoDBPrimitives | DynamoDBArray;

export type DynamoDBMap = Record<string, DynamoDBSimpleTypes>;

export interface TableAttributes {
  [attribute: string]: DynamoDBPrimitives | DynamoDBArray | DynamoDBMap;
}

export interface Index {
  partitionKey?: string;
  sortKey?: string;
  type?: "GSI" | "LSI";
}

export interface Indices {
  [index: string]: Index;
}

export interface TableConstructorOptions {
  name: string;
  partitionKey: string;
  alias?: string;
  sortKey?: string;
  entityField?: boolean | string;
  attributes?: TableAttributes;
  indices?: Indices;
  autoExecute?: boolean;
  autoParse?: boolean;
  DocumentClient?: DocumentClient;
  entities?: {}; // TODO - Not documented
  removeNullAttributes?: boolean;
}
