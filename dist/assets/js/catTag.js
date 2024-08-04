CMS.registerEditorComponent({
  id: "category-to-tags",
  label: "Category to Tags",
  fields: [
    {
      name: "category",
      label: "Category",
      widget: "relation",
      collection: "categories",
      search_fields: ["title"],
      value_field: "title",
      display_fields: ["title"],
    },
    { name: "tags", label: "Tags", widget: "list" },
  ],
  pattern: /{{< category-to-tags ([^>]*) >}}/,
  fromBlock: function (match) {
    const fields = JSON.parse(match[1]);
    return {
      category: fields.category,
      tags: fields.tags || [],
    };
  },
  toBlock: function (obj) {
    return `{{< category-to-tags ${JSON.stringify(obj)} >}}`;
  },
  toPreview: function (obj) {
    return `<div>Category: ${obj.category}</div><div>Tags: ${obj.tags.join(
      ", "
    )}</div>`;
  },
  onChange: function ({ collection, entry }) {
    const category = entry.getIn(["data", "category"]);
    const tags = entry.getIn(["data", "tags"]) || [];
    if (category && !tags.includes(category)) {
      entry.getIn(["data", "tags"]).push(category);
      CMS.store.dispatch(CMS.actions.entryDraft.setField("tags", tags));
    }
  },
});
