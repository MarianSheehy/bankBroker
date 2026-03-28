export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
    },
  },
  banks: {
    _model: "Bank",
    one: {
      institutionName: "Bank of Ireland",
    },
    two: {
      institutionName: "AIB",
    },
    three: {
      institutionName: "PTSB",
    },
  },
  reports: {
    _model: "Report",
    one: {
      monthRange: 6,
      from: "01/08/25",
      to: "31/01/26",
      bank: "->banks.one",
    },
    two: {
      monthRange: 9,
      from: "01/05/25",
      to: "31/01/26",
      bank: "->banks.two",
    },
    three: {
      monthRange: 12,
      from: "01/02/25",
      to: "31/01/26",
      bank: "->banks.three",
    },
  },
};
