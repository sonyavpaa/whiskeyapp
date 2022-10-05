// controller for the database query

import WhiskiesDAO from "../dao/whiskiesDAO.js";

export default class whiskiesController {
  static async apiGetWhiskies(req, res, next) {
    const whiskiesPerPage = req.query.whiskiesPerPage
      ? parseInt(req.query.whiskiesPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.distillery) {
      filters.distillery = req.query.distillery;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }

    const { whiskiesList, totalNumWhiskies } = await WhiskiesDAO.getWhiskey({
      filters,
      page,
      whiskiesPerPage,
    });

    let response = {
      whiskies: whiskiesList,
      page: page,
      filters: filters,
      entries_per_page: whiskiesPerPage,
      total_results: totalNumWhiskies,
    };
    res.json(response);
  }
}
