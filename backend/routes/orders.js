import express from "express"
import Order from "../models/Order.js"
import Product from "../models/Product.js"
import CartItem from "../models/CartItem.js"
import { protect, adminOnly } from "../middleware/auth.js"
import { asyncHandler } from "../middleware/error.js"
import { runQuery } from "../utils/query.js"

const router = express.Router()

// GET /api/orders  (admin sees all; customer sees own)
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    if (req.user.role !== "admin") {
      req.query.customer_email = req.user.email
    }
    const orders = await runQuery(Order, req.query)
    res.json(orders)
  })
)

// POST /api/orders
// Creates the order, updates product analytics, and clears the user's cart.
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const { items = [], total, shipping_address } = req.body
    if (!items.length) return res.status(400).json({ error: "Order has no items" })

    let carbon_saved_total = 0

    const order = await Order.create({
      customer_email: req.user.email,
      customer_name: req.user.full_name,
      items,
      total,
      shipping_address,
      status: "pending",
    })

    // Update product analytics
    for (const item of items) {
      const product = await Product.findById(item.product_id)
      if (product) {
        product.orders_count += item.quantity
        product.revenue += item.price * item.quantity
        carbon_saved_total += (product.carbon_saved_kg || 0) * item.quantity
        await product.save()
      }
    }

    order.carbon_saved_total = carbon_saved_total
    await order.save()

    // Award reward points: 1 point per currency unit spent + a green bonus
    // of 5 points for every kg of CO2 saved by this order.
    const pointsEarned = Math.round(total || 0) + Math.round(carbon_saved_total * 5)
    req.user.reward_points = (req.user.reward_points || 0) + pointsEarned
    await req.user.save()

    // Clear cart
    await CartItem.deleteMany({ user_email: req.user.email })

    const result = order.toJSON()
    result.points_earned = pointsEarned
    result.reward_points = req.user.reward_points
    res.status(201).json(result)
  })
)

// PATCH /api/orders/:id  (admin can update status)
router.patch(
  "/:id",
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!order) return res.status(404).json({ error: "Order not found" })
    res.json(order)
  })
)

export default router
