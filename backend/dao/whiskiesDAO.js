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
  static async getWhiskey({
    filters = null,
    page = 0,
    whiskeysPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
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
}
