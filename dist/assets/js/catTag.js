CMS.registerEventListener({
  name: "preSave",
  handler: ({ entry }) => {
    const data = entry.get("data").toJS();
    const category = data.category;
    const tags = data.tags || [];

    if (category && !tags.includes(category)) {
      tags.push(category);
      entry = entry.setIn(["data", "tags"], tags);
    }

    return entry;
  },
});
