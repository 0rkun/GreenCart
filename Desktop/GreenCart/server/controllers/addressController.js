// add address : /api/address/add
// addAddress controller
import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const data = req.body; // artık doğrudan address objesi
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }

    await Address.create({ ...data, userId: req.user._id });

    return res.json({ success: true, message: "Address added successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// get address: /api/address/get

export const getAddress = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user._id });
    return res.json({ success: true, addresses });
  } catch (error) {
    console.log(error.message);
    return res.json({ succes: false, message: error.message });
  }
};
