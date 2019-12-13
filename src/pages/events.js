import React from "react"
import { graphql } from "gatsby"

import SEO from "components/seo"
import Header from "components/header"

const EventsPage = props => {
  const { data } = props
  const { heading, subHeading, image } = data.page.banner

  return (
    <>
      <SEO title="Events" />
      <Header title={heading} subtitle={subHeading} background={image} />
    </>
  )
}

export const data = graphql`
  {
    page: contentfulPages(title: { eq: "Events" }) {
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

export default EventsPage
