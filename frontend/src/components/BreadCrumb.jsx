import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav className=" rounded mb-4">
      <ol className="list-reset flex text-gray-700">
        <li>
          <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return (
            <li key={to} className="flex items-center">
              <span className="mx-2">/</span>
              {index === pathnames.length - 1 ? (
                <span className="text-gray-500 capitalize">{value}</span>
              ) : (
                <Link to={to} className="text-blue-600 hover:text-blue-800 capitalize">
                  {value}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
