import React from "react";

export default function Repositories({
  repositories,
  data,
  projects,
}: {
  repositories: any[];
  data: any;
  projects: any[];
}) {
  console.log(repositories, data, projects);
  return <div className="contributions-grid"></div>;
}
