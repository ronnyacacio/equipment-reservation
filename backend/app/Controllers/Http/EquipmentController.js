'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Equipment = use('App/Models/Equipment');

/**
 * Resourceful controller for interacting with equipment
 */
class EquipmentController {
  /**
   * Show a list of all equipment.
   * GET equipment
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const equipments = await Equipment.all();

    return equipments;
  }

  /**
   * Create/save a new equipment.
   * POST equipment
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth, response }) {
    const data = request.only(['nome', 'status']);

    if(!auth.user.tipo)
      return response.status(401);
      
    const equipment = Equipment.create(data);

    return equipment;
  }

  /**
   * Display a single equipment.
   * GET equipment/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const equipment = await Equipment.findOrFail(params.id);

    return equipment;
  }

  /**
   * Update equipment details.
   * PUT or PATCH equipment/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, auth, response }) {
    const equipment = await Equipment.findOrFail(params.id);
    const data = request.only(['nome', 'status']);
    
    equipment.merge(data);
    
    if(!auth.user.tipo)
      return response.status(401);
    
    await equipment.save();

    return equipment;
  }

  /**
   * Delete a equipment with id.
   * DELETE equipment/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, auth, response }) {
    const equipment = await Equipment.findOrFail(params.id);

    if(!auth.user.tipo)
      return response.status(401);

    await equipment.delete();
  }
}

module.exports = EquipmentController
