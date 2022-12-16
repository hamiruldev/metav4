import { red } from "@mui/material/colors";
import React from "react";

const Homepage = () => {
  return (
    <div
      className="p-12 text-center relative overflow-hidden bg-no-repeat bg-cover h-96 lg:h-screen w-100"
      style={{
        backgroundImage: `url("https://mdbootstrap.com/img/Photos/Inne/ostia.jpg")`,
      }}
    >
      <div
        className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
        sx={{ backgroundColor: "#fff" }}
      >
        <div className="flex justify-center items-center h-full">
          <div className="text-white">
            <h2 className="font-semibold text-4xl mb-4">
              The background photo shows Lido di Ostia
            </h2>
            <h4 className="font-semibold text-xl mb-6">
              It is a coastal town in Italy that is part of Rome
            </h4>
            <a
              className="inline-block px-7 py-3 mb-1 border-2 border-gray-200 text-gray-200 font-medium text-sm leading-snug uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              href="#!"
              role="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Learn more about Rome
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
