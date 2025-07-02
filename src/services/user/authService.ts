import API from "../../services/api";
import type { LoginFormInputs } from "../../schemas/loginSchema";

export async function loginUser(data: LoginFormInputs) {
  const res = await API.post("/login", data);
  return res.data;
}
