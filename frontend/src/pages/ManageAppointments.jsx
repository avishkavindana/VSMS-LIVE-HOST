import { useEffect, useState } from "react";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";

function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: {
      Authorization: "Bearer " + user.token,
    },
  };

  const loadAppointments = async () => {
    const res = await api.get(
      "/admin/appointments",
      config
    );

    setAppointments(res.data);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const updateStatus = async (
    id,
    status
  ) => {
    await api.put(
      `/admin/appointments/${id}`,
      { status },
      config
    );

    loadAppointments();
  };

  return (
    <MainLayout>
      <h1>Manage Appointments</h1>

      <br />

      <table
        border="1"
        width="100%"
      >
        <thead>
          <tr>
            <th>Customer</th>
            <th>Vehicle</th>
            <th>Service</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a) => (
            <tr key={a._id}>
              <td>
                {a.customer?.name}
              </td>

              <td>
                {a.vehicle?.vehicleNo}
              </td>

              <td>
                {a.serviceType}
              </td>

              <td>
                {a.status}
              </td>

              <td>
                <select
                  onChange={(e) =>
                    updateStatus(
                      a._id,
                      e.target.value
                    )
                  }
                >
                  <option>
                    Change Status
                  </option>

                  <option value="Approved">
                    Approved
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
}

export default ManageAppointments;