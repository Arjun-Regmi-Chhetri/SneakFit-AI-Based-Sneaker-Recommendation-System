import React from "react";

import { Route, Routes } from "react-router-dom";

import Admin from "../components/Admin/Admin";
import Dashboard from "../components/Admin/Dashboard";

import ProductCategory from "../components/Admin/component/productCategory/ProductCategory";
import AddProductCategory from "../components/Admin/component/productCategory/AddProductCategory";
import ProductBrand from "../components/Admin/component/productBrand/ProductBrand";
import ProductSize from "../components/Admin/component/productSize/ProductSize";
import AddProductSize from "../components/Admin/component/productSize/AddProductSize";
import AddProductBrand from "../components/Admin/component/productBrand/AddProductBrand";
import Product from "../components/Admin/component/product/Product";
import AddProductService from "../components/Admin/component/product/AddProductService";
import Users from "../components/Admin/component/Users/Users";
import ProductSubCategory from "../components/Admin/component/subcategory/ProductSubCategory";
import AddProductSubCategory from "../components/Admin/component/subcategory/AddProductSubCategory";
import Register from "../components/Admin/auth/register/Register";
import AdminList from "../components/Admin/component/Admin/AdminList";
import UpdateBrand from "../components/Admin/component/productBrand/UpdateBrand";
import UpdateCategory from "../components/Admin/component/productCategory/UpdateCategory";
import UpdateSubCategory from "../components/Admin/component/subcategory/UpdateSubCategory";
import UpdateProduct from "../components/Admin/component/product/UpdateProduct";
import Login from "../components/Admin/auth/login/Login";

const AdminRoute = () => {
  return (
    <>
      <Routes>
     

        {/* ------------------------Routes for admin--------------------------------- */}

        <Route
          path="/dashboard"
          element={
            <Admin activeTab={0}>
              <Dashboard />
            </Admin>
          }
        ></Route>

        {/* sneaker product list */}
        <Route
          path="/sneaker"
          element={
            <Admin activeTab={1}>
              <Product />
            </Admin>
          }
        ></Route>

        <Route
          path="/sneaker/edit/product/:productId"
          element={
            <Admin activeTab={1}>
              <UpdateProduct />
            </Admin>
          }
        ></Route>

        <Route
          path="/sneaker/addProduct"
          element={
            <Admin activeTab={1}>
              <AddProductService />
            </Admin>
          }
        ></Route>

        {/* sneaker category */}

        <Route
          path="/sneakerCategory"
          element={
            <Admin activeTab={2}>
              <ProductCategory />
            </Admin>
          }
        ></Route>

        <Route
          path="/sneakerCategory/addCategory"
          element={
            <Admin activeTab={2}>
              <AddProductCategory />
            </Admin>
          }
        ></Route>
        <Route
          path="/sneakerCategory/edit/:categoryId"
          element={
            <Admin activeTab={2}>
              <UpdateCategory />
            </Admin>
          }
        ></Route>

        {/* sneaker sub category */}

        <Route
          path="/sneakerSubCategory"
          element={
            <Admin activeTab={3}>
              <ProductSubCategory />
            </Admin>
          }
        ></Route>

        <Route
          path="/sneakerSubCategory/addSubCategory"
          element={
            <Admin activeTab={3}>
              <AddProductSubCategory />
            </Admin>
          }
        ></Route>

        <Route
          path="/sneakerSubCategory/edit/:subCategoryId"
          element={
            <Admin activeTab={3}>
              <UpdateSubCategory />
            </Admin>
          }
        ></Route>

        {/* brand */}
        <Route
          path="/sneakerBrand"
          element={
            <Admin activeTab={4}>
              <ProductBrand />
            </Admin>
          }
        ></Route>

        <Route
          path="/sneakerBrand/addBrand"
          element={
            <Admin activeTab={4}>
              <AddProductBrand />
            </Admin>
          }
        ></Route>

        <Route
          path="/sneakerBrand/edit/:brandId"
          element={
            <Admin activeTab={4}>
              <UpdateBrand />
            </Admin>
          }
        ></Route>

        {/* size */}
        <Route
          path="/sneakerSize"
          element={
            <Admin activeTab={5}>
              <ProductSize />
            </Admin>
          }
        ></Route>

        <Route
          path="/sneakerSize/addSneakerSize"
          element={
            <Admin activeTab={5}>
              <AddProductSize />
            </Admin>
          }
        ></Route>

        {/* users */}
        <Route
          path="/user"
          element={
            <Admin activeTab={6}>
              <Users />
            </Admin>
          }
        ></Route>

        {/* admin */}
        <Route
          path="/admin_list"
          element={
            <Admin activeTab={7}>
              <AdminList />
            </Admin>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default AdminRoute;
