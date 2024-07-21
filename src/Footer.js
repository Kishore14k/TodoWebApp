import React from "react";

const Footer = ({tasks}) => {
  // const year = new Date();
  return <div className="footer">{tasks.length} {tasks.length === 1 ? "task": "tasks"}</div>;
  // return <div className="footer">Copyright &copy; {year.getFullYear()}</div>;
};

export default Footer;
