import React, { lazy, Suspense } from "react";
import { Spin } from "antd";
import UserAuth from "auth/UserAuth";

export function lazyComponent(path: string) {
  const Component = lazy(() => import(`../../src/${path}`));
  return (
    <Suspense fallback={<Spin />}>
      <UserAuth>
        <Component />
      </UserAuth>
    </Suspense>
  );
}
