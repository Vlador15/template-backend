const Catalog = require("../models/catalog");

class Api {
  /**
   *  Получение всех категорий
   */

  async getCategory(req, res) {
    let { categoryName } = req.params;
    let isCategory = await Catalog.findOne({ category: categoryName });

    if (isCategory) {
      return res.json(isCategory);
    } else {
      return res.status(404).json({ message: "Категорий не найдена..." });
    }
  }
}

exports.api = new Api();
