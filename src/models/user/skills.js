module.exports = {
  type: [String],
  validate: {
    validator: function (arr) {
      return arr.length <= 10;
    },
    message: "A user can have at most 10 skills.",
  },
};
