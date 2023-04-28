module.exports.getDay = function () {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  day = today.toLocaleDateString("en-US", options);
  return day;
};
