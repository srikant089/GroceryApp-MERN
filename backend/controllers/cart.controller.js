import User from "../models/user.model.js";
import Product from "../models/product.model.js";


export const getUserCart = async (req, res) => {
    try {
        // Retrieve uder Id form JWT token
        // find the cart for the user
        let user = await User.findById(req.user.userId);
        const products = await Product.find({ _id: { $in: user.cartItems} });

		// add quantity for each product
		const cartItems = products.map((product) => {
			const item = user.cartItems.find((cartItem) => cartItem.id === product.id);
            return { ...product.toJSON(), quantity: item.quantity };
		});
        
        req.user.cartItems =  cartItems;
		res.status(200).json({
                message: "Cart listing successfully",
                success: true, 
                cartItems,
            });

	} catch (error) {
		console.log("Error in getCartProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const addToCart = async (req, res) => {
	try {
        const { productId } = req.body;
        // find the cart for the user
        let user = await User.findById(req.user.userId);
        const existingItem = user.cartItems.find((cartItem) => cartItem.id === productId);
		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			user.cartItems.push(productId);
		}

		req.user.cartItems = user.cartItems;
		
        await user.save();
		res.status(200).json({
                message: "Cart added successfully",
                success: true, 
                cartItems: user.cartItems,
            });
	} catch (error) {
		console.log("Error in addToCart controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// update user cartData: api/cart/update
export const updateCart = async(req, res) => {
    try {
        
        // Retrieve uder Id form JWT token
        let user = await User.findById(req.user.userId);        
        const { id: productId } = req.params;
		const { quantity } = req.body;

		const existingItem = user.cartItems.find((item) => item.id === productId);
		if (existingItem) {
			existingItem.quantity = quantity;
            req.user.cartItems = existingItem;

			await user.save();
			res.status(200).json({
                message: "Cart update successfully",
                success: true, 
                cartItems : user.cartItems,
            });
		} else {
			res.status(404).json({ message: "Product not found",success: false, });
		}

    } catch (error) {
        console.log('Error in updateCart', error);
        res
        .status(500)
        .json({ 
            message: 'Internal Server Error',
            success: false
        });        
    }
}

export const  removeItemFromCart = async(req, res) => {
    
    try {
        
        const { cartItemId } = req.body;
        // Retrieve uder Id form JWT token
        let user = await User.findById(req.user.userId);

        // remove the item from the cart
        user.cartItems = user.cartItems.filter((item) => item.id !== cartItemId);
        req.user.cartItems = user.cartItems;
        await user.save();

        return res
            .status(200)
            .json({
                message: "Cart update successfully",
                success: true,
                cartItems: user.cartItems             
            });
    } catch (error) {
        throw new Error(`Failed to removeItemFromCart: ${error.message}`);            
        
    }
}
