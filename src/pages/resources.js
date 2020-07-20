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
  Button,
} from "reactstrap"
import BreadcrumbSection from "../components/BreadcrumbSection"

const ResourcesPage = ({ data }) => {
  const { banner, sections } = data.page
  const { heading, image } = banner

  const videos = sections[0].linkedContent.slice(0, 3)

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
          <BreadcrumbSection
            crumbs={[{ name: "Resources", link: "/resources", active: true }]}
          />
          <h2 className="title text-center">{sections[0].title}</h2>
          <Row className="justify-content-center">
            {videos.map(video => (
              <Col md="6" lg="4" key={video.id}>
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
                <Link to={`/resources/help-me-understand${video.fields.slug}`}>
                  <Card
                    className="info text-left px-3 pb-0"
                    // data-background="color"
                    // data-color="dark"
                  >
                    <CardBody>
                      <h4
                        className="info-title text-primary mt-0"
                        style={{ textTransform: "capitalize" }}
                      >
                        {video.title.replace("Help Me Understand ", "")}
                      </h4>
                      <div
                        style={{
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        <MDXRenderer className="card-description">
                          {video.description.childMdx.body}
                        </MDXRenderer>
                      </div>

                      <CardFooter className="mt-4 text-left">
                        <div className="author">
                          {video.tags.map(tag => (
                            <Badge
                              // onClick={e => e.preventDefault()}
                              key={tag}
                              style={{ marginRight: "6px", color: "#FFF" }}
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
          <Row className="justify-content-center">
            <Button
              color="primary"
              tag={Link}
              to="/resources/help-me-understand"
              className="mt-3"
            >
              View More
            </Button>
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
              fields {
                slug
              }
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
