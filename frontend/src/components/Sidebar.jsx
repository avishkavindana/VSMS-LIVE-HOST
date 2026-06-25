import { Link } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>VSMS</h2>
      </div>

      <div className="menu">
        {user.role === "customer" && (
          <>
            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/vehicles">
              My Vehicles
            </Link>

            <Link to="/appointments">
              Appointments
            </Link>

            <Link to="/invoices">
              Invoices
            </Link>
          </>
        )}

        {user.role === "admin" && (
          <>
            <Link to="/admin">
              Dashboard
            </Link>

            <Link to="/manage-services">
              Services
            </Link>

            <Link to="/manage-appointments">
              Appointments
            </Link>

            <Link to="/manage-invoices">
              Invoices
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;