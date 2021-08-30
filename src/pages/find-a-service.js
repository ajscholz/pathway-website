import React from "react"
import SEO from "../components/seo"
import Header from "../components/header"
import { graphql } from "gatsby"
import { Container, Row, Col } from "reactstrap"
import { MDXRenderer } from "gatsby-plugin-mdx"

const FinaAService = ({ data }) => {
  const { banner, sections } = data.page
  const { image } = banner

  return (
    <>
      <SEO
        title="Find A Service"
        image={image.file.url}
        url="https://pathwaymarietta.com/about/events"
      />
      <Header
        title={banner.heading}
        subtitle={banner.subHeading}
        background={image}
      />
      {sections.map((section, i) => {
        const odd = i % 2 === 1
        return (
          <section
            className={`section${
              odd ? " section-dark text-light" : " section-gray"
            }`}
            key={section.id}
          >
            <Container>
              <Row className="justify-content-center text-center">
                <Col>
                  <h1 className="title h2 mt-0">{section.title}</h1>
                  <MDXRenderer>{section.description.childMdx.body}</MDXRenderer>
                </Col>
              </Row>
            </Container>
          </section>
        )
      })}
    </>
  )
}

export default FinaAService

export const query = graphql`
  {
    page: contentfulPage(slug: { eq: "find-a-service" }) {
      ...HeaderFragment
      sections {
        ... on ContentfulPageSection {
          id: contentful_id
          title
          description {
            childMdx {
              body
            }
          }
        }
      }
    }
  }
`
