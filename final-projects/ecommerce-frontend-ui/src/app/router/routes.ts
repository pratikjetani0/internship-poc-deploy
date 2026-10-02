export const ROUTES = {
  HOME: "/",

  LOGIN: "/login",

  REGISTER: "/register",

  DASHBOARD: "/dashboard",

  PRODUCTS: "/products",

  PRODUCT_CREATE: "/products/create",

  PRODUCT_EDIT: "/products/:id/edit",

  PRODUCT_DETAILS: "/products/:slug",

  CART: "/cart",

  CHECKOUT: "/checkout",

  USERS: "/users",

  ORDERS: "/orders",

  PAYMENTS: "/payments",

  NOTIFICATIONS: "/notifications",

  PROFILE: "/profile",
} as const;

export const ROUTE_META = {
  [ROUTES.DASHBOARD]: {
    title: "Dashboard",
  },

  [ROUTES.PRODUCTS]: {
    title: "Products",
  },

  [ROUTES.PRODUCT_CREATE]: {
    title: "Create Product",
  },

  [ROUTES.PRODUCT_EDIT]: {
    title: "Edit Product",
  },

  [ROUTES.USERS]: {
    title: "Users",
  },

  [ROUTES.ORDERS]: {
    title: "Orders",
  },

  [ROUTES.PAYMENTS]: {
    title: "Payments",
  },

  [ROUTES.NOTIFICATIONS]: {
    title: "Notifications",
  },

  [ROUTES.PROFILE]: {
    title: "Profile",
  },
} as const;
