'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Reserve = use('App/Models/Reserve');

/**
 * Resourceful controller for interacting with reserves
 */
class ReserveController {
  /**
   * Show a list of all reserves.
   * GET reserves
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const reserves = await Reserve.query().with('user').fetch();

    return reserves;
  }

  /**
   * Create/save a new reserve.
   * POST reserves
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const data = request.only(['equipment_id', 'dataReserva', 'dataEntrega']);
      
    const reserve = Reserve.create({ user_id: auth.user.id, ...data });

    return reserve;
  }

  /**
   * Display a single reserve.
   * GET reserves/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const reserve = await Reserve.findOrFail(params.id);

    return reserve;
  }

  /**
   * Delete a reserve with id.
   * DELETE reserves/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const reserve = await Reserve.findOrFail(params.id);

    if(!auth.user.tipo)
      return response.status(401);

    await reserve.delete();
  }
}

module.exports = ReserveController
