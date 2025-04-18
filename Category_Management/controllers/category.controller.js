const categoryModel = require("../models/category.model");

class CategoryController {
  async createcategory(req, res) {
    try {
      const { name, parentId } = req.body;

      if (!name) {
        return res.status(400).json({
          success: false,
          message: "name feild Required ",
        });
      }
      let isCategoryExists = await categoryModel.findOne({ name ,isDeleted:false});
      if (isCategoryExists) {
        return res.status(409).json({
          success: false,
          message: " Already Exits ",
        });
      }
      const category = await categoryModel.create({
        name,
        parentId,
      });

      if (category) {
        return res.status(201 ).json({
          success: true,
          message: "category Created Sucessfully",
          category,
        });
      }
    } catch (e) {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
      throw e;
    }
  }

  async categoryList(req, res) {
    try {
      const category = await categoryModel.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$isDeleted", false] },
                { $eq: ["$parentId", null] },
              ],
            },
          },
        },

        {
          $lookup: {
            from: "categories",
            let: {
              p_Id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$isDeleted", false],
                      },
                      {
                        $eq: ["$parentId", "$$p_Id"],
                      },
                    ],
                  },
                },
              },

              {
                $lookup: {
                  from: "categories",
                  let: {
                    p_Id: "$_id",
                  },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $and: [
                            {
                              $eq: ["$isDeleted", false],
                            },
                            {
                              $eq: ["$parentId", "$$p_Id"],
                            },
                          ],
                        },
                      },
                    },
                    {
                      $project: {
                        name: 1,
                        parentId: 1,
                      },
                    },
                  ],
                  as: "grandChildCategories",
                },
              },

              {
                $project: {
                  name: 1,
                  parentId: 1,
                  grandChildCategories: 1,
                },
              },
            ],
            as: "subCategories",
          },
        },
        {
          $project: {
            categoryName: "$name",
            totalSubcategory:{
                $size:"$subCategories"
            },
            subcategoryDetails: {
              $map: {
                input: "$subCategories",
                as: "sub",
                in: {
                  name: "$$sub.name",
                  totalGrandChild:{
                      $size:"$$sub.grandChildCategories"
                  },
                
                  grandchildDetails: {
                    $map: {
                      input: "$$sub.grandChildCategories",
                      as: "grand",
                      in: {
        
                        name: "$$grand.name",
                      },
                    },
                  },
                },
              },
            },
          },
        },
       
      ]);
      if (category) {
        return res.status(200).json({
          success: true,
          categoryCount: category.length,
          category,
        });
      }
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new CategoryController();
