import configs from "../configs";
import pages from "../pages";
const privateRoute = [
  {
    path: configs.routes.home,
    component: pages.Home,
  },
  {
    path: configs.routes.profile,
    component: pages.Profile,
  },
  {
    path: configs.routes.inbox,
    component: pages.Inbox,
  },
];
const publicRoute = [
  {
    path: configs.routes.login,
    component: pages.Login,
    layout: null,
  },

  {
    path: configs.routes.register,
    component: pages.Register,
    layout: null,
  },
];
export { publicRoute, privateRoute };
