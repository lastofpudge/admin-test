const AdminBro = require("admin-bro");
const AdminBroMongoose = require("@admin-bro/mongoose");

AdminBro.registerAdapter(AdminBroMongoose);

const { Items } = require("./items/items.entity");

const options = {
  resources: [
    {
      resource: Items,
      options: {
        parent: {
          name: "Admin",
          // icon: "fas fa-duotone fa-sparkles",
        },
      },
    },
  ],
};

module.exports = options;
