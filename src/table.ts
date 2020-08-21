import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { TableConstructor } from "./interfaces";

class Table {
  private execute?: boolean;

  private parse?: boolean;

  private removeNulls?: boolean;

  private client: DocumentClient;

  private entities: string[];

  private autoExecute: boolean;

  private autoParse: boolean;

  public Table: string;

  public name: string;

  constructor(options: TableConstructor) {
    Object.assign(this, parseTableOptions(options));
  }

  get entities(): any;

  set entities(): any;

  attribute(...args: any); // TODO Document
  parse(entity, input, include?);
}
