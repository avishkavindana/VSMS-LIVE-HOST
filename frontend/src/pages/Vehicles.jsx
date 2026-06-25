import {
  useEffect,
  useState,
} from "react";
import api from "../services/api";

function Vehicles() {
  const [vehicles, setVehicles] =
    useState([]);

  const [form, setForm] =
    useState({
      vehicleNo: "",
      brand: "",
      model: "",
      year: "",
      fuelType: "",
    });

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const config = {
    headers: {
      Authorization:
        "Bearer " + user.token,
    },
  };

  const getVehicles = async () => {
    const res = await api.get(
      "/vehicles",
      config
    );

    setVehicles(res.data);
  };

  useEffect(() => {
    getVehicles();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    await api.post(
      "/vehicles",
      form,
      config
    );

    setForm({
      vehicleNo: "",
      brand: "",
      model: "",
      year: "",
      fuelType: "",
    });

    getVehicles();
  };

  const remove = async (id) => {
    await api.delete(
      `/vehicles/${id}`,
      config
    );

    getVehicles();
  };

  return (
    <div className="container">
      <h2>My Vehicles</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Vehicle Number"
          value={form.vehicleNo}
          onChange={(e) =>
            setForm({
              ...form,
              vehicleNo:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Brand"
          value={form.brand}
          onChange={(e) =>
            setForm({
              ...form,
              brand:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Model"
          value={form.model}
          onChange={(e) =>
            setForm({
              ...form,
              model:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Year"
          value={form.year}
          onChange={(e) =>
            setForm({
              ...form,
              year:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Fuel Type"
          value={form.fuelType}
          onChange={(e) =>
            setForm({
              ...form,
              fuelType:
                e.target.value,
            })
          }
        />

        <button>
          Add Vehicle
        </button>
      </form>

      <hr />

      {vehicles.map((v) => (
        <div key={v._id}>
          <h3>
            {v.vehicleNo}
          </h3>

          <p>
            {v.brand} - {v.model}
          </p>

          <p>
            {v.year} |{" "}
            {v.fuelType}
          </p>

          <button
            onClick={() =>
              remove(v._id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Vehicles;