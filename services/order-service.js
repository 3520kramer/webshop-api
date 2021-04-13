const { Op } = require("sequelize");
const DataTypes = require("sequelize").DataTypes;
const sequelize = require('../database/connect').database;
const orderModel = require('../models/orders')(sequelize, DataTypes);

// works with transaction
const createOrder = async (req, res) => {
  console.log("createOrder", req.body);
  let input = req.body;

  console.log("input", input);
  try {
    await sequelize.transaction(async (t) => {
      const order = await orderModel.create({
        order_id: null,
        created: input.created,
        comment: input.comment,
        shipped_date: input.shipped_date,
        customers_customer_id_billing: input.customer_id_billing,
        customers_customer_id_delivery: input.customer_id_delivery,
        shippers_shipper_id: input.shipper_id,
        employees_employee_id: input.employee_id,
        po_boxes_id: input.po_boxes_id,
        warehouses_warehouse_id: input.warehouse_id
      }, { transaction: t });

      console.log("order", order);
      if (order) {
        return res.status(201).json({ order });
      }

    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// works. should perhaps have a try/catch
const getOneOrder = async (req, res) => {
  console.log("getOneOrder", req.query);
  let id = req.query.id;
  orderModel.findOne({ where: { order_id: id } }).then((orderModel) => {
    console.log(orderModel);
    res.send(orderModel);
  });
}

// works with pagination
const getAllOrders = async (req, res) => {
  console.log("getAllOrders", req.query);

  // taking input and parsing to int 
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);

  // initially 0 from the start
  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  // default response size of rows
  let size = 1000;
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 100000) {
    size = sizeAsNumber;
  }

  try {
    const orders = await orderModel.findAndCountAll({
      limit: size,
      offset: page * size
    });

    return res.send({
      total: orders.count,
      content: orders.rows,
      // rounds off the total of pages 
      totalPages: Math.ceil(orders.count / size)
    });

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// works. basically like orders but with search 
const searchOrders = async (req, res) => {
  console.log("searchOrders", req.query);
  const search = req.query.search;
  const id = req.query.id;

  const pageAsNumber = Number.parseInt(req.query.page);

  // default size 
  const size = 1000;

  // initially 0 from the start
  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  try {
    const orders = await orderModel.findAndCountAll({
      where: {
        [search]: {
          [Op.like]: `%${id}%`
        }
      },
      limit: size,
      offset: page * size

    });

    return res.send({
      total: orders.count,
      content: orders.rows,
      // rounds off the total of pages 
      totalPages: Math.ceil(orders.count / size)
    });

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}


module.exports = {
  createOrder,
  getOneOrder,
  getAllOrders,
  searchOrders,
}