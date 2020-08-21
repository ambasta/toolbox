import { validKeyTypes } from "./utils";

class KeyTypeError extends Error {
  constructor(field: any) {
    super(
      `Invalid or missing type for key '${field}'. Valid types are ${validKeyTypes
        .slice(0, -1)
        .join(", ")} and ${validKeyTypes.slice(-1)}`
    );
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export { KeyTypeError as default };
