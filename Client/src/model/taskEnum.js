const DateFilterType = {
  TODAY: {
    id: "today",
    value: "Today",
  },
  WEEK: {
    id: "week",
    value: "This Week",
  },
  MONTH: {
    id: "month",
    value: "This Month",
  },
  YEAR: {
    id: "year",
    value: "This Year",
  },
  CUSTOM: {
    id: "custom",
    value: "Custom Range",
  },
};

Object.freeze(DateFilterType);

export { DateFilterType };
