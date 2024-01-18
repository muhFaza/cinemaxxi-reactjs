'use strict';

const Helper = require('../helpers');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const user = require('./db.json').users.map((u => {
    delete u.id
    u.createdAt = u.updatedAt = new Date()
    u.password = Helper.hash(u.password)
    return u
   }))

   await queryInterface.bulkInsert('Users', user, {})

   const genre = require('./db.json').genres.map(el => {
    delete el.id
    el.createdAt = el.updatedAt = new Date()
    return el
   })
   await queryInterface.bulkInsert('Genres', genre, {})

   const movie = require('./db.json').movies.map(el => {
    delete el.id
    el.createdAt = el.updatedAt = new Date()
    return el
   })
   await queryInterface.bulkInsert('Movies', movie, {})

   const casts = require('./db.json').casts.map(el => {
    delete el.id
    el.createdAt = el.updatedAt = new Date()
    return el
   })
   await queryInterface.bulkInsert('Casts', casts, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
    */
   await queryInterface.bulkDelete('Casts', null, {});
   await queryInterface.bulkDelete('Movies', null, {});
   await queryInterface.bulkDelete('Genres', null, {});
   await queryInterface.bulkDelete('Users', null, {});
  }
};
