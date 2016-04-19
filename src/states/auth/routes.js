import SignInRoutes from "./SignInView/routes";
import SignUpRoutes from "./SignUpView/routes";

export default {
  path: 'auth',

  childRoutes: [
    SignInRoutes,
    SignUpRoutes
  ]
}
