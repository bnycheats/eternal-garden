const removeUndefinedEmptyNull = <T extends Record<string, any>>(obj: T): T => {
  Object.keys(obj).forEach((key) => {
    if (!obj[key]) {
      delete obj[key];
    }
  });
  return obj;
};

export default removeUndefinedEmptyNull;
