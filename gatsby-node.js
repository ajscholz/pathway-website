/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// create a slug for each message series
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "ContentfulMessageSeries") {
    let slug = `/${node.seriesTitle
      .replace(/ /g, "-")
      .replace(/'/g, "")
      .toLowerCase()}`

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
  // Transform the new node here and create a new node or
  // create a new node field.
}
