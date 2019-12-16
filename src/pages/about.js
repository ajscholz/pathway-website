import React from "react"
import { graphql, Link } from "gatsby"

import SEO from "components/seo"
import Header from "components/header"
import { Button, Container } from "reactstrap"

const AboutPage = props => {
  const { data } = props
  const { heading, subHeading, image } = data.page.banner

  return (
    <>
      <SEO title="About" />
      <Header title={heading} subtitle={subHeading} background={image} />
      <Container>
        <Button tag={Link} to="/about/events">
          Go to events
        </Button>
      </Container>
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
