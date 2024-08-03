module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./dist/assets/");
  return {
    templateFormats: ["md", "njk"],
    htmlTemplateEngine: "njk",
    dir: {
      input: "dist/",
      output: "./public",
    },
  };
};
