<<<<<<< HEAD
export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret"
    }
  },
  places: {
    _model: "Place",
    howth: {
      title: "Bray Harbour ",
      userid: "->users.bart"
    }
  },
  banks: {
    _model : "Bank",
    bank_1 : {
      title: "Starling",
      other: "many in flight",
      placeid: "->places.howth"
    },
  }
};

=======
export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret"
    }
  },
  places: {
    _model: "Place",
    howth: {
      title: "Bray Harbour ",
      userid: "->users.bart"
    }
  },
  banks: {
    _model : "Bank",
    bank_1 : {
      title: "Starling",
      other: "many in flight",
      placeid: "->places.howth"
    },
  }
};

>>>>>>> 9eb855dcce3925702cc09dcdc94d360e637093b8
  