import API from "../api";

export async function fetchAllUsers(token: string) {
  const res = await API.get("/admin/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function addUser(data: { name: string; email: string; password: string }) {
  const token = localStorage.getItem('admin_access_token');
  const res = await API.post("/admin/users", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function updateUser(userId: string, data: { name: string; email: string; password?: string }) {
  const token = localStorage.getItem('admin_access_token');
  const res = await API.put(`/admin/users/${userId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function deleteUser(token: string, userId: number) {
  await API.delete(`/admin/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function softDeleteUser(token: string, userId: number) {
  const res = await API.delete(`/admin/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function fetchUser(token: string, userId: string | number) {
  const res = await API.get(`/admin/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function fetchDeletedUsers(token: string) {
  const res = await API.get("/admin/users/deleted", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}