const AdminJS = require("adminjs");
AdminJS.registerAdapter(require("@adminjs/mongoose"));

const { User } = require("./Models/user");

const admin = new AdminJS({
  rootPath: "/admin",
  resources: [
    {
      resource: User,
      options: {
        parent: {
          name: false,
          // icon: "fas fa-duotone fa-sparkles",
        },
        properties: {
          encryptedPassword: {
            isVisible: false,
          },
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
              if (request.payload.password) {
                request.payload = {
                  ...request.payload,
                  encryptedPassword: await bcrypt.hash(
                    request.payload.password,
                    10
                  ),
                  password: undefined,
                };
              }
              return request;
            },
          },
        },
      },
    },
  ],
});

module.exports = { admin };
