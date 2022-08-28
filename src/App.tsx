import { Spin } from "antd";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import type { RootState } from "app/Store";
import AdminAuth from "auth/AdminAuth";
import Header from "components/header/Header";
import { lazyComponent } from "router";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Configure Firebase.
const config = {
  apiKey: "AIzaSyCp2_Q9WqvVl04SDL9UT7mHVpPl-iHHzyk",
  authDomain: "clothes-shop-38b51.firebaseapp.com",
};

firebase.initializeApp(config);

function App() {
  const loading = useSelector((state: RootState) => state.common.loading);

  return (
    <div className="App">
      <Spin spinning={loading}>
        <Header />
        <Routes>
          <Route
            path="/login"
            element={lazyComponent("features/login/Login")}
          />
          <Route path="/" element={lazyComponent("page/home/Home")} />
          <Route
            path="/products"
            element={lazyComponent("features/products/Products")}
          />
          <Route path="/about" element={lazyComponent("page/about/About")} />
          <Route path="/contact" element={lazyComponent("page/about/About")} />
          <Route path="/cart" element={lazyComponent("features/cart/Cart")} />
          <Route
            path="/shipping"
            element={lazyComponent("features/shipping/Shipping")}
          />
          <Route
            path="/complete-order"
            element={lazyComponent("features/completeOrder/CompleteOrder")}
          />
          <Route
            path="/admin/create-product"
            element={
              <AdminAuth>
                {lazyComponent("features/products/CreateProduct")}
              </AdminAuth>
            }
          />
          <Route
            path="/admin/edit-product/:id"
            element={
              <AdminAuth>
                {lazyComponent("features/products/CreateProduct")}
              </AdminAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminAuth>{lazyComponent("features/admin/index")}</AdminAuth>
            }
          />
          <Route path="/*" element={lazyComponent("page/notFound/NotFound")} />
        </Routes>
      </Spin>
    </div>
  );
}

export default App;
