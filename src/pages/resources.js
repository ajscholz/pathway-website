import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Header from "../components/header"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
} from "reactstrap"

const ResourcesPage = ({ data }) => {
  const { banner, sections } = data.page
  const { heading, image } = banner

  const videos = sections[0].linkedContent

  return (
    <>
      <SEO
        title="Resources"
        image={image.file.url}
        url="https://pathwaymarietta.com/resources"
      />
      <Header title={heading} background={image} xs={true} />
      <section className="blog-2 section section-gray">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" md="8">
              <h2 className="title text-center">{sections[0].title}</h2>
              <Row>
                {videos.map(video => (
                  <Col md="4" key={video.id}>
                    {/* <Link to={`/resources`}>
                      <Card
                        className="info info-horizontal py-0"
                        data-background="color"
                        data-color="dark"
                        style={{ maxWidth: "unset" }}
                      >
                        <CardBody>
                          <h4 className="info-title ">{video.title}</h4>
                          <h6 className="text-muted mb-3 mt-n2">
                            {message.date}
                          </h6>
                        </CardBody>
                      </Card>
                    </Link> */}
                    <Link to={`/resources`}>
                      <Card
                        className="info"
                        data-background="color"
                        data-color="dark"
                      >
                        <CardBody>
                          <h4 className="info-title text-primary">
                            {video.title}
                          </h4>

                          <MDXRenderer className="card-description">
                            {video.description.childMdx.body}
                          </MDXRenderer>

                          <hr />
                          <CardFooter>
                            <div className="author">
                              {video.tags.map(tag => (
                                <Badge
                                  href="#pablo"
                                  onClick={e => e.preventDefault()}
                                  key={tag}
                                  style={{ marginRight: "6px" }}
                                  pill
                                  color="info"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            {/* <div className="stats">
                              <i className="fa fa-clock-o" /> 5 min read
                            </div> */}
                          </CardFooter>
                        </CardBody>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default ResourcesPage

export const data = graphql`
  {
    page: contentfulPages(title: { eq: "Resources" }) {
      ...HeaderFragment
      sections {
        ... on ContentfulPageSection {
          title
          linkedContent {
            ... on ContentfulHelpMeUnderstandVideo {
              id: contentful_id
              title
              url
              tags
              videoUserGuide {
                file {
                  fileName
                  url
                }
              }
              description: videoDescription {
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
