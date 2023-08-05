import * as usersDao from "./users-dao.js";

const AuthController = (app) => {
  const register = (req, res) => {
    console.log("Register");
    const username = req.body.username;
    const user = usersDao.findUserByUsername(username);
    if (user) {
      res.sendStatus(409);
      return;
    }
    const newUser = usersDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    console.log("Set session to newly registered user")
    res.json(newUser);
  };

  const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(`Login: ${username}`);
    const user = usersDao.findUserByCredentials(username, password);
    if (user) {
      console.log("Login success")
      req.session["currentUser"] = user;
      console.log("Set session to logged in user")
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  };

  const profile = (req, res) => {
    console.log("Profile");
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    console.log(currentUser)
    res.json(currentUser);
  };

  const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const update = (req, res) => {};
  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/profile", profile);
  app.post("/api/users/logout", logout);
  app.put("/api/users", update);
};
export default AuthController;
