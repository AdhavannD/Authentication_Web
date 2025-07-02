import API from "../api";

export async function addAdmin(token: string, data: { name: string; email: string; password: string }) {
  const res = await API.post("/admin/add", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
