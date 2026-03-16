export const reportsController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      return h.view("report", { title: "Create a Report", user: loggedInUser });
    },
  },
};