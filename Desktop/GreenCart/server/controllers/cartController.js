import User from "../models/User.js";

// update user cartData : /api/cart/update

export const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }

    await User.findByIdAndUpdate(req.user._id, { cartItems });
    return res.json({ success: true, message: "Cart upload" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
