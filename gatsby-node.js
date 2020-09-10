const path = require(`path`)

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
            slug
          }
        }
      }
      messages: allContentfulMessage {
        all: edges {
          node {
            slug
            messageSeries {
              seriesTitle
              slug
            }
          }
        }
      }
      videos: allContentfulResourceVideo {
        all: edges {
          node {
            slug
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
    const path = `/messages/series/${node.slug}`
    createPage({
      path,
      component: messageSeriesTemplate,
      context: {
        slug: node.slug,
      },
    })
  })

  // Create pages for each message.
  const messageTemplate = path.resolve(`src/templates/message-template.js`)

  result.data.messages.all.forEach(({ node }) => {
    try {
      const path = `/messages/series/${node.messageSeries.slug}/${node.slug}`
      createPage({
        path,
        component: messageTemplate,
        context: {
          slug: node.slug,
          seriesTitle: node.messageSeries.seriesTitle,
        },
      })
    } catch (err) {
      console.log(`Could not creat page for ${node.title}.`, err)
    }
  })

  const videoPageTemplate = path.resolve(
    "src/templates/help-me-understand-video-template.js"
  )

  result.data.videos.all.forEach(({ node }) => {
    const path = `/resources/help-me-understand/${node.slug}`
    createPage({
      path,
      component: videoPageTemplate,
      context: {
        slug: node.slug,
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

// Define graphql types
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  const typeDefs = [
    `type ContentfulNotificationBar implements Node {
      title: String
      showBar: Boolean
			text: String
			autoOff: Date @dateformat
      clickthroughLink: String
      updatedAt: Date
    }
    `,
    `type ContentfulResourceVideo implements Node {
      contentful_id: String
      title: String
      url: String
      slug: String
      tags: [String]
      videoUserGuide: ContentfulAsset
      description: contentfulResourceVideoDescriptionTextNode
    }`,
    `type ContentfulAsset implements Node {
      file: ContentfulAssetFile
    }`,
    `type ContentfulAssetFile {
      url: String
      fileName: String
    }`,
    `type contentfulResourceVideoDescriptionTextNode implements Node {
      childMdx: Mdx
    }`,
    `type Mdx implements Node {
      body: String!
    }`,
    `type ContentfulMessage implements Node {
      messageSeries: ContentfulMessageSeries
    }`,

    schema.buildObjectType({
      name: "ContentfulStreamingVideo",
      fields: {
        videoId: {
          type: "String!",
          resolve: source => source.videoId || "503812663636183",
        },
        dateTime: {
          type: "Date!",
          resolve: source => source.dateTime || new Date(2000, 0, 1),
        },
        length: {
          type: "Int!",
          resolve: source => source.length || 1,
        },
        videoUrl: {
          type: "String!",
          resolve: source =>
            // `https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fpathwaymarietta%2Fvideos%2F${source.videoId}%2F&width=auto`,
            `https://vimeo.com/${source.videoId}`,
        },
      },
      interfaces: ["Node"],
    }),
    schema.buildObjectType({
      name: "ContentfulMessageSeries",
      fields: {
        slug: {
          type: "String!",
          resolve: source => source.slug || "unnamed-series-1",
        },
      },
      interfaces: ["Node"],
    }),
  ]
  createTypes(typeDefs)
}
