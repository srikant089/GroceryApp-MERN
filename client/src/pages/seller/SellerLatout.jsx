import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { Link, NavLink, Outlet } from 'react-router-dom';
import { assets } from '../../assets/assets';

const SellerLatout = () => {
  const { isSeller, setIsSeller, navigate} = useContext(AppContext)
  const dashboardicon = (
    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z" />
    </svg>
  );

  

  const sidebarLinks = [
      { name: "Dashboard", path: "/seller", icon: assets.dashboard_icon },
      { name: "Add Product", path: "/seller/add-product", icon: assets.add_icon },
      { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon  },
      { name: "Orders", path: "/seller/orders", icon: assets.order_icon},
  ];

  return (
    <>
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
          <Link to='/seller'>
              {/* <img className="h-9" src={assets.logo} alt="logo" /> */}
              <h1 className="text-2xl font-bold text-orange-600">Grocery APP</h1>
          </Link>
          <div className="flex items-center gap-5 text-gray-500">
              <p>Hi! Admin</p>
              <button 
                onClick={()=>{
                  setIsSeller(false)
                  navigate('/seller')
                }}
                className='border rounded-full text-sm px-4 py-1'
              >Logout</button>
          </div>
      </div>
      <div className="flex">
        <div className="md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
          {sidebarLinks.map((item) => (
            <NavLink 
              to={item.path}
              key={item.name}
              end={item.path ==="/seller"}
              className={({isActive}) =>`flex items-center py-3 px-4gap-3 ${
                isActive 
                ? "border-r-4 md:border-r-[6px] bg-indigo-500 border-indigo-500 text-white"
                : "hover:bg-gray-100/90 border-white"
              }`}
            >
              <img src={item.icon} alt="" className="w-7 h-7"/>
              <p className="md:block hidden text-center"> {item.name}</p>
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default SellerLatout