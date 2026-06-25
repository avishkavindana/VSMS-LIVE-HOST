import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Vehicles from "./pages/Vehicles";
import Appointments from "./pages/Appointments";
import ManageAppointments from "./pages/ManageAppointments";
import ManageServices from "./pages/ManageServices";
import Invoices from "./pages/Invoices";
import AdminInvoices from "./pages/AdminInvoices";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={
            <Register />
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />


        <Route
         path="/vehicles"
         element={
           <ProtectedRoute>
             <Vehicles />
           </ProtectedRoute>
          }
          />

         <Route
         path="/appointments"
         element={
            <ProtectedRoute>
             <Appointments />
            </ProtectedRoute>
          }
          />

        <Route
  path="/manage-appointments"
  element={
    <ProtectedRoute>
      <ManageAppointments />
    </ProtectedRoute>
  }
/>



<Route
  path="/manage-services"
  element={
    <ProtectedRoute>
      <ManageServices />
    </ProtectedRoute>
  }
/>

<Route
  path="/invoices"
  element={
    <ProtectedRoute>
      <Invoices />
    </ProtectedRoute>
  }
/>


<Route
  path="/manage-invoices"
  element={
    <ProtectedRoute>
      <AdminInvoices />
    </ProtectedRoute>
  }
/>











      </Routes>
    </BrowserRouter>
  );
}

export default App;
