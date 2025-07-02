import API from "../api";

export async function fetchCustomers(token: string) {
  const res = await API.get("/admin/customers", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function updateCustomerAsAdmin(token: string, customerId: number, data: { name: string; email: string; user_id?: number }) {
  await API.put(`/admin/customers/${customerId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function deleteCustomerAsAdmin(token: string, customerId: number) {
  await API.delete(`/admin/customers/${customerId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function fetchDeletedCustomersForAdmin(token: string) {
  const res = await API.get("/admin/customers/deleted", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
