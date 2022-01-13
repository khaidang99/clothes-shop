import React, { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import queryString from 'query-string';
import { Spin } from 'antd';

import Itemproduct from "components/itemProduct/ItemProduct";
import Sidebar from "components/sidebar/Sidebar";
import Pagination from "components/pagination/Pagination";
import "./Products.style.scss";

import { fetchAllProducts, getSibar, setLoading } from "./ProductsSlice";
import { setLoadingFullPage } from "features/common/commonSlice";

function Products(props) {
  const [searchParams, setSearchParams] = useSearchParams("page=1");
  const { search } = useLocation();
  const [params, setParams] = useState({
    page: searchParams.get("page"),
    perPage: 4,
    category: [],
  });
  const { products, loading, countTotal, sizes, categories } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchProducts() {
      dispatch(fetchAllProducts(params));
      dispatch(getSibar());
    }
    fetchProducts();
    return () => {
      dispatch(setLoading("pending"));
    };
  }, [params]);

  useEffect(() => {
    dispatch(setLoadingFullPage(false));
  }, [products]);

  const currentPage = searchParams.get("page")
    ? parseInt(searchParams.get("page"))
    : 1;

  const onChangePagination = (page) => {
    if (currentPage !== page) {
      setSearchParams(`page=${page}`);
      setParams({ ...params, page: page });
    }
  };

  const handleFilterSibar = (filter) => {
    const objParams = queryString.parse(search) // get all params from URL (string)
    const paramsUrl = {...objParams, ...filter}
    const paramsGet = {...params, ...filter}
    setSearchParams(queryString.stringify({...paramsUrl, page: 1}))
    dispatch(fetchAllProducts({...paramsGet, page: 1}));
  };

  const listProducts = products.map((item) => (
    <Itemproduct {...item} key={item._id} />
  ));

  return (
    <div className="page-products">
      <Sidebar
        sizes={sizes}
        categories={categories}
        handleFilterSibar={handleFilterSibar}
      />
      <div className="wrapper-list-products">
        <div className="showing">
          <p>Showing {(params.page -1) * params.perPage + 1} – {(params.page - 1) * params.perPage + products.length} of {countTotal} results</p>
        </div>
        <ul className="list-products row">
          {loading === "pending" ? <Spin/> : listProducts}
        </ul>
        <Pagination
          defaultCurrent={currentPage}
          total={countTotal}
          onChange={onChangePagination}
          perPage={params.perPage}
        />
      </div>
    </div>
  );
}

export default Products;
