module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./dist/assets/");
  eleventyConfig.addPassthroughCopy("./dist/admin/");
  return {
    templateFormats: ["md", "njk"],
    htmlTemplateEngine: ["md", "njk"],
    dir: {
      input: "dist/",
      output: "./public",
    },
  };
};
