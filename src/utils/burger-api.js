export const baseApiUrl = 'https://norma.nomoreparties.space/api';

export const checkResponse = (res) => {
  return res.ok ?
    res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = () => {
  return fetch(`${baseApiUrl}/ingredients`).then(checkResponse);
}

export const sendOrder = async (order) => {
  const orderData = { ingredients: order.map(item => item._id) };
  return fetch(`${baseApiUrl}/orders`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify(orderData)
  }).then(checkResponse);
}
