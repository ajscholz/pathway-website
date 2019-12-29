import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"

import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
} from "reactstrap"
import { MDXRenderer } from "gatsby-plugin-mdx"
import LinkButton from "../../components/buttons/link-button"

const ExploreOurMinistriesSection = () => {
  const { section } = useStaticQuery(graphql`
    {
      section: contentfulPageSection(
        contentful_id: { eq: "4QSw5MQhZWeF1AXDvXiTvc" }
      ) {
        title
        linkedContent {
          ... on ContentfulInformationSection {
            title
            subtitle
            description {
              childMdx {
                body
              }
            }
            callToAction {
              text
              link
            }
            references {
              name
              times
              day
              ageRange
              logo {
                title
                fluid {
                  ...GatsbyContentfulFluid
                }
              }
            }
          }
        }
      }
    }
  `)

  const students = section.linkedContent[0]
  const kids = section.linkedContent[1]
  const groups = section.linkedContent[2]
  console.log(groups)
  return (
    <section className="section section-project cd-section">
      <div className="projects-2 section section-dark">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="8">
              <h2 className="title">{section.title}</h2>
              {/* <h5 className="description">
                This is the paragraph where you can write more details about
                your projects. Keep you user engaged by providing meaningful
                information.
              </h5> */}
            </Col>
          </Row>
          <div className="space-top" />
          <Row>
            <Col md="4">
              <Card className="card-plain">
                <CardImg
                  top
                  tag="div"
                  className="bg-white img-rounded"
                  style={{ maxHeight: "210px" }}
                >
                  <Image
                    style={{
                      maxHeight: "100%",
                      maxWidth: "210px",
                      margin: "0 auto",
                    }}
                    imgStyle={{ maxHeight: "100%" }}
                    alt={students.references[0].logo.title}
                    className="img"
                    fluid={students.references[0].logo.fluid}
                  />
                </CardImg>
                <CardBody>
                  <CardTitle tag="h4">{students.title}</CardTitle>
                  <br />
                  <h6 className="card-category text-muted">
                    {students.ageRange}
                  </h6>
                  <div className="card-description">
                    <MDXRenderer>
                      {students.description.childMdx.body}
                    </MDXRenderer>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-plain">
                <CardImg
                  top
                  tag="div"
                  className="bg-white img-rounded"
                  style={{ maxHeight: "210px" }}
                >
                  <Image
                    style={{
                      maxHeight: "100%",
                      maxWidth: "210px",
                      margin: "0 auto",
                    }}
                    imgStyle={{ maxHeight: "100%" }}
                    alt={kids.references[0].logo.title}
                    className="img"
                    fluid={kids.references[0].logo.fluid}
                  />
                </CardImg>
                <CardBody>
                  <CardTitle tag="h4">{kids.title}</CardTitle>
                  <br />
                  <h6 className="card-category text-muted">{kids.ageRange}</h6>
                  <div className="card-description">
                    <MDXRenderer>{kids.description.childMdx.body}</MDXRenderer>
                  </div>
                  <LinkButton
                    button={kids.callToAction}
                    color="primary"
                    className="mt-3"
                    outline
                  />
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-plain">
                <CardImg
                  top
                  tag="div"
                  className="bg-white img-rounded"
                  style={{ maxHeight: "210px" }}
                >
                  <Image
                    style={{
                      maxHeight: "100%",
                      maxWidth: "210px",
                      margin: "0 auto",
                    }}
                    imgStyle={{ maxHeight: "100%" }}
                    alt={groups.references[0].logo.title}
                    className="img"
                    fluid={groups.references[0].logo.fluid}
                  />
                </CardImg>
                <CardBody>
                  <CardTitle tag="h4">{groups.title}</CardTitle>
                  <br />
                  <h6 className="card-category text-muted">
                    {groups.ageRange}
                  </h6>
                  <div className="card-description">
                    <MDXRenderer>
                      {groups.description.childMdx.body}
                    </MDXRenderer>
                  </div>
                  {/* <LinkButton button={groups.callToAction} /> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  )
}

export default ExploreOurMinistriesSection
