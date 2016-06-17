import SignInRoutes from "./SignInView/routes";
import SignUpRoutes from "./SignUpView/routes";
import RecoveryRoutes from "./recovery/routes"

export default {
  path: 'auth',

  childRoutes: [
    SignInRoutes,
    SignUpRoutes,
    RecoveryRoutes
  ]
}
