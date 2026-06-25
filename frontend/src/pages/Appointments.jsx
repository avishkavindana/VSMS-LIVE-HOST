import {
  useEffect,
  useState,
} from "react";
import api from "../services/api";

function Appointments() {
  const [appointments,
    setAppointments] =
    useState([]);

  const [vehicles,
    setVehicles] =
    useState([]);

//new add
const [services, setServices] =
  useState([]);

  const [form, setForm] =
    useState({
      vehicle: "",
      serviceType: "",
      appointmentDate: "",
    });

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

  const loadData =
    async () => {
      const vehicleRes =
  await api.get(
    "/vehicles",
    config
  );

setVehicles(vehicleRes.data);

const serviceRes =
  await api.get(
    "/services"
  );

setServices(
  serviceRes.data
);

const appointmentRes =
  await api.get(
    "/appointments",
    config
  );

setAppointments(
  appointmentRes.data
);
    };

  useEffect(() => {
    loadData();
  }, []);

  const submit =
    async (e) => {
      e.preventDefault();

      await api.post(
        "/appointments",
        form,
        config
      );

      setForm({
        vehicle: "",
        serviceType: "",
        appointmentDate:
          "",
      });

      loadData();
    };

  return (
    <div className="container">
      <h2>
        Book Service
      </h2>

      <form
        onSubmit={
          submit
        }
      >
        <select
          value={
            form.vehicle
          }
          onChange={(e) =>
            setForm({
              ...form,
              vehicle:
                e.target
                  .value,
            })
          }
        >
          <option value="">
            Select Vehicle
          </option>

          {vehicles.map(
            (v) => (
                 <option
  key={v._id}
  value={v._id}
>
  {v.vehicleNo} -
  {v.brand} {v.model}
</option>
            )
          )}
        </select>

        <select
  value={form.serviceType}
  onChange={(e) =>
    setForm({
      ...form,
      serviceType:
        e.target.value,
    })
  }
>
  <option value="">
    Select Service
  </option>

  {services.map((s) => (
    <option
      key={s._id}
      value={s.serviceName}
    >
      {s.serviceName} -
      Rs.{s.price}
    </option>
  ))}
</select>

        <input
          type="date"
          value={
            form.appointmentDate
          }
          onChange={(e) =>
            setForm({
              ...form,
              appointmentDate:
                e.target
                  .value,
            })
          }
        />

        <button>
          Book
        </button>
      </form>

      <hr />

      <h2>
        My Appointments
      </h2>

      {appointments.map(
        (a) => (
          <div
            key={
              a._id
            }
          >
            
             <h3>
  {a.vehicle?.vehicleNo} -
  {a.vehicle?.brand}{" "}
  {a.vehicle?.model}
</h3>
            

            <p>
              {
                a.serviceType
              }
            </p>

            <p>
              {new Date(
                a.appointmentDate
              ).toLocaleDateString()}
            </p>

            <p>
              Status:
              {" "}
              {
                a.status
              }
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default Appointments;