import App from './app';
import AuthenticationController from './authentication/authentication.controller';
import UserController from './users/user.controller';
const app = new App(
  [
    new AuthenticationController(),
    new UserController(),
  ],
  5000,
);
 
app.listen();