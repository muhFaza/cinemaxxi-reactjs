"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Casts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      movieId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Movies",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      profilePict: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Casts");
  },
};
