import React from "react"
import { Link, graphql } from "gatsby"

import Image from "components/image"
import SEO from "components/seo"
import Header from "components/header"

const IndexPage = props => {
  const { data } = props
  const { heading, subHeading, image } = data.page.banner

  console.log(data.page.banner)

  return (
    <>
      <SEO title="Home" />
      <Header title={heading} subtitle={subHeading} background={image} />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </>
  )
}

export const data = graphql`
  query pageData {
    page: contentfulPages(title: { eq: "Index" }) {
      banner {
        heading
        subHeading
        image {
          fluid(resizingBehavior: FILL) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`

export default IndexPage
