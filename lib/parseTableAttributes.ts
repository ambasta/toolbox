import { TableAttributes } from "../src/interfaces";

const parseTableAttributes = (attrs: TableAttributes): TableAttributes => {
  const attributes: TableAttributes = {};
  Object.keys(attrs).forEach((attr) => {
    const attribute = attrs[attr];
    attributes[attr] = parseAttributeConfig(attr, { type: attribute });
  });
  return attributes;
};

export { parseTableAttributes as default };
