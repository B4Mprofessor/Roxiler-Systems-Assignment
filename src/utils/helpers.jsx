export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const transformBarChartData = (data) => {
  const ranges = [
    "0-100",
    "101-200",
    "201-300",
    "301-400",
    "401-500",
    "501-600",
    "601-700",
    "701-800",
    "801-900",
    "901-above",
  ];

  return ranges.map((range, index) => ({
    range,
    count: data[index]?.count || 0,
  }));
};

export const transformPieChartData = (data) => {
  return data.map((item) => ({
    name: item._id,
    count: item.count,
  }));
};
