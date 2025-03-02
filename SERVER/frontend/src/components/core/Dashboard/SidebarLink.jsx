/* eslint-disable no-unused-vars */
import React from "react";
import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router-dom";

const SidebarLink = ({ link, iconName }) => {
  const Icon = Icons[iconName];
  const location = useLocation();
  const dispatch = useDispatch();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <NavLink
      to={link.path}
      className={`relative px-8 flex justify-center py-5 text-sm font-medium ${
        matchRoute(link.path) ? "bg-yellow-800 w-full" : "bg-opacity-0"
      }`}
    >
      <span
        className={`absolute md:left-0 md:top-0 bottom-0 h-[5px] w-full md:h-full md:w-[0.2rem] bg-yellow-50
            ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}
      ></span>

      <div className="flex items-center gap-x-2">
        <Icon className="md:text-lg text-2xl" />
        <span className="hidden md:block">{link.name}</span>
      </div>
    </NavLink>
  );
};

export default SidebarLink;
