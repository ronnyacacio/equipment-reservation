'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReserveSchema extends Schema {
  up () {
    this.create('reserves', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('equipment_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('equipment')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.date('dataReserva').notNullable()
      table.date('dataEntrega').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('reserves')
  }
}

module.exports = ReserveSchema

