import { useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from "react-hot-toast";

import { AppContext } from './context/AppContext';
import Auth from './models/Auth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SellerLogin from './components/seller/SellerLogin';

import AddAddress from './pages/AddAddress';
import Cart from './pages/Cart';
import Home from './pages/Home';
import MyOrders from './pages/MyOrders';
import NotFound from './pages/NotFound';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import ProductCategory from './pages/ProductCategory';

import SellerLayout from './pages/seller/SellerLatout';
import AddProduct from './pages/seller/AddProduct';
import Orders from './pages/seller/Orders';
import ProductList from './pages/seller/ProductList';
import Dashboard from './pages/seller/Dashboard';



function App() {
  const { isSeller, showUserLogin } = useContext(AppContext);
  const isSellerPath = useLocation().pathname.includes("seller")

  return (
    <>
      <div className="text-default min-h-screen">

        {/* Navbar Section */}
        {isSeller ? null : <Navbar /> }
        {showUserLogin ? <Auth /> : null }

        {/* show toaster */}
        <Toaster />

        <div className="px-6 md:px-16 lg:px-24 xl:px-32">
          <Routes>
            {/* User Routes */}
            <Route path='*' element={<NotFound />} />
            <Route path='/' element={<Home />} />            
            <Route path='/products' element={<Products />} />
            <Route path='/products/:category' element={<ProductCategory />} />
            <Route path='/product/:category/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/my-orders' element={<MyOrders />} />
            <Route path='/add-address' element={< AddAddress />} />

            {/* Seller Routes */}
            <Route path='/seller' element={isSeller ? <SellerLayout />: < SellerLogin/>} >
              <Route index element={<Dashboard />} />
              <Route path='add-product' element={<AddProduct />} />
              <Route path='product-list' element={<ProductList />} />
              <Route path='orders' element={<Orders />} />
            </Route>

            {/* Admin Routes */}
          </Routes>
        </div>

        {/* Footer Section */}
        {isSellerPath ? null : <Footer /> }
      </div>
    </>
  )
}

export default App
