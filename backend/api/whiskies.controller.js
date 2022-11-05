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

  // static async apiGetWhiskeyById(res, req, next) {
  //   try {
  //     let id = req.params.id || {};
  //     let whiskey = await WhiskiesDAO.getWhiskeyById(id);
  //     if (!whiskey) {
  //       res.status(404).json({ error: "Not found :-(" });
  //       return;
  //     }
  //     res.json(whiskey);
  //   } catch (err) {
  //     console.log(`api, ${err}`);
  //     res.status(500).json({ error: err });
  //   }
  // }

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
