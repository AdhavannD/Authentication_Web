import API from "../../services/api";

export async function fetchCustomer(token: string, customerId: string | number) {
  const res = await API.get(`/admin/customers/${customerId}`,
    { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
}

export async function addCustomer(token: string, data: { name: string; email: string }) {
  await API.post("/customer", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function updateCustomer(token: string, customerId: number, data: { name: string; email: string }) {
  await API.put(`/customer/${customerId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function deleteCustomer(token: string, customerId: number) {
  await API.delete(`/customer/${customerId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function fetchDeletedCustomers(token: string) {
  const res = await API.get("/customer/deleted", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function fetchCustomersForUser(token: string) {
  const res = await API.get("/customer", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
