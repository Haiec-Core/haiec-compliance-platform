type PlainObject = {
  [key: string]: unknown;
};

function isJson(input: unknown): input is PlainObject {
  return typeof input === "object" && input !== null;
}

export function toSafeJSONB(input: unknown): PlainObject {
  if (typeof input === "string") {
    try {
      const parsed = JSON.parse(input);
      if (isJson(parsed)) {
        return parsed;
      }
      return {} as PlainObject;
    } catch (error) {
      return {} as PlainObject;
    }
  } else if (isJson(input)) {
    return input;
  }
  return {} as PlainObject;
}
