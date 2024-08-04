CMS.registerEventListener({
  name: "preSave",
  handler: ({ entry }) => {
    const data = entry.get("data").toJS();
    const category = data.category;
    let tags = data.tags || [];

    console.log("Category:", category);
    console.log("Tags before:", tags);

    if (category && !tags.includes(category)) {
      tags.push(category);
      entry = entry.setIn(["data", "tags"], tags);
    }

    console.log("Tags after:", tags);

    return entry;
  },
});
