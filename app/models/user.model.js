module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
      },
    cnic: {
      type: Sequelize.STRING
      },
    password: {
        type: Sequelize.STRING
      },
    confirmpassword: {
        type: Sequelize.STRING
      },
  });

  return User;
};
