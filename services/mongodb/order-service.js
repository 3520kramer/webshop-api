const Order = require('../../models/mongodb/orders');

// works - user sends to own address
const createOrderForUserToOwnAddress = async (newOrder) => {
  console.log("createOrderForUserToOwnAddress", {newOrder});

  try {
    // take the current date/time and sets timestamp
    newProduct.timestamp = new Date().toISOString();

    const product = await new Order(newProduct).save();
    console.log("product", product);

    if (!product) throw new Error("Error finding product");
    return product;
    //return { order_overview: orderOverView.orderOverView, total: orderOverView.total };

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

    const orders = await Order.find({}).skip(defaultPage * defaultSize).limit(defaultSize);
    
    /*
     * Estimates the number of documents in the collection. 
     * estimatedDocumentCount() is faster than using countDocuments(), because it 
     * uses collection metadata rather than scanning the entire collection
     */
    const ordersCount = await Order.estimatedDocumentCount();

    return {
      onPage: defaultPage,
      // rounds off the total of pages 
      totalPages: Math.ceil(ordersCount / defaultSize),
      totalEntries: ordersCount,
      content: orders
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
    const orders = await Order.find({});
    const ordersCount = await Order.estimatedDocumentCount();

    return {
      onPage: defaultPage,
      // rounds off the total of pages 
      totalPages: Math.ceil(ordersCount / defaultSize),
      totalEntries: ordersCount,
      content: orders
    };

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
  //createOrderForCustomerToPO,
  getOneOrder,
  getAllOrders,
  ordersSearch,
  getUsersOrders,
}



/*
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



*/