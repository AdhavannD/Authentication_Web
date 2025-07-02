import API from "../api";

export async function adminLogin(email: string, password: string) {
  const res = await API.post("/admin/login", { email, password });
  return res.data;
}
