import { ObjectId } from "mongodb";

let whiskies;

export default class WhiskiesDAO {
  static async injectDB(conn) {
    if (whiskies) {
      return;
    }
    try {
      whiskies = await conn.db("test").collection("whiskies");
    } catch (err) {
      console.error(
        `Unable to establish collection handle in whiskeyDAO: ${err}`
      );
    }
  }
  static async getWhiskies({
    filters = null,
    page = 0,
    whiskeysPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("whiskeyTitle" in filters) {
        query = { $text: { $search: filters["whiskeyTitle"] } };
      } else if ("distillery" in filters) {
        query = { distillery: { $eq: filters["distillery"] } };
      } else if ("tags" in filters) {
        query = { tags: { $elemMatch: { $eq: filters["tags"] } } };
      }
    }
    let cursor;
    try {
      cursor = await whiskies.find(query);
    } catch (err) {
      console.error(`Unable to issue find command, ${err}`);
      return { whiskiesList: [], totalNumWhiskies: 0 };
    }

    const displayCursor = cursor
      .limit(whiskeysPerPage)
      .skip(whiskeysPerPage * page);
    try {
      const whiskiesList = await displayCursor.toArray();
      const totalNumWhiskies = await whiskies.countDocuments(query);
      return { whiskiesList, totalNumWhiskies };
    } catch (err) {
      console.error(
        `Unable to convert cursor to array or problem counting document, ${err}`
      );
      return { whiskiesList: [], totalNumWhiskies: 0 };
    }
  }

  // static async getWhiskeyById(id) {
  //   try{
  //     const pipeline = [
  //       {
  //         $match: {
  //           _id: new ObjectId(id),
  //         },
  //       },
  //       {
  //         $lookup:{
  //           from: "whiskies",
  //           let: {
  //             id: "$_id",
  //           },
  //           pipeline: [
  //             {
  //               $match: {
  //                 $expr: {
  //                   $eq: ["$$id"],
  //                 }
  //               }
  //             }
  //           ]
  //         }
  //       }
  //     ]
  //   }
  // };

  static async getWhiskeyDistilleries() {
    let distilleries = [];
    try {
      distilleries = await whiskies.distinct("distillery");
      return distilleries;
    } catch (err) {
      console.error(`Unable to get distilleries, ${err}`);
      return distilleries;
    }
  }

  static async addWhiskey(
    whiskeyTitle,
    distillery,
    region,
    country,
    description,
    price,
    tags
  ) {
    try {
      const whiskeyDoc = {
        whiskeyTitle: whiskeyTitle,
        distillery: distillery,
        region: region,
        country: country,
        description: description,
        price: price,
        tags: tags,
      };
      return await whiskies.insertOne(whiskeyDoc);
    } catch (err) {
      console.error(`Unable to add whiskey: ${err}`);
      return { error: err };
    }
  }

  static async editWhiskey(whiskeyQueryid, data) {
    try {
      const editResponse = await whiskies.updateOne(
        { _id: ObjectId(whiskeyQueryid) },
        {
          $set: {
            whiskeyTitle: data.whiskeyTitle,
            distillery: data.distillery,
            region: data.region,
            country: data.country,
            description: data.description,
            price: data.price,
            tags: data.tags,
          },
        }
      );
      return editResponse;
    } catch (err) {
      console.error(`Unable to edit whiskey: ${err}`);
      return { error: err };
    }
  }

  static async deleteWhiskey(whiskeyId) {
    try {
      const deleteResponse = await whiskies.deleteOne({
        _id: ObjectId(whiskeyId),
      });
    } catch (err) {
      console.err(`Unable to delete whiskey: ${err}`);
      return { error: err };
    }
  }
}
