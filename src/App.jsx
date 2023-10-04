import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import ProctedRoutes from "./pages/ProctedRoutes";

import { CitiesProvider } from "./contexts/CitiesContext";

const App = () => {
  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />}></Route>
            <Route path="product" element={<Product />}></Route>
            <Route path="pricing" element={<Pricing />}></Route>
            <Route
              path="app"
              element={
                <ProctedRoutes>
                  <AppLayout />
                </ProctedRoutes>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />}></Route>
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form></Form>} />
            </Route>
            <Route path="*" element={<PageNotFound />}></Route>
            <Route path="login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  );
};

export default App;
