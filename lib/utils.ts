export const validTypes = [
  "string",
  "boolean",
  "number",
  "list",
  "map",
  "binary",
  "set",
];

export const validKeyTypes = ["string", "number", "binary"];

export const toBool = (value: any): boolean => {
  if (typeof value === "boolean") return value;

  if (["false", "0", "no"].includes((<string>value).toLowerCase()))
    return false;
  return Boolean(value);
};

export const hasValue = (value: any): boolean =>
  value !== undefined && value !== null;

export const isEmpty = (value: any): boolean =>
  value === undefined ||
  (typeof value === "object" && Object.keys(value).length === 0);

export const error = (err: any) => {
  throw new Error(err);
};

export const transformAttr = (mapping: any, value: any, data: any) => {
  const returnValue = mapping.transform
    ? mapping.transform(value, data)
    : value;
  return mapping.prefix || mapping.suffix
    ? `${mapping.prefix || ""}${returnValue}${mapping.suffix || ""}`
    : returnValue;
};
