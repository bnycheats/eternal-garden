const parseSearchParams = (queryString: string) => {
  const paramsObject: Record<string, any> = {};
  const searchParams = new URLSearchParams(queryString);
  for (const [key, value] of searchParams.entries()) {
    paramsObject[key] = value;
  }
  return paramsObject;
};

export default parseSearchParams;
