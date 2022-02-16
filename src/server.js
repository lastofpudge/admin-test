const express = require("express");
const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const options = require("./admin.options");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

const run = async () => {
  await mongoose.connect("mongodb://localhost:27017/db1", {});

  const adminBro = new AdminBro(options);

  const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
      const user = await User.findOne({ email });
      if (user) {
        if (password === user.encryptedPassword) {
          return user;
        }
      }
      return false;
    },
    cookiePassword: "session Key",
  });

  app.use(adminBro, router);
  app.listen(port, () => console.log(`http://localhost:${port}`));
};

module.exports = run;
