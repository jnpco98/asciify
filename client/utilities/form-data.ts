export function jsonFormData(formData: FormData) {
  const params: any = {};

  formData.forEach((value, key) => {
    if (!params.hasOwnProperty(key)) {
      params[key] = value;
      return;
    }

    if (!Array.isArray(params[key])) {
      params[key] = [params[key]];
    }
    params[key].push(value);
  });

  return params;
}
