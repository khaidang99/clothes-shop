import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

type Props = {
  children: React.ReactChild;
  to: string;
}

function CustomLink(props : Props) {
  const { children, to } = props;
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <Link className={match ? "active" : ""} to={to}>
      {children}
    </Link>
  );
}

export default CustomLink;
