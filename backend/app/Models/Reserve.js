'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Reserve extends Model {
    user() {
        return this.belongsTo('App/Models/User');
    }
    equipment() {
        return this.belongsTo('App/Models/Equipment');
    }
}

module.exports = Reserve
