const getDatabase = require('../../database/connection-mysql').getDatabase;
const getModels = require('../../database/connection-mysql').getModels;
const { Op } = require("sequelize");


// works - user sends to own address
const createOrderForUserToOwnAddress = async (newOrder, productsList, user_id) => {
  console.log("createOrderForUserToOwnAddress", { newOrder, productsList, user_id });

  try {
    const result = await getDatabase().transaction(async (t) => {

      const customer = await getModels().customers.findOne({ where: { users_user_id: user_id, is_user_profile: true } });
      if (!customer) throw new Error("Error finding user");
      let newCustomer = customer.dataValues;

      // set the values for the new customer data for that specific order
      newCustomer.customer_id = null;
      newCustomer.is_user_profile = false;

      const createdCustomer = await getModels().customers.create(newCustomer, { transaction: t });
      if (!createdCustomer) throw new Error("Error creating customer");

      // sets the newly created customer id to the orders customer billing id and delivery 
      // also sets the date to todays date
      newOrder.customers_customer_id_billing = createdCustomer.customer_id;
      newOrder.customers_customer_id_delivery = createdCustomer.customer_id;
      newOrder.created = new Date().toISOString();

      const createdOrderProduct = createOrderAndProducts(productsList, newOrder, t);
      return createdOrderProduct;
    });

    const orderOverView = await getOrderOverView(result[0].orders_order_id);
    return { order_overview: orderOverView.orderOverView, total: orderOverView.total };

  } catch (error) {
    return { error: error.message };
  }
}


// works - customer (no user) sends to PO box
const createOrderForCustomerToPO = async (newOrder, productsList, newCustomer) => {
  console.log("createOrderForCustomerToPO", { newOrder, productsList, newCustomer });

  try {
    const result = await getDatabase().transaction(async (t) => {
      const createdCustomer = await getModels().customers.create(newCustomer, { transaction: t });
      if (!createdCustomer) throw new Error("Error creating customer");

      newOrder.customers_customer_id_billing = createdCustomer.customer_id;
      newOrder.created = new Date().toISOString();

      const createdOrderProduct = createOrderAndProducts(productsList, newOrder, t);
      return createdOrderProduct;
    });

    const orderOverView = await getOrderOverView(result[0].orders_order_id);
    console.log("orderOverView", orderOverView);
    return { order_overview: orderOverView.orderOverView, total: orderOverView.total };

  } catch (error) {
    return { error: error.message };
  }
}


// handels creating the order, product. Return order_product
const createOrderAndProducts = async (productsList, newOrder, t) => {

  // sets order_status to not processed
  newOrder.order_status = "NOT PROCESSED";

  const createdOrder = await getModels().orders.create(newOrder, { transaction: t });
  if (!createdOrder) throw new Error("Error creating order");

  // gets the product_id from productsList
  let productIds = productsList.map(product => { return { product_id: product.product_id } });

  // find price on product. gets id from productList
  const productPrice = await getModels().products.findAll({
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
  const createdOrderProduct = await getModels().order_product.bulkCreate(orderProducts, { transaction: t });
  if (!createdOrderProduct) throw new Error("Error creating order product");

  return createdOrderProduct;

}


// works - gets the returned order with the product bought and a total 
const getOrderOverView = async (orderId) => {
  console.log("orderId", orderId);
  try {
    const orderOverView = await getModels().orders.findAll({
      where: { order_id: orderId },
      required: true,
      include: [{
        model: getModels().customers,
        as: "customers_customer_id_billing_customer",
        required: true
      },
      {
        model: getModels().shippers,
        as: "shippers_shipper",
        required: true
      },
      {
        model: getModels().order_product,
        as: "order_products",
        required: true,
        include: [{
          model: getModels().products,
          as: "products_product",
          required: true,
        }]
      }]
    });

    let total = 0;
    // this calulates the total price of all the products bought
    orderOverView[0].order_products.forEach(product => total += product.price * product.quantity);

    return { orderOverView: orderOverView, total: total };

  } catch (error) {
    return { error: error.message };
  }
}


// works. 
const getOneOrder = async (orderId) => {
  console.log("getOneOrder", orderId);
  try {
    const order = await getModels().orders.findOne({ where: { order_id: orderId } });
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
    const orders = await getModels().orders.findAndCountAll({
      limit: defaultSize,
      offset: defaultPage * defaultSize
    });

    return {
      onPage: defaultPage,
      // rounds off the total of pages 
      totalPages: Math.ceil(orders.count / defaultSize),
      totalEntries: orders.count,
      content: orders.rows
    };

  } catch (error) {
    return { error: error.message };
  }
}


// works. basically like orders but with search 
const ordersSearch = async (key, value, page) => {
  console.log("ordersSearch", { key, value, page });

  // makes sure page is a number
  const pageAsNumber = Number.parseInt(page);

  // default size 
  let defaultSize = 100;

  // initially 0 from the start
  let defaultPage = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    defaultPage = pageAsNumber;
  }

  try {
    const orders = await getModels().orders.findAndCountAll({
      where: { [key]: { [Op.like]: `%${value}%` } },
      limit: defaultSize,
      offset: defaultPage * defaultSize
    });
    console.log("orders", orders);
    return {
      onPage: defaultPage,
      // rounds off the total of pages 
      totalPages: Math.ceil(orders.count / defaultSize),
      totalEntries: orders.count,
      content: orders.rows
    };

  } catch (error) {
    return { error: error.message };
  }
}

// gets a overview of a certain users orders 
const getUsersOrders = async (user_id) => {  
  try {
    const results = await getModels().customers.findAll({
      where: { users_user_id: user_id, is_user_profile: false },
      include: [{
        model: getModels().orders,
        as: "orders", // refers to the customer_id --> customers_customer_id_billing relation between customer and order table
        required: true,
      }]
    });

    if (!results) throw new Error("No results");

    // Because we are calling an async function in a forloop we will only return promiss which we will resolve below
    const promisesOfOrders = results.map(async result => {
      let promise = await getOrderOverView(result.orders[0].order_id);
      return promise;
    });

    // Resolve all the promises from the for loop
    const orders = await Promise.all(promisesOfOrders);

    if (!orders) throw new Error("Error resolving promises");

    return orders;

  } catch (error) {
    return { error: error.message };
  }
}


module.exports = {
  createOrderForUserToOwnAddress,
  createOrderForCustomerToPO,
  getOneOrder,
  getAllOrders,
  ordersSearch,
  getUsersOrders,
}