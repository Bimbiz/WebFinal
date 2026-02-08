function getApiBase() {
  return localStorage.getItem("apiBaseUrl") || "http://localhost:5000";
}

function setApiBase(url) {
  localStorage.setItem("apiBaseUrl", url);
}

function getToken() {
  return localStorage.getItem("authToken") || "";
}

function setToken(token) {
  localStorage.setItem("authToken", token);
}

function clearToken() {
  localStorage.removeItem("authToken");
}

function getAuthHeader() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function apiRequest(path, options = {}) {
  const response = await fetch(getApiBase() + path, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
      ...(options.headers || {}),
    },
    ...options,
  });

  let data;

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}
