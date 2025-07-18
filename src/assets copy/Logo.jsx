import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logoApp.svg";

function Logo() {
  return (
    <div className="flex items-center">
      <Link
        to="/"
        className="flex items-center gap-2 no-underline text-text-dark font-sans relative group transition-colors duration-300"
      >
        <img
          src={logo}
          alt="Logo"
          className="h-6 w-auto transition-transform duration-300 group-hover:scale-110 group-hover:brightness-110"
        />
        <h5 className="text-sm font-bold text-[rgb(49,237,137)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#007bff] relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-[#007bff] after:transition-all after:duration-300 group-hover:after:w-full">
          Win2Cop
        </h5>
      </Link>
    </div>
  );
}

export default Logo;
