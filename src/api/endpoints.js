export default {
  get: {
    item: itemId => `/item/single/${itemId}`,
    items: () => "/item",
    servers: () => "/server",
    server: serverId => `/server/single/${serverId}`,
    soldier: soldierId => `/soldier/single/${soldierId}`,
    users: () => "/user/list",
    user: userId => `/user/single/${userId}`
  },
  post: {
    giveItem: () => "/item/give",
    item: () => "/item",
    login: () => "/user/login",
    offer: () => "/offer",
    server: () => "/server",
    soldier: () => "/soldier"
  },
  put: {
    offer: offerId => `/offer/${offerId}`,
    soldier: soldierId => `/soldier/${soldierId}`,
    user: userId => `/user/${userId}`
  },
  delete: {
    item: itemId => `/item/${itemId}`,
    offer: offerId => `/offer/${offerId}`,
    server: serverId => `/server/${serverId}`,
    soldier: soldierId => `/soldier/${soldierId}`
  }
}