export const selectIngredients = (store) => store.ingredients;
export const selectIngredientDetails = (store) => store.ingredientDetails;
export const selectStore = (store) => store;
export const selectOrders = (store) => store.ws?.data?.orders;
export const selectOrdersTotal = (store) => store.ws?.data?.total;
export const selectOrdersTotalToday = (store) => store.ws?.data?.totalToday;
export const selectWsConnectionStatus = (store) => store.ws?.wsConnected;
