module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./dist/assets/");
  eleventyConfig.addPassthroughCopy("./dist/admin/");
  eleventyConfig.addPassthroughCopy("./dist/google82a88c0b668c979c.html");

  eleventyConfig.addFilter("limit", function (arr, limit) {
    return arr.slice(0, limit);
  });

  return {
    templateFormats: ["md", "njk"],
    htmlTemplateEngine: ["md", "njk"],
    dir: {
      input: "dist/",
      output: "./public",
    },
  };
};
