import React from "react";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
