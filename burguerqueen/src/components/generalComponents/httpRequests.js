import axios from "axios";

const api = 'https://6376d05f81a568fc25067c85.mockapi.io/api/bq6/';
// también se puede hacer con una función

export const createOrder = (order) => {
   return axios.post(`${api}orders`, order)
    .then(function (response) {
      console.log(response);
      return { status: response.status }
    })
    .catch(function (error) {
      console.log(error);
      return { status: error.response.status}
    });
}

export const getPendingOrders = () => {
  return axios.get(`${api}orders?status=pending`)
  .then(function (response) {
    console.log(response);
    return response
  })
  .catch(function (error) {
    console.log(error);
    return error
  });
};

export const updateOrderStatus = (id) => {
 // console.log(order)
  return axios.put(`${api}orders/${id}`, {status: 'delivering'})
    .then(function (response) {
      console.log(response);
      return response
    })
    .catch(function (error) {
      console.log(error);
      return error
    });
}