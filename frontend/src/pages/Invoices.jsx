import { useEffect, useState } from "react";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";

function Invoices() {
  const [invoices, setInvoices] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: {
      Authorization: "Bearer " + user.token,
    },
  };

  const loadInvoices = async () => {
    const res = await api.get("/invoices/my", config);
    setInvoices(res.data);
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  return (
    <MainLayout>
      <h1>My Invoices</h1>

      <br />

      {invoices.length === 0 ? (
        <p>No invoices found</p>
      ) : (
        invoices.map((inv) => (
          <div key={inv._id} className="card">
            <h3>Amount: Rs. {inv.amount}</h3>
            <p>Status: {inv.paymentStatus}</p>
            <p>
              Date:{" "}
              {new Date(inv.generatedDate).toLocaleDateString()}
            </p>
            <p>
              Vehicle: {inv.appointment?.vehicle}
            </p>
          </div>
        ))
      )}
    </MainLayout>
  );
}

export default Invoices;