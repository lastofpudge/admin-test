const mongoose = require("mongoose");
const express = require("express");
const { router } = require("./router");
const { admin } = require("./admin");
const routes = require("./routes");
const app = express();

app.use(admin.options.rootPath, router);
app.use("/", routes);

(async () => {
  await mongoose.connect("mongodb://localhost:27017/db", {
    useNewUrlParser: true,
  });
  await app.listen(8080, () => console.log(`http://127.0.0.1:8080/admin`));
})();
