import MainLayout from "../layouts/MainLayout";

function CustomerDashboard() {
  return (
    <MainLayout>
      <h1>
        Customer Dashboard
      </h1>

      <br />

      <div className="card-container">
        <div className="card">
          <h3>
            My Vehicles
          </h3>

          <h1>🚗</h1>
        </div>

        <div className="card">
          <h3>
            Appointments
          </h3>

          <h1>📅</h1>
        </div>

        <div className="card">
          <h3>
            Service History
          </h3>

          <h1>🛠</h1>
        </div>

        <div className="card">
          <h3>
            Invoices
          </h3>

          <h1>🧾</h1>
        </div>
      </div>
    </MainLayout>
  );
}

export default CustomerDashboard;