import { useEffect, useState } from "react";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";

function AdminInvoices() {
  const [invoices, setInvoices] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: {
      Authorization: "Bearer " + user.token,
    },
  };

  const loadInvoices = async () => {
    const res = await api.get("/invoices/admin", config);
    setInvoices(res.data);
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  return (
    <MainLayout>
      <h1>All Invoices (Admin)</h1>

      <br />

      {invoices.map((inv) => (
        <div key={inv._id} className="card">
          <h3>Customer: {inv.customer?.name}</h3>
          <p>Email: {inv.customer?.email}</p>
          <p>Amount: Rs. {inv.amount}</p>
          <p>Status: {inv.paymentStatus}</p>
          <p>
            Date:{" "}
            {new Date(inv.generatedDate).toLocaleDateString()}
          </p>
        </div>
      ))}
    </MainLayout>
  );
}

export default AdminInvoices;