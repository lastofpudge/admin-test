const AdminBro = require("admin-bro");
const AdminBroMongoose = require("@admin-bro/mongoose");

AdminBro.registerAdapter(AdminBroMongoose);

const { Items } = require("./Models/items");
const { Users } = require("./Models/users");

const canModifyUsers = ({ currentAdmin }) =>
  currentAdmin && currentAdmin.role === "admin";

const options = {
  resources: [
    {
      resource: Items,
      options: {
        parent: {
          name: false,
          // icon: "fas fa-duotone fa-sparkles",
        },
      },
    },
    {
      resource: Users,
      options: {
        parent: {
          name: false,
          // icon: "fas fa-duotone fa-sparkles",
        },
        properties: {
          encryptedPassword: { isVisible: false },
          password: {
            type: "string",
            isVisible: {
              list: false,
              edit: true,
              filter: false,
              show: false,
            },
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload.record.password) {
                request.payload.record = {
                  ...request.payload.record,
                  encryptedPassword: await bcrypt.hash(
                    request.payload.record.password,
                    10
                  ),
                  password: undefined,
                };
              }
              return request;
            },
          },
          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: canModifyUsers },
          new: { isAccessible: canModifyUsers },
        },
      },
    },
  ],
};

module.exports = options;
