export function checkToken() {
  const token = localStorage.getItem("token");

  return Boolean(token);
}

export function redirect(path) {
  window.location = path;
}
