import React from "react"
import CardBigRadius from "./CardBigRadius"
import CardDescription from "./CardDescription"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql } from "gatsby"

const HelpMeUnderstandVideoCard = ({
  videoData: { title, tags, url, description, thumbnail },
  image,
}) => {
  // console.log(tags)
  return (
    <CardBigRadius
      title={title.replace("Help Me Understand ", "")}
      footerData={tags}
      imgData={image ? thumbnail.image : url}
    >
      <CardDescription
        desc={
          <MDXRenderer className="card-description">
            {description.childMdx.body}
          </MDXRenderer>
        }
      />
    </CardBigRadius>
  )
}

export default HelpMeUnderstandVideoCard

export const query = graphql`
  fragment HelpMeUnderstandVideoCardFragment on ContentfulResourceVideo {
    id: contentful_id
    title
    url
    tags
    type
    thumbnail: thumbnailImg {
      image: childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    slug
    videoUserGuide {
      file {
        fileName
        url
      }
    }
    description {
      childMdx {
        body
      }
    }
  }
`
