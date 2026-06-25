import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h2>
        Vehicle Service Management System
      </h2>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;