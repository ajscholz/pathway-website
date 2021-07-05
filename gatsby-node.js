const path = require(`path`)
const axios = require("axios")
const { createRemoteFileNode } = require("gatsby-source-filesystem")

// process vimeo thumbnails to be used by Gatsby Image
exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  if (
    node.internal.type === "ContentfulHelpMeUnderstandVideo" ||
    node.internal.type === "ContentfulMyersBriggsVideo" ||
    node.internal.type === "ContentfulSpiritualGiftsVideo" ||
    node.internal.type === "ContentfulEnneagramVideo"
  ) {
    const result = await axios.get(
      `https://vimeo.com/api/oembed.json?url=${node.url}&width=1920&height=1080`
    )

    if (result.errors) {
      reporter.panicOnBuild(`Errorrrrrrrrr`)
      return
    }

    const { data } = result
    let fileNode = await createRemoteFileNode({
      url: data.thumbnail_url, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's redux store
    })
    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      node.thumbnailImg___NODE = fileNode.id
    }
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
      hmuVideos: allContentfulHelpMeUnderstandVideo {
        all: edges {
          node {
            slug
          }
        }
      }
      mbtiVideos: allContentfulMyersBriggsVideo {
        all: edges {
          node {
            slug
          }
        }
      }
      sgVideos: allContentfulSpiritualGiftsVideo {
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
      console.log(`Could not create page for ${node.title}.`, err)
    }
  })

  const hmuVideoPageTemplate = path.resolve(
    "src/templates/help-me-understand-video-template.js"
  )

  result.data.hmuVideos.all.forEach(({ node }) => {
    const path = `/resources/help-me-understand/${node.slug}`
    createPage({
      path,
      component: hmuVideoPageTemplate,
      context: {
        slug: node.slug,
      },
    })
  })

  const mbtiVideoPageTemplate = path.resolve(
    "src/templates/mbti-video-template.js"
  )
  result.data.mbtiVideos.all.forEach(({ node }) => {
    const path = `/resources/mbti/${node.slug}`
    createPage({
      path,
      component: mbtiVideoPageTemplate,
      context: {
        slug: node.slug,
      },
    })
  })

  const sgVideoPageTemplate = path.resolve("src/templates/sg-video-template.js")
  result.data.sgVideos.all.forEach(({ node }) => {
    const path = `/resources/spiritual-gifts/${node.slug}`
    createPage({
      path,
      component: sgVideoPageTemplate,
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
    `type File implements Node {
      url: String
    }
    `,
    `type ContentfulNotificationBar implements Node {
      title: String
      showBar: Boolean
			text: String
			autoOff: Date @dateformat
      clickthroughLink: String
      updatedAt: Date
    }
    `,
    `type ContentfulHelpMeUnderstandVideo implements Node {
      contentful_id: String
      title: String
      url: String
      slug: String
      tags: [String]
      videoUserGuide: ContentfulAsset @link(by: "id", from: "videoUserGuide___NODE")
      description: contentfulHelpMeUnderstandVideoDescriptionTextNode @link(by: "id", from: "description___NODE")
      thumbnailImg: File @link(by: "id", from: "thumbnailImg___NODE")
    }`,
    `type ContentfulMyersBriggsVideo implements Node {
      contentful_id: String
      title: String
      url: String
      slug: String
      description: description: contentfulMyersBriggsVideoDescriptionTextNode @link(by: "id", from: "description___NODE")
      thumbnailImg: File @link(by: "id", from: "thumbnailImg___NODE")
    }`,
    `type ContentfulSpiritualGiftsVideo implements Node {
      contentful_id: String
      title: String
      url: String
      slug: String
      description: contentfulSpiritualGiftsVideoDescriptionTextNode @link(by: "id", from:
"description___NODE")
      thumbnailImg: thumbnailImg: File @link(by: "id", from: "thumbnailImg___NODE")
    }`,
    `type ContentfulEnneagramVideo implements Node {
      contentful_id: String
      title: String
      url: String
      slug: String
      description: contentfulEnneagramVideoDescriptionTextNode
      thumbnailImg: File
    }`,
    `type ContentfulAsset implements Node {
      file: ContentfulAssetFile
    }`,
    `type ContentfulAssetFile {
      url: String
      fileName: String
    }`,
    `type contentfulHelpMeUnderstandVideoDescriptionTextNode implements Node {
      childMdx: Mdx
    }`,
    `type contentfulMyersBriggsVideoDescriptionTextNode implements Node {
      childMdx: Mdx
    }`,
    `type contentfulSpiritualGiftsVideoDescriptionTextNode implements Node {
      childMdx: Mdx
    }`,
    `type contentfulEnneagramVideoDescriptionTextNode implements Node {
      childMdx: Mdx
    }`,
    `type Mdx implements Node {
      body: String!
    }`,
    `type ContentfulMessage implements Node {
      messageSeries: ContentfulMessageSeries @link(by: "id", from: "messageSeries___NODE")
    }`,
    `type ContentfulThePathVideo implements Node`,

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
