import React from "react"
import SEO from "../components/seo"
import Header from "../components/header"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Container, Row, Col, Button } from "reactstrap"
import VimeoPlayer from "react-player/lib/players/Vimeo"
import BreadcrumbSection from "../components/BreadcrumbSection"
import Metadata from "../components/Metadata"

const HelpMeUnderstandVideoTemplate = ({ data }) => {
  const { video } = data
  return (
    <>
      <SEO />
      <Header xxs={true} background="solid" />
      <div className="section section-gray">
        <Container>
          <Row className="justify-content-md-center">
            <Col md="10" className="px-0">
              <BreadcrumbSection
                crumbs={[
                  { name: "Resources", link: "/resources" },
                  {
                    name: "Help Me Understand Videos",
                    link: "/resources/help-me-understand",
                  },
                  { name: video.title, link: "", active: true },
                ]}
              />
            </Col>
          </Row>
          <Row
            className="justify-content-md-center"
            style={{ marginBottom: "40px" }}
          >
            <Col md="10">
              <h1 className="title h2">{`${video.title}`}</h1>
              <Metadata>{video.tags.map(tag => tag)}</Metadata>

              {/* <Button
                color="primary"
                tag={Link}
                to={`/resources`}
                className="btn-link h6 p-0 ml-n1"
              >
                <i className="fa fa-caret-left" />
                {`Back to Resources`}
              </Button> */}

              <MDXRenderer>{video.description.childMdx.body}</MDXRenderer>

              <div
                className="mt-5"
                style={{
                  position: "relative",
                  paddingTop: "56.25%",
                  width: "100%",
                }}
              >
                <VimeoPlayer
                  url={video.url}
                  controls={true}
                  light={true}
                  config={{
                    vimeo: {
                      playerOptions: {
                        // controls: true,/
                        // title: true,
                        // transparent: true,
                      },
                    },
                  }}
                  width="100%"
                  height="100%"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                />
              </div>
            </Col>

            <Button
              className="btn-magnify btn-primary mt-5"
              size="lg"
              href={video.guide.file.url}
              target="blank"
              rel="noopener noreferrer"
            >
              <i className="nc-icon nc-cloud-download-93 mr-2" />
              Download Guide
            </Button>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default HelpMeUnderstandVideoTemplate

export const data = graphql`
  query($slug: String) {
    video: contentfulResourceVideo(slug: { eq: $slug }) {
      title
      url
      tags
      guide: videoUserGuide {
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
`
