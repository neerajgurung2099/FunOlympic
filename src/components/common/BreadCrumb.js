import React from "react";
import { useLocation } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const BreadCrumb = ({ breadcrumbNameMap }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <Link underline="hover" color="inherit" to={`/` + to} key={to}>
            {breadcrumbNameMap[to]}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumb;
