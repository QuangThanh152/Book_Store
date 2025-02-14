const Order = require("./order.model");

// const createAOrder = async (req, res) => {
//   try {
//     const newOrder =  await Order(req.body);
//     const savedOrder = await newOrder.save();
//     res.status(200).json(savedOrder);
//   } catch (error) {
//     console.error("Error creating order", error);
//     res.status(500).json({ message: "Failed to create order" });
//   }
// };
const createAOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      ...req.body,
      status: 'pending'  // Thêm trạng thái mặc định là "pending"
    });
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};


const getOrderByEmail = async (req, res) => {
  try {
    const {email} = req.params;
    const orders = await Order.find({email}).sort({createdAt: -1});
    // if(!orders) {
    //   return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    // }
    if (orders.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
}

module.exports = {
  createAOrder,
  getOrderByEmail
};