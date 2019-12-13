import React from "react"
import { graphql } from "gatsby"

import SEO from "components/seo"
import Header from "components/header"
import ButtonCard from "../components/cards/button-card"

import { Container, Row, Col } from "reactstrap"

const IndexPage = props => {
  const { data } = props
  const { banner, sections } = data.page
  const { heading, subHeading, image } = banner

  console.log("sections: ", sections)

  return (
    <>
      <SEO title="Home" />
      <Header
        title={heading}
        subtitle={subHeading}
        background={image}
        full={true}
      />
      <div className="section">
        <Container>
          <Row>
            <Col md="6">
              <ButtonCard sectionData={sections[0]} />
            </Col>
            <Col md="6">
              <ButtonCard sectionData={sections[1]} />
            </Col>
            <Col>
              <ButtonCard sectionData={sections[2]} />
            </Col>
          </Row>
        </Container>
      </div>
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
