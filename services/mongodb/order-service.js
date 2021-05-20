const Order = require('../../models/mongodb/orders');

// works - user sends to own address
const createOrderForUserToOwnAddress = async (newOrder, productsList, user_id) => {
  console.log("createOrderForUserToOwnAddress", { newOrder, productsList, user_id });

  try {

    //return { order_overview: orderOverView.orderOverView, total: orderOverView.total };

  } catch (error) {
    return { error: error.message };
  }
}


// works - customer (no user) sends to PO box
const createOrderForCustomerToPO = async (newOrder, productsList, newCustomer) => {
  console.log("createOrderForCustomerToPO", { newOrder, productsList, newCustomer });

  try {
    
    //return { order_overview: orderOverView.orderOverView, total: orderOverView.total };

  } catch (error) {
    return { error: error.message };
  }
}


// handels creating the order, product. Return order_product
const createOrderAndProducts = async (productsList, newOrder, t) => {

  try {
      // sets order_status to not processed
      newOrder.order_status = "NOT PROCESSED";

      //return createdOrderProduct;
  } catch (error) {
    return { error: error.message };
  }
}


// works - gets the returned order with the product bought and a total 
const getOrderOverView = async (orderId) => {
  console.log("orderId", orderId);
  try {
    
    //return { orderOverView: orderOverView, total: total };

  } catch (error) {
    return { error: error.message };
  }
}


// works. 
const getOneOrder = async (orderId) => {
  console.log("getOneOrder", orderId);
  try {
    const order = await Order.findById(orderId);
    
    if (!order) throw new Error("No order");

    console.log("order", order);

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
    
    // return {
    //   onPage: defaultPage,
    //   // rounds off the total of pages 
    //   totalPages: Math.ceil(orders.count / defaultSize),
    //   totalEntries: orders.count,
    //   content: orders.rows
    // };

  } catch (error) {
    return { error: error.message };
  }
}

// gets a overview of a certain users orders 
const getUsersOrders = async (user_id) => {  
  try {


    //return orders;

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