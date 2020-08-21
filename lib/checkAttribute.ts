import { error } from "./utils";

const checkAttribute = (attr: string, attrs: { [key: string]: any }) => {
  const path = attr.split(".");
  const list = path[0].split("[");

  if (list[0] in attrs) {
    if (attrs[list[0]].map) path[0] = attrs[list[0]].map;
    else [path[0]] = list;

    if (list.length > 1) path[0] += `[${list.slice(1).join("[")}]`;

    return path.join(".");
  }
  return error(`'${attr}' is not a valid attribute`);
};

export { checkAttribute as default };
