import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import {
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  Button,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  // UncontrolledDropdown,
} from "reactstrap"
import ThePathCard from "../../components/cards/the-path-card"
import { MDXRenderer } from "gatsby-plugin-mdx"

const AttendThePathSection = () => {
  const { section } = useStaticQuery(graphql`
    {
      section: contentfulPageSection(
        contentful_id: { eq: "41x9hFKNId3wLbMbWHZA7p" }
      ) {
        title
        linkedContent {
          ... on ContentfulMinistry {
            description {
              childMdx {
                body
              }
            }
            references {
              ... on ContentfulMinistry {
                id: contentful_id
                name
                alternateName
                day
                description {
                  childMdx {
                    body
                  }
                }
                references {
                  ... on ContentfulImageWithFocalPoint {
                    title
                    image {
                      fluid {
                        ...GatsbyContentfulFluid
                      }
                      file {
                        details {
                          image {
                            height
                            width
                          }
                        }
                      }
                    }
                    focalPoint {
                      focalPoint {
                        x
                        y
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  const [activePill, setActivePill] = React.useState("1")

  const steps = section.linkedContent[0].references

  return (
    <section className="section section-project cd-section pt-0">
      <div className="projects-1">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="8">
              <h2 className="title mt-0">{section.title}</h2>
              <h5 className="description">
                <MDXRenderer>
                  {section.linkedContent[0].description.childMdx.body}
                </MDXRenderer>
              </h5>
            </Col>
            {/* <div className="project-pills d-none d-lg-block"> */}
            <div className="project-pills">
              <Nav className="nav-pills-primary" pills>
                {steps.map((step, index) => {
                  index = index + 1
                  return (
                    <NavItem key={step.id}>
                      <NavLink
                        tag="button"
                        className={activePill === `${index}` ? "active" : ""}
                        onClick={e => {
                          e.preventDefault()
                          setActivePill(`${index}`)
                        }}
                        style={{ outline: "none", background: "transparent" }}
                      >
                        {step.name}
                      </NavLink>
                    </NavItem>
                  )
                })}
              </Nav>
              {/* Pill panes */}
              <TabContent activeTab={"pill-" + activePill}>
                <TabPane tabId={"pill-" + activePill} />
                <TabPane tabId={"pill-" + activePill} />
                <TabPane tabId={"pill-" + activePill} />
                <TabPane tabId={"pill-" + activePill} />
              </TabContent>
            </div>
            {/* <div className="col-sm-12 d-none d-sm-flex d-md-flex justify-content-center d-lg-none">
              <UncontrolledDropdown>
                <DropdownToggle
                  aria-expanded={false}
                  aria-haspopup={true}
                  caret
                  color="primary"
                  data-toggle="dropdown"
                  id="dropdownMenuButton"
                  type="button"
                >
                  Dropdown button
                </DropdownToggle>
                <DropdownMenu aria-labelledby="dropdownMenuButton">
                  <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                    Action
                  </DropdownItem>
                  <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                    Another action
                  </DropdownItem>
                  <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                    Something else here
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div> */}
          </Row>
          <div className="space-top" />
          <Row>
            {steps.map((step, index) => {
              index = (index + 1).toString()
              return (
                <React.Fragment key={step.id}>
                  {activePill === index && (
                    <Col fluid="true" lg={{ size: 10, offset: 1 }}>
                      <ThePathCard step={step} />
                    </Col>
                  )}
                </React.Fragment>
              )
            })}
          </Row>
          <Row>
            <Button
              color="primary"
              href="/take-a-step/growth-track"
              size="lg"
              className="mx-auto mt-5 text-white"
            >
              Growth Track
            </Button>
          </Row>
        </Container>
      </div>
    </section>
  )
}

export default AttendThePathSection
