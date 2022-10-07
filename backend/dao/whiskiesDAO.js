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

  static async addWhiskey(
    whiskeyId,
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
        whiskey_id: ObjectId(whiskeyId),
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

  static async editWhiskey(
    whiskeyId,
    whiskeyTitle,
    distillery,
    region,
    country,
    description,
    price,
    tags
  ) {
    try {
      const editResponse = await whiskies.updateOne(
        { _id: ObjectId(whiskeyId) },
        {
          $set: {
            whiskeyTitle: whiskeyTitle,
            distillery: distillery,
            region: region,
            country: country,
            description: description,
            price: price,
            tags: tags,
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
