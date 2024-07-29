import React, { useEffect, useState } from "react";

import {
  fetchAllOrder,
  fetchAllUser,
  fetchProduct,
} from "../../service/Service";

const Dashboard = () => {
  const [orders, setOrder] = useState([]);
  const [users, setUser] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const fetchOrder = await fetchAllOrder();
    const fetchUser = await fetchAllUser();
    const fetchProducts = await fetchProduct();
    setProducts(fetchProducts);
    setUser(fetchUser);
    setOrder(fetchOrder);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
  );

  return (
    <div className="w-full px-3">
      <div className="pb-3">
        <h2 className="text-xl">Hello, Welcome !</h2>
      </div>
      <div className="grid sm:grid-cols-2 grid-flow-* gap-4 py-7  grid-cols-1 md:grid-cols-3">
        <div className="bg-green-500 text-white text-center p-4 px-8 rounded-md">
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-[80px]"
            >
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
          </p>
          <p className="text-left py-2">
            <strong className="text-xl">{orders.length} </strong>
            <br />
            Total Orders
          </p>
        </div>
        <div className="bg-blue-500 text-white text-center p-4 px-8 rounded-md">
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-[80px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
          </p>
          <p className="text-left py-2">
            <strong className="text-xl"> {users.length} </strong>
            <br />
            Total Users
          </p>
        </div>
        <div className="bg-gray-500 text-white text-center p-4 px-8 rounded-md">
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-[80px]"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                clipRule="evenodd"
              />
            </svg>
          </p>
          <p className="text-left py-2">
            <strong className="text-xl"> {products.length}</strong>
            <br />
            Total Product
          </p>
        </div>
      </div>
      <div></div>{" "}
      <div className="py-7">
        <p className="text-xl font-semibold py-4 ">Latest Order</p>
        <table className="border-collapse border border-slate-500 w-full text-left">
          <thead className="bg-gray-600 text-white">
            <tr>
              <th className="border border-slate-600 px-4 py-3 text-sm font-medium">
                SN
              </th>
              <th className="border border-slate-600 px-4 py-3 text-sm font-medium">
                Customer Name
              </th>
              <th className="border border-slate-600 px-4 py-3 text-sm font-medium">
                Product Name
              </th>
              <th className="border border-slate-600 px-4 py-3 text-sm font-medium">
                Order Date
              </th>
              <th className="border border-slate-600 px-4 py-3 text-sm font-medium">
                Quantity
              </th>
              <th className="border border-slate-600 px-4 py-3 text-sm font-medium">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order, index) => (
              <tr key={index} className="even:bg-gray-800">
                <td className="border border-slate-700 px-4 py-3 text-sm">
                  {index + 1}
                </td>
                <td className="border border-slate-700 px-4 py-3 text-sm">
                  {order.user.fullName}
                </td>
                <td className="border border-slate-700 px-4 py-3 text-sm">
                  {order.product.productName.length > 20
                    ? `${order.product.productName.slice(0, 20)}...`
                    : order.product.productName}
                </td>
                <td className="border border-slate-700 px-4 py-3 text-sm">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="border border-slate-700 px-4 py-3 text-sm">
                  {order.quantity}
                </td>
                <td className="border border-slate-700 px-4 py-3 text-sm">{`$ ${order.totalPrice}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
