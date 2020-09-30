import React from "react"
import CardBigRadius from "./CardBigRadius"
import CardDescription from "./CardDescription"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql } from "gatsby"
import { Badge, CardFooter } from "reactstrap"

const HelpMeUnderstandVideoCard = ({
  videoData: { title, tags, url, description, thumbnail },
  image,
}) => {
  // console.log(tags)
  return (
    <CardBigRadius
      title={title.replace("Help Me Understand ", "")}
      imgData={image ? thumbnail.image : url}
    >
      <CardDescription
        desc={
          <MDXRenderer className="card-description">
            {description.childMdx.body}
          </MDXRenderer>
        }
      />
      <CardFooter className="mt-4 text-left">
        <div className="author">
          {tags.map(tag => (
            <Badge
              // onClick={e => e.preventDefault()}
              key={tag}
              style={{ marginRight: "6px", color: "#FFF" }}
              pill
              color="info"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </CardBigRadius>
  )
}

export default HelpMeUnderstandVideoCard

export const query = graphql`
  fragment HelpMeUnderstandVideoCardFragment on ContentfulHelpMeUnderstandVideo {
    id: contentful_id
    title
    url
    tags
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
