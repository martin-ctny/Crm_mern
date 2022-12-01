import InvoiceListePage from "./pages/InvoiceListePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerListePage from "./pages/CustomerListePage";
import MainLayout from "./layouts/MainLayout";
import InvoiceForm from "./pages/InvoiceForm";
import CustomerForm from "./pages/CustomerForm";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
            <Route path="/" element={<InvoiceListePage />} />
            <Route path="/invoices/edit/:id"  element={<InvoiceForm />} />
            <Route path="/invoices/addInvoice"  element={<InvoiceForm />} />
            <Route path="/customers" element={<CustomerListePage />} />
            <Route path="/customers/edit/:id" element={<CustomerForm />} />
            <Route path="/customers/addCustomer" element={<CustomerForm />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
