// controller for the database query

import WhiskiesDAO from "../dao/whiskiesDAO.js";

export default class whiskiesController {
  static async apiGetWhiskies(req, res, next) {
    const whiskiesPerPage = req.query.whiskiesPerPage
      ? parseInt(req.query.whiskiesPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.whiskeyTitle) {
      filters.whiskeyTitle = req.query.whiskeyTitle;
    } else if (req.query.id) {
      filters.id = req.query.id;
    } else if (req.query.distillery) {
      filters.distillery = req.query.distillery;
    } else if (req.query.cask) {
      filters.cask = req.query.cask;
    } else if (req.query.tags) {
      filters.tags = req.query.tags;
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

  static async apiGetWhiskeyDistilleries(req, res, next) {
    try {
      let distilleries = await WhiskiesDAO.getWhiskeyDistilleries();
      res.json(distilleries);
    } catch (err) {
      console.log(`api, ${err}`);
      res.status(500).json({ error: err });
    }
  }

  static async apiAddWhiskey(req, res, next) {
    req.headers["content-type"] = "application/json; charset=UTF-8";

    try {
      // const whiskeyId = req.body.id;
      const whiskeyTitle = await req.body.whiskeyTitle;
      const distillery = await req.body.distillery;
      const cask = await req.body.cask;
      const alc = await req.body.alc;
      const region = await req.body.region;
      const country = await req.body.country;
      const description = await req.body.description;
      const price = await req.body.price;
      const tags = await req.body.tags;

      const WhiskeyResponse = await WhiskiesDAO.addWhiskey(
        whiskeyTitle,
        distillery,
        cask,
        alc,
        region,
        country,
        description,
        price,
        tags
      );
      res.json({
        status: `success ${whiskeyTitle}`,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async apiEditWhiskey(req, res, next) {
    try {
      const whiskeyId = req.query.id;
      const whiskeyTitle = req.body.whiskeyTitle;
      const distillery = req.body.distillery;
      const region = req.body.region;
      const country = req.body.country;
      const description = req.body.description;
      const price = req.body.price;
      const tags = req.body.tags;
      const whiskeyResponse = await WhiskiesDAO.editWhiskey(whiskeyId, {
        whiskeyTitle: whiskeyTitle,
        distillery: distillery,
        region: region,
        country: country,
        description: description,
        price: price,
        tags: tags,
      });
      var { error } = whiskeyResponse;
      if (error) {
        res.status(400).json({ error });
      }
      if (whiskeyResponse.modifiedCount === 0) {
        throw new Error(
          "Unable to update whiskey - user may not be original poster"
        );
      }
      res.json({ status: `successfully edited ${whiskeyId}` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async apiDeleteWhiskey(req, res, next) {
    try {
      // NB check do you need to change the req.query to req.body once the front calls are being defined

      const whiskeyId = await req.query.id;
      console.log("whiskeyId from whiskies.controller.js: ", whiskeyId);
      const whiskeyResponse = await WhiskiesDAO.deleteWhiskey(whiskeyId);
      res.json({ status: `${whiskeyId} deleted successfully` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
