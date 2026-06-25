import { useState, useContext } from "react";
import api from "../services/api";
import {
  AuthContext
} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const { login } =
    useContext(AuthContext);

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const submit = async (e) => {
    e.preventDefault();

    const res =
      await api.post(
        "/auth/login",
        {
          email,
          password
        }
      );

    login(res.data);

    if (
      res.data.role === "admin"
    ) {
      navigate("/admin");
    } else {
      navigate(
        "/dashboard"
      );
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Email"
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />


        <button>
          Login
        </button><br></br><p aria-setsize={5}>if no Account? <br></br>Please Register</p>

        <Link to="/register">
  <button type="button">
    Register
  </button>
</Link>


        
      </form>
    </div>
  );
}

export default Login;