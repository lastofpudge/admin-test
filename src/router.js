const AdminJSExpress = require("@adminjs/express");
const bcrypt = require("bcrypt");
const { admin } = require("./admin");
const { User } = require("./Models/user");

const router = AdminJSExpress.buildAuthenticatedRouter(admin, {
  authenticate: async (email, password) => {
    // return true;
    //admin@example.com password
    const user = await User.findOne({ email });
    if (user) {
      const matched = await bcrypt.compare(password, user.encryptedPassword);
      if (matched) {
        return user;
      }
    }
    return false;
  },
  cookiePassword: "pass",
});

module.exports = { router };
