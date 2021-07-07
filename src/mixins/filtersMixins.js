export const filtersMixins = {
  filters: {
    scale(value, scale) {
      return scale == "C" ? value : Number((value * 9) / 5 + 32);
    },
    round: function(value) {
      if (!value) return "";
      value = Math.round(value);
      return value;
    },
    decimal: function(value) {
      if (!value) return "";
      value = value.toFixed(1);
      return value;
    },
  },
};
