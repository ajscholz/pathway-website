import React from "react"

import SEO from "components/seo"
import Header from "components/header"

const AboutPage = props => {
  const { data } = props
  const { heading, subHeading, image } = data.page.banner

  return (
    <>
      <SEO title="About" />
      <Header title={heading} subtitle={subHeading} background={image} />
    </>
  )
}

export const data = graphql`
  {
    page: contentfulPages(title: { eq: "About" }) {
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

export default AboutPage
