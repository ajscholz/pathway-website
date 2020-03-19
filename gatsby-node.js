/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// create a slug for each message series

const path = require(`path`)

const slugify = title => {
  if (title === null || title === undefined) {
    return undefined
  }

  return `/${title
    .replace(/ /g, "-")
    .replace(/[\#\?\'\"\&\*\$]+/g, "")
    .toLowerCase()}`
}

// create counters to increment for unnamed slugs in onCreateNode
let unnamedSeriesCounter = 0
let unnamedMessageCounter = 0

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "ContentfulMessageSeries") {
    let slug = slugify(node.seriesTitle)
    if (slug === undefined) {
      unnamedSeriesCounter++
      slug = `/unnamed-series-${unnamedSeriesCounter}`
    }
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    // console.log(node.fields.slug)
  } else if (node.internal.type === "ContentfulMessage") {
    // console.log("in onCreateNode")
    let slug = slugify(node.messageTitle)
    if (slug === undefined) {
      unnamedMessageCounter++
      slug = `/unnamed-message-${unnamedMessageCounter}`
    }
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    // console.log(node.fields.slug)
  }
}

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  // Query for markdown nodes to use in creating pages.
  const result = await graphql(`
    {
      series: allContentfulMessageSeries {
        all: edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      messages: allContentfulMessage {
        all: edges {
          node {
            fields {
              slug
            }
            messageSeries {
              fields {
                slug
              }
              contentful_id
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(
      `Error while getting Contentful Message Series from graphql.`
    )
    return
  }

  // Create pages for each message series.
  const messageSeriesTemplate = path.resolve(
    `src/templates/message-series-template.js`
  )

  result.data.series.all.forEach(({ node }) => {
    const path = `/messages/series${node.fields.slug}`
    createPage({
      path,
      component: messageSeriesTemplate,
      context: {
        slug: node.fields.slug,
      },
    })
  })

  // Create pages for each message.
  const messageTemplate = path.resolve(`src/templates/message-template.js`)

  result.data.messages.all.forEach(({ node }) => {
    const path = `/messages/series${node.messageSeries.fields.slug}${node.fields.slug}`
    createPage({
      path,
      component: messageTemplate,
      context: {
        slug: node.fields.slug,
        seriesId: node.messageSeries.contentful_id,
      },
    })
  })
}

// Replacing '/' would result in empty string which is invalid
const replacePath = path => (path === `/` ? path : path.replace(/\/$/, ``))
// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  const oldPage = Object.assign({}, page)
  // Remove trailing slash unless page is /
  page.path = replacePath(page.path)
  if (page.path !== oldPage.path) {
    // Replace new page with old page
    deletePage(oldPage)
    createPage(page)
  }
}

// Define the "Event" type
exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
		type ContentfulNotificationBar implements Node {
      title: String
      showBar: Boolean
			text: String
			autoOff: Date @dateformat
      clickthroughLink: String
      updatedAt: Date
    }
	`)
}

// // Define resolvers for custom fields
// exports.createResolvers = ({ createResolvers }, options) => {
//   const basePath = options.basePath || "/"
//   // Quick-and-dirty helper to convert strings into URL-friendly slugs
//   const slugify = str => {
//     const slug = str
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/(^-|-$)+/g, "")
//     return `/${basePath}/${slug}`.replace(/\/\/+/g, "/")
//   }
//   createResolvers({
//     Event: {
//       slug: {
//         resolve: source => slugify(source.name),
//       },
//     },
//   })
// }
