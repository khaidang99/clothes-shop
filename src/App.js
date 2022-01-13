import { Routes, Route } from "react-router-dom";
import { Spin } from "antd";
import { useSelector } from "react-redux";

import { lazyComponent } from "router";
import Header from "components/header/Header";
import AdminAuth from "auth/AdminAuth";

function App() {
  const loading = useSelector((state) => state.common.loading);
  return (
    <div className="App">
      <Spin spinning={loading}>
        <Header />
        <Routes>
          <Route path="/login" element={lazyComponent("features/login/Login")} />
          <Route
            path="/"
            element={lazyComponent("page/home/Home")}
          />
          <Route
            path="/products"
            element={lazyComponent("features/products/Products")}
          />
          <Route
            path="/about"
            element={lazyComponent("page/about/About")}
          />
          <Route
            path="/contact"
            element={lazyComponent("page/about/About")}
          />
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
            element={lazyComponent(
              <AdminAuth>{lazyComponent("features/products/CreateProduct")}</AdminAuth>
            )}
          />
          <Route
            path="/admin/edit-product/:id"
            element={lazyComponent(
              <AdminAuth>{lazyComponent("features/products/CreateProduct")}</AdminAuth>
            )}
          />
          <Route
            path="/admin"
            element={<AdminAuth>{lazyComponent("admin")}</AdminAuth>}
          />
          <Route
            path="/*"
            element={lazyComponent("page/notFound/NotFound")}
          />
        </Routes>
      </Spin>
    </div>
  );
}

export default App;
