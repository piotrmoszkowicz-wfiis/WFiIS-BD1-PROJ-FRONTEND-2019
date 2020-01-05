import axiosWrapper from "@/api/axiosWrapper";
import endpoints from "@/api/endpoints";

/**
 * Item module
 */

export const addItem = payload => {
  return axiosWrapper.post(endpoints.post.item(), payload);
};

export const deleteItem = itemId => {
  return axiosWrapper.delete(endpoints.delete.item(itemId));
};

export const giveItem = payload => {
  return axiosWrapper.post(endpoints.post.giveItem(), payload);
};

export const getItems = () => {
  return axiosWrapper.get(endpoints.get.items());
};

export const getItem = itemId => {
  return axiosWrapper.get(endpoints.get.item(itemId));
};

/**
 * Offer module
 */

export const addOffer = payload => {
  return axiosWrapper.post(endpoints.post.offer(), payload);
};

export const deleteOffer = offerId => {
  return axiosWrapper.delete(endpoints.delete.offer(offerId));
};

export const updateOffer = (offerId, payload) => {
  return axiosWrapper.put(endpoints.put.offer(offerId), payload);
};

/**
 * Server module
 */

export const addServer = payload => {
  return axiosWrapper.post(endpoints.post.server(), payload);
};

export const deleteServer = serverId => {
  return axiosWrapper.delete(endpoints.delete.server(serverId));
};

export const getServers = () => {
  return axiosWrapper.get(endpoints.get.servers());
};

export const getServer = serverId => {
  return axiosWrapper.get(endpoints.get.server(serverId));
};

/**
 * Soldier module
 */

export const addSoldier = payload => {
  return axiosWrapper.post(endpoints.post.soldier(), payload);
};

export const deleteSoldier = soldierId => {
  return axiosWrapper.delete(endpoints.delete.soldier(soldierId));
};

export const getSoldier = soldierId => {
  return axiosWrapper.get(endpoints.get.soldier(soldierId));
};

export const updateSolider = (soldierId, payload) => {
  return axiosWrapper.put(endpoints.put.soldier(soldierId), payload);
};

/**
 * User module
 */

export const getUsers = () => {
  return axiosWrapper.get(endpoints.get.users());
};

export const getUser = userId => {
  return axiosWrapper.get(endpoints.get.user(userId));
};

export const postLogin = (email, password) => {
  return axiosWrapper.post(endpoints.post.login(), {
    email,
    password
  });
};

export const updateUser = (userId, payload) => {
  return axiosWrapper.put(endpoints.put.user(userId), payload);
};
