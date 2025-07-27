module.exports = {
  type: String,
  lowercase: true,
  validate: (value) => {
    return /^(male|female|other)$/i.test(value);
  },
};
