import React from "react"
import { graphql } from "gatsby"
import SEO from "../../components/seo"
import Header from "../../components/header"

import { Container, Button, Row, Col } from "reactstrap"
import { MDXRenderer } from "gatsby-plugin-mdx"
import LinkButton from "../../components/buttons/link-button"
// import ReactPlayer from "react-player"
// import Link from "../../components/Link"

const ThePathPage = ({ data }) => {
  const { banner, sections } = data.page
  const { image } = banner

  return (
    <>
      <SEO
        image={image.file.url}
        url="https://pathwaymarietta.com/take-a-step/growth-track"
        description={
          "Are you interested in learning how to take your next steps at Pathway? Find out how to with Growth Track!"
        }
      />
      <Header
        background={image}
        xs={true}
        style={{ backgroundPosition: "bottom-center" }}
      />
      {sections.map(section => {
        return (
          <section className="blog-2 section section-gray">
            <Container className="text-center">
              <h1 className="h1 title text-center mt-0">{section.title}</h1>
              <MDXRenderer className="text-center pb-3">
                {section.description.childMdx.body}
              </MDXRenderer>
              <hr
                className="border-dark my-5 w-25 position-relative"
                style={{ top: "1.75em", opacity: ".5" }}
              />

              {section.linkedContent.map(content => {
                if (content.internal.type === "ContentfulButton") {
                  return (
                    <Row key={content.id} className="pt-5 mb-5">
                      <Col className="mb-0 mx-3 mx-md-auto">
                        <LinkButton size="lg" color="primary" button={content}>
                          {content.text}
                        </LinkButton>
                      </Col>
                    </Row>
                  )
                } else return null
              })}
            </Container>
          </section>
        )
      })}
    </>
  )
}

export default ThePathPage

export const data = graphql`
  {
    page: contentfulPage(slug: { eq: "growth-track" }) {
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
          linkedContent {
            ... on ContentfulButton {
              ...LinkButtonFragment
            }
          }
        }
      }
    }
  }
`
