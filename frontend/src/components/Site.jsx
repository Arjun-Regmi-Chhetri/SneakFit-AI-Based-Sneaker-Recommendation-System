import React from "react";

import Navbar from "./Navbar/Navbar";
import { Footer } from "./footer/Footer";
import { CartProvider } from "../context/CartContext";
import { UserProvider } from "../context/UserContext";
import { OrderProvider } from "../context/OrderContext";

const Site = ({ activetab, children }) => {
  return (
    <>
      <div className="site">
        <CartProvider>
          <UserProvider>
            <div>
              <Navbar activetab={activetab} />
            </div>

            <div className="container mx-auto">
              <OrderProvider>{children}</OrderProvider>
            </div>

            <div>
              <Footer />
            </div>
          </UserProvider>
        </CartProvider>
      </div>
    </>
  );
};

export default Site;
