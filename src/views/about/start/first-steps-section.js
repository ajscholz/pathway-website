import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { Container, Row, Col } from "reactstrap"
import { MDXRenderer } from "gatsby-plugin-mdx"

const FirstStepsSection = () => {
  const { section } = useStaticQuery(graphql`
    {
      section: contentfulPageSection(title: { eq: "First Steps" }) {
        title
        description {
          childMdx {
            body
          }
        }
      }
    }
  `)

  return (
    <section className="team-1">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" md="8">
            <h2 className="title text-center">{section.title}</h2>
            <MDXRenderer className="text-left">
              {section.description.childMdx.body}
            </MDXRenderer>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default FirstStepsSection
