import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";
import MainLayout from "../layouts/MainLayout";

function AdminDashboard() {
  const [stats, setStats] =
    useState({});

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const config = {
    headers: {
      Authorization:
        "Bearer " +
        user.token,
    },
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard =
    async () => {
      const res =
        await api.get(
          "/admin/dashboard",
          config
        );

      setStats(res.data);
    };

  return (
    <MainLayout>
      <h1>
        Admin Dashboard
      </h1>

      <br />

      <div className="card-container">
        <div className="card">
          <h3>
            Customers
          </h3>

          <h1>
            {
              stats.customers
            }
          </h1>
        </div>

        <div className="card">
          <h3>
            Vehicles
          </h3>

          <h1>
            {
              stats.vehicles
            }
          </h1>
        </div>

        <div className="card">
          <h3>
            Appointments
          </h3>

          <h1>
            {
              stats.appointments
            }
          </h1>
        </div>

        <div className="card">
          <h3>
            Pending
          </h3>

          <h1>
            {
              stats.pending
            }
          </h1>
        </div>
      </div>
    </MainLayout>
  );
}

export default AdminDashboard;