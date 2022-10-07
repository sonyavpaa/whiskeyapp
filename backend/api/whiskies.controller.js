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
    } else if (req.query.whiskeyTitle) {
      filters.whiskeyTitle = req.query.whiskeyTitle;
    }

    const { whiskiesList, totalNumWhiskies } = await WhiskiesDAO.getWhiskies({
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

  static async apiAddWhiskey(req, res, next) {
    try {
      // const whiskeyId = req.body.id;
      const whiskeyTitle = req.body.whiskeyTitle;
      const distillery = req.body.distillery;
      const region = req.body.region;
      const country = req.body.country;
      const description = req.body.description;
      const price = req.body.price;
      const tags = req.body.tags;
      const WhiskeyResponse = await WhiskiesDAO.addWhiskey(
        whiskeyId,
        whiskeyTitle,
        distillery,
        region,
        country,
        description,
        price,
        tags
      );
      res.json({ status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async apiEditWhiskey(req, res, next) {
    try {
      const whiskeyId = req.body._id;
      const whiskeyTitle = req.body.whiskeyTitle;
      const distillery = req.body.distillery;
      const region = req.body.region;
      const country = req.body.country;
      const description = req.body.description;
      const price = req.body.price;
      const tags = req.body.tags;
      const whiskeyResponse = await WhiskiesDAO.editWhiskey(
        whiskeyId,
        whiskeyTitle,
        distillery,
        region,
        country,
        description,
        price,
        tags
      );
      var { error } = whiskeyResponse;
      if (error) {
        res.status(400).json({ error });
      }
      if (whiskeyResponse.modifiedCount === 0) {
        throw new Error(
          "Unable to update whiskey - user may not be original poster"
        );
      }
      res.json({ status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async apiDeleteWhiskey(req, res, next) {
    try {
      // const whiskeyId = req.query.id;
      const whiskeyId = req.body._id;
      console.log("whiskeyId from whiskies.controller.js: ", whiskeyId);
      const whiskeyResponse = await WhiskiesDAO.deleteWhiskey(whiskeyId);
      res.json({ status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}