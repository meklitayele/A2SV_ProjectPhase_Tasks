import React from 'react'
import { ChevronDown } from "lucide-react";

const Header = () => {
  return (
    <div className="flex flex-row space-between" style = {{ color: "rgb(37, 50, 75)" }}>
      <div className="pl-8 pt-10">
        <h1 className="font-extrabold text-2xl">Opportunities</h1>
        <h4 className="text-gray-500 text-sm">Showing 73 results</h4>
      </div>
      <div className="text-gray-500 text-sm pl-[700px] pt-12 flex  items-center space-x-2">
        Sort by :
        <span className=" flex flex-row pl-1 text-black font-semibold">
          Most Relevant
          <ChevronDown className="w-5 h-4  text-gray-500" />
        </span>
      </div>
    </div>
  );
}

export default Header