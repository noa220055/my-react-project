import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home"; 
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AdminBorrows from './components/AdminBorrows';
import Equipments from "./components/Equipments";
import BorrowList from "./components/BorrowList";
import AdminEquipments from "./components/AdminEquipments";
import AdminEquipmentForm from "./components/AdminEquipmentForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/borrows" element={<AdminBorrows />} />
      <Route path="/equipments" element={<Equipments />} />
      <Route path="/borrows/me" element={<BorrowList />} />
      <Route path="/admin/equipments" element={<AdminEquipments />} />
      <Route path="/admin/equipments/:id" element={<AdminEquipmentForm />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
