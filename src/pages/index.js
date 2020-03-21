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
        subtitle={`Worship online with us every Sunday`}
        background={image}
        full={true}
        countdown={true}
      />
      <section>
        <Container fluid style={{ padding: "0", margin: "0" }}>
          <div className="row no-gutters">
            <Col>
              <ButtonCard
                sectionData={sections[0]}
                className="mb-0"
                button="solid"
                buttonSize="lg"
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
          <div className="row no-gutters">
            <Col md={8} className="mx-auto">
              <ButtonCard
                sectionData={sections[3]}
                className="mb-0"
                button="solid"
              />
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
          fluid(maxWidth: 2000, quality: 80) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
      sections {
        ... on ContentfulInformationSection {
          title
          subtitle
          description {
            childMdx {
              body
            }
          }
          button: callToAction {
            text
            link
          }
          background {
            fluid(maxWidth: 1000, quality: 60) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`

export default IndexPage
