import { validTypes } from "./utils";

class TypeError extends Error {
  constructor(field?: string) {
    super(
      `Invalid or missing type for field '${field}'. Valid types are ${validTypes
        .slice(0, -1)
        .join(", ")} and ${validTypes.slice(-1)}`
    );
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export { TypeError as default };
