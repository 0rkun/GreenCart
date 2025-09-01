import Order from "../models/Order.js";
import Product from "../models/Product.js";

//place order : /order/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!address || items.length === 0) {
      return res.json({ success: false, message: "invalid data" });
    }
    //calculate
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    //tax (%2)

    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });
    return res.json({ success: true, message: "order successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// get order by user ıd: /api/order/user
export const getUserOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ created: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// get all orders (admin) : /api/orders/seller

export const getAllOrders = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ created: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
