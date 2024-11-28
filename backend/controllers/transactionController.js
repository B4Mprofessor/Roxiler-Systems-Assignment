import Transaction from "../models/Transaction.js";

export const getTransactions = async (req, res) => {
  try {
    const { month, page = 1, search = "" } = req.query;
    const pageSize = 10;

    const monthIndex = new Date(Date.parse(`${month} 1, 2023`)).getMonth();

    const query = {
      $and: [
        {
          dateOfSale: {
            $gte: new Date(2023, monthIndex, 1),
            $lt: new Date(2023, monthIndex + 1, 1),
          },
        },
        search
          ? {
              $or: [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { price: search },
              ],
            }
          : {},
      ],
    };

    const transactions = await Transaction.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments(query);

    res.json({
      transactions,
      currentPage: page,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStatistics = async (req, res) => {
  try {
    const { month } = req.query;
    const monthIndex = new Date(Date.parse(`${month} 1, 2023`)).getMonth();

    const statistics = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: {
            $gte: new Date(2023, monthIndex, 1),
            $lt: new Date(2023, monthIndex + 1, 1),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: {
            $sum: { $cond: [{ $eq: ["$sold", true] }, "$price", 0] },
          },
          totalSoldItems: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },
          totalNotSoldItems: {
            $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] },
          },
        },
      },
    ]);

    res.json(
      statistics[0] || {
        totalSaleAmount: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0,
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBarChartData = async (req, res) => {
  try {
    const { month } = req.query;
    const monthIndex = new Date(Date.parse(`${month} 1, 2023`)).getMonth();

    const priceRanges = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: {
            $gte: new Date(2023, monthIndex, 1),
            $lt: new Date(2023, monthIndex + 1, 1),
          },
        },
      },
      {
        $bucket: {
          groupBy: "$price",
          boundaries: [
            0,
            100,
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900,
            Infinity,
          ],
          default: "901-above",
          output: {
            count: { $sum: 1 },
          },
        },
      },
    ]);

    res.json(priceRanges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;
    const monthIndex = new Date(Date.parse(`${month} 1, 2023`)).getMonth();

    const categoryData = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: {
            $gte: new Date(2023, monthIndex, 1),
            $lt: new Date(2023, monthIndex + 1, 1),
          },
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(categoryData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
