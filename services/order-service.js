const sequelize = require('../database/connect').database;
const model = require('../database/connect').models;
const { Op } = require("sequelize");



// works - user sends to own address
const createOrderForUserToOwnAddress = async (newOrder, productsList, user_id) => {
  console.log("createOrder", { newOrder, productsList, user_id });

  try {
    let result = await sequelize.transaction(async (t) => {

      const customer = await model.customers.findOne({ where: { users_user_id: user_id, is_user_profile: true } });
      if (!customer) throw new Error("Error finding user");
      let newCustomer = customer.dataValues;

      // set the values for the new customer data for that specific order
      newCustomer.customer_id = null;
      newCustomer.is_user_profile = false;

      const createdCustomer = await model.customers.create(newCustomer, { transaction: t });
      if (!createdCustomer) throw new Error("Error creating customer");

      // sets the newly created customer id to the orders customer billing id and delivery 
      // also sets the date to todays date
      newOrder.customers_customer_id_billing = createdCustomer.customer_id;
      newOrder.customers_customer_id_delivery = createdCustomer.customer_id;
      newOrder.created = new Date().toISOString();

      const createdOrder = await model.orders.create(newOrder, { transaction: t });
      if (!createdOrder) throw new Error("Error creating order");

      // gets the product_id from productsList
      let productIds = productsList.map(product => { return { product_id: product.product_id } });

      // find price on product. gets id from productList
      const productPrice = await model.products.findAll({
        where: { [Op.or]: productIds },
        attributes: ["price", "product_id"]
      },
        { transaction: t });

      let prices = {};
      productPrice.forEach(product => prices[product.product_id] = product.price);

      let orderProducts = productsList.map(product => {
        return {
          quantity: product.quantity,
          price: prices[product.product_id],
          products_product_id: product.product_id,
          orders_order_id: createdOrder.order_id
        }
      });

      // adds a orderProduct object to the order_product table for each orderProducts added
      const createdOrderProduct = await model.order_product.bulkCreate(orderProducts, { transaction: t });
      if (!createdOrderProduct) throw new Error("Error creating order product");

      return createdOrderProduct;
    })
    console.log("result[0].orders_order_id", result[0].orders_order_id);
    const orderOverView = await getOrderOverView(result[0].orders_order_id);
    console.log("orderOverView", orderOverView);

    return { order_overview: orderOverView.orderOverView, total: orderOverView.total };

  } catch (error) {
    return { error: error.message };
  }
}


const getOrderOverView = async (orderId) => {
  console.log("orderId", orderId);
  try {
    const orderOverView = await model.orders.findAll({
      where: { order_id: orderId },
      required: true,
      include: [{
        model: model.customers,
        as: "customers_customer_id_billing_customer",
        required: true
      },
      {
        model: model.shippers,
        as: "shippers_shipper",
        required: true
      },
      {
        model: model.order_product,
        as: "order_products",
        required: true,
        include: [{
          model: model.products,
          as: "products_product",
          required: true,
        }]
      }]
    });

    let total = 0;
    orderOverView[0].order_products.forEach(product => total += product.price * product.quantity);
 
    return {orderOverView: orderOverView, total: total};

  } catch (error) {
      return { error: error.message };
  }
}



// works. 
const getOneOrder = async (id) => {
  console.log("getOneOrder", id);
  try {
    const order = await model.orders.findOne({ where: { order_id: id } });
    return order;
  } catch (error) {
    return { error: error.message };
  }
}


// works with pagination
const getAllOrders = async (page, size) => {
  console.log("getAllOrders", { page, size });

  // taking input and parsing to int 
  const pageAsNumber = Number.parseInt(page);
  const sizeAsNumber = Number.parseInt(size);

  // initially 0 from the start
  let defaultPage = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    defaultPage = pageAsNumber;
  }

  // default response size of rows
  let defaultSize = 1000;
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 100000) {
    defaultSize = sizeAsNumber;
  }

  try {
    const orders = await model.orders.findAndCountAll({
      limit: defaultSize,
      offset: defaultPage * defaultSize
    });

    return {
      total: orders.count,
      // rounds off the total of pages 
      totalPages: Math.ceil(orders.count / defaultSize),
      content: orders.rows
    };

  } catch (error) {
    return { error: error.message };
  }
}


// works. basically like orders but with search 
const ordersSearch = async (id, page, search) => {
  console.log("ordersSearch", { id, page, search });

  // makes sure page is a number
  const pageAsNumber = Number.parseInt(page);

  // default size 
  let defaultSize = 1000;

  // initially 0 from the start
  let defaultPage = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    defaultPage = pageAsNumber;
  }

  try {
    const orders = await model.orders.findAndCountAll({
      where: { [search]: { [Op.like]: `%${id}%` } },
      limit: defaultSize,
      offset: defaultPage * defaultSize
    });

    return {
      total: orders.count,
      // rounds off the total of pages 
      totalPages: Math.ceil(orders.count / defaultSize),
      content: orders.rows,
    };

  } catch (error) {
    return { error: error.message };
  }
}


module.exports = {
  createOrderForUserToOwnAddress,
  getOneOrder,
  getAllOrders,
  ordersSearch,
}