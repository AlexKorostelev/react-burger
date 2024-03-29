import { IIngredient } from '../pages/IngredientPage/IngredientPage';
import { getCookie } from './cookie';

interface IIngredientsResponse {
  data: IIngredient[];
}

export const baseApiUrl = 'https://norma.nomoreparties.space/api';
export const wssBaseApiUrl = 'wss://norma.nomoreparties.space/orders';

export const checkResponse = <T>(res: {
  json: () => Promise<T>;
  ok: boolean;
}): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = (): Promise<IIngredientsResponse> => {
  return fetch(`${baseApiUrl}/ingredients`).then(
    checkResponse<IIngredientsResponse>
  );
};

export const sendOrder = async (order: IIngredient[]) => {
  const orderData = { ingredients: order.map((item) => item._id) };

  return fetch(`${baseApiUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: getCookie('accessToken') || '',
    },
    body: JSON.stringify(orderData),
  }).then(checkResponse);
};
