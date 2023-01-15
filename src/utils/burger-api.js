const baseApiUrl = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
  return res.ok ?
    res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = () => {
  return fetch(`${baseApiUrl}/ingredients`).then(checkResponse);
}
