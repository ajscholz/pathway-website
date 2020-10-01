import React from "react"
import CardBigRadius from "./CardBigRadius"
// import CardDescription from "./CardDescription"
// import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql } from "gatsby"
import CardDescription from "./CardDescription"
import { MDXRenderer } from "gatsby-plugin-mdx"

const SpiritualGiftsCard = ({
  videoData: { title, url, description, thumbnail },
  image,
}) => {
  return (
    <CardBigRadius title={title} imgData={image ? thumbnail.image : url}>
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

export default SpiritualGiftsCard

export const query = graphql`
  fragment SpiritualGiftsCardFragment on ContentfulSpiritualGiftsVideo {
    id: contentful_id
    title
    url
    thumbnail: thumbnailImg {
      image: childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    slug
    description {
      childMdx {
        body
      }
    }
  }
`
