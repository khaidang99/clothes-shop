import React, { lazy, Suspense } from "react";
import { Spin } from 'antd';
 
export function lazyComponent (path) {
    const Component =  lazy(() => import(`../../src/${path}`))
    return (
      <Suspense fallback={<Spin/>}>
        <Component/>
      </Suspense>
    )
}

const ROUTES = [
    { path: "/", key: "ROOT", exact: true, component: () => <h1>Log in</h1> },
    {
      path: "/products",
      key: "PRODUCTS",
      component: () => <h1>products</h1>,
      routes: [
        {
          path: "/products",
          key: "PRODUCTS_ROOT",
          exact: true,
          component: () => <h1>App Index</h1>,
        },
        {
          path: "/products/detail",
          key: "PRODUCTS_DETAIL",
          exact: true,
          component: () => <h1>products detail</h1>,
        },
      ],
    },
];
  
export default ROUTES;