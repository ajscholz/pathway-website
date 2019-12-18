import React from "react"
import { graphql } from "gatsby"

import SEO from "components/seo"
import Header from "components/header"
import ButtonCard from "../components/cards/button-card"

import { Container, Col } from "reactstrap"

const IndexPage = props => {
  const { data } = props
  const { banner, sections } = data.page
  const { heading, subHeading, image } = banner

  let whiteSection = sections[0]
  whiteSection.background = ""

  return (
    <>
      <SEO title="Home" />
      <Header
        title={heading}
        subtitle={subHeading}
        background={image}
        full={true}
      />
      <section>
        <Container fluid style={{ padding: "0", margin: "0" }}>
          <div className="row no-gutters">
            <Col>
              <ButtonCard
                sectionData={sections[0]}
                className="mb-0"
                button="solid"
              />
            </Col>
          </div>
          <div className="row no-gutters">
            <Col md="6">
              <ButtonCard sectionData={sections[1]} className="mb-0" />
            </Col>
            <Col md="6">
              <ButtonCard sectionData={sections[2]} className="mb-0" />
            </Col>
          </div>
        </Container>
      </section>
    </>
  )
}

export const data = graphql`
  {
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
      sections {
        ... on ContentfulInformationSection {
          title
          subtitle
          description
          button: callToAction {
            text
            link
          }
          background {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`

export default IndexPage
