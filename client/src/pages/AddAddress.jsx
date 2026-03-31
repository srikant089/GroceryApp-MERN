import React, { useState } from 'react'
import { assets } from '../assets/assets';


const AddAddress = () => {
    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zip:"",
        country:"",
        phone:"",
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.value]:e.target.value});
    };

    const submitHandler = async(e) => {
        e.preventDefault();
        console.log("formData", formData);
    }

    return (
        <div className="mt-12 flex flex-col md:flex-row gap-6p-6 bg-gray-100 rounded-lg shadow-md">
            {/* left side Address field*/}
            <div className="flex-1 bg-white p-6 rouded-lg shadow">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Address Details
                </h2>
                <form
                    onSubmit={submitHandler}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <div>
                        <lable className="block text-gray-600">First Name</lable>
                        <input 
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <lable className="block text-gray-600">Last Name</lable>
                        <input 
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="col-span-2">
                        <lable className="block text-gray-600">Email</lable>
                        <input 
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="col-span-2">
                        <lable className="block text-gray-600">Phone</lable>
                        <input 
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="col-span-2">
                        <lable className="block text-gray-600">Flat/Street</lable>
                        <input 
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="col-span-2">
                        <lable className="block text-gray-600">City</lable>
                        <input 
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="col-span-2">
                        <lable className="block text-gray-600">State</lable>
                        <input 
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="col-span-2">
                        <lable className="block text-gray-600">Zip Code</lable>
                        <input 
                            type="text"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="col-span-2">
                        <lable className="block text-gray-600">Country</lable>
                        <input 
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="col-span-2">
                        <button
                            type="submit"
                            className="w-full  bg-primary hover:bg-indigo-700 text-white rounded-md"
                        >
                            Save Address
                        </button>
                    </div>
                </form>
            </div>
            {/* right side logo/image*/}
            <div className="flex-1 flex items-center justify-center">
                <img
                    src={assets.add_address_iamge}
                    alt="address"
                    className="w-full max-w-xs rounded-lg shadow-md"
                />
            </div>
        </div>
    )
}

export default AddAddress