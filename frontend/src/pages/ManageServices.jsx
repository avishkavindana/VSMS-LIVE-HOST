import { useEffect, useState } from "react";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";

function ManageServices() {
  const [services, setServices] = useState([]);

  const [form, setForm] = useState({
    serviceName: "",
    description: "",
    price: "",
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

  const loadServices = async () => {
    const res = await api.get("/services");
    setServices(res.data);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    await api.post(
      "/services",
      form,
      config
    );

    setForm({
      serviceName: "",
      description: "",
      price: "",
    });

    loadServices();
  };

  const deleteService = async (id) => {
    await api.delete(
      `/services/${id}`,
      config
    );

    loadServices();
  };

  return (
    <MainLayout>
      <h1>Manage Services</h1>

      <br />

      <form onSubmit={submit}>
        <input
          placeholder="Service Name"
          value={form.serviceName}
          onChange={(e) =>
            setForm({
              ...form,
              serviceName:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target.value,
            })
          }
        />

       

  <input
    type="number"
    placeholder="Enter price"
    value={form.price}
    onChange={(e) =>
      setForm({
        ...form,
        price: e.target.value,
      })
    }
  />


        <button type="submit">
          Add Service
        </button>
      </form>

      <br />

      {services.map((s) => (
        <div key={s._id}>
          <h3>{s.serviceName}</h3>

          <p>{s.description}</p>

          <p>Rs. {s.price}</p>

          <button
            onClick={() =>
              deleteService(s._id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </MainLayout>
  );
}

export default ManageServices;