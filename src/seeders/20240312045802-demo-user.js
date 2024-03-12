"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "John Doe",
          password: "123456",
          email: "Jonh@gmail.com",
        },
        {
          username: "John1 Doe",
          password: "123456",
          email: "Jonh2@gmail.com",
        },
        {
          username: "John2 Doe",
          password: "123456",
          email: "Jonh@gmail.com",
        },
        {
          username: "John3 Doe",
          password: "123456",
          email: "Jonh3@gmail.com",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
