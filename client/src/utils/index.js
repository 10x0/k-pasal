export function mapObjectToFormData(data) {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    data[key] && formData.append(key, data[key]);
  });
  return formData;
}
