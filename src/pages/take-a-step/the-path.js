import React from "react"
// import { graphql } from "gatsby"
import SEO from "../../components/seo"
import Header from "../../components/header"

import { Container, Row, Col, Button } from "reactstrap"
import { MDXRenderer } from "gatsby-plugin-mdx"
import ReactPlayer from "react-player"
import Link from "../../components/Link"

const ThePathPage = ({ data }) => {
  const { banner, sections } = data.page
  const { image } = banner

  return (
    <>
      <SEO
        title="The Path"
        image={image.file.url}
        url="https://pathwaymarietta.com/take-a-step/the-path"
        description={
          "God created you on purpose and with a purpose. In The Path we'll help you discover God's unique gifting and wiring in your life and help you begin to figure out what that God-given purpose is, and how you can use it both in your life and at Pathway to make a different all throughout Marietta."
        }
      />
      <Header
        background={image}
        xs={true}
        style={{ backgroundPosition: "bottom-center" }}
        title={sections[0].title}
      />

      <section className="blog-2 section section-gray">
        <Container className="text-center">
          {/* <h1 className="h2 title text-center mt-0">{sections[0].title}</h1> */}
          <MDXRenderer className="text-center pb-3">
            {sections[0].description.childMdx.body}
          </MDXRenderer>
          <hr
            className="border-dark my-5 w-25 position-relative"
            style={{ top: "1.75em", opacity: ".5" }}
          />
          {sections[0].linkedContent.map(video => (
            <Row key={video.id} className="pt-5 mb-5">
              <Col md="4" lg="5" className="mb-0">
                <div style={{ width: "100%", paddingTop: "56.25%" }}>
                  <ReactPlayer
                    url={video.Url}
                    width="100%"
                    height="100%"
                    light={true}
                    style={{ position: "absolute", top: 0, left: 0 }}
                    playing={false}
                    controls={true}
                    className="mb-0"
                  />
                </div>
              </Col>
              <Col
                md={{ size: 8, offset: 0 }}
                lg={{ size: 7, offset: 0 }}
                className="text-left height-full"
              >
                <div>
                  <h2 className="h3 title mt-2 mb-2">{video.title}</h2>
                  <MDXRenderer>{video.description.childMdx.body}</MDXRenderer>
                </div>
                <div className="mt-3">
                  {!video.formUrl ? null : (
                    <Link className="mr-3" to={video.formUrl}>
                      Open Form
                    </Link>
                  )}
                  {!video.participantGuide ? null : (
                    <VidButton
                      href={video.participantGuide.file.url}
                      target="_blank"
                    >
                      Download Guide
                    </VidButton>
                  )}
                </div>
              </Col>
            </Row>
          ))}
        </Container>
      </section>
    </>
  )
}

export default ThePathPage

const VidButton = ({ children, ...rest }) => (
  <Button color="primary" size="sm" {...rest}>
    {children}
  </Button>
)

export const data = graphql`
  {
    page: contentfulPages(title: { eq: "The Path" }) {
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
            ... on ContentfulThePathVideo {
              id: contentful_id
              title
              Url
              participantGuide {
                file {
                  url
                }
              }
              description {
                childMdx {
                  body
                }
              }
            }
          }
        }
      }
    }
  }
`
