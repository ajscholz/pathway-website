import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Header from "../components/header"
import { Link } from "gatsby"

import { Container, Row, Col, Button } from "reactstrap"
import BreadcrumbSection from "../components/BreadcrumbSection"
import HelpMeUnderstandVideoCard from "../components/cards/HelpMeUnderstandVideoCard"

const ResourcesPage = ({ data }) => {
  const { banner, sections } = data.page
  const { heading, image } = banner

  const videos = [...sections[0].linkedContent].slice(0, 3)

  return (
    <>
      <SEO
        title="Resources"
        image={image.file.url}
        url="https://pathwaymarietta.com/resources"
      />
      <div className="section-gray">
        <Header title={heading} background={image} xs={true} />
        <BreadcrumbSection
          crumbs={[{ name: "Resources", link: "/resources", active: true }]}
        />
      </div>
      <section className="section section-gray">
        <Container>
          <h2 className="title text-center mt-0">{sections[0].title}</h2>
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
                <Link to={`/resources/help-me-understand/${video.slug}`}>
                  <HelpMeUnderstandVideoCard videoData={video} />
                </Link>
              </Col>
            ))}
          </Row>
          <Row className="justify-content-center">
            <Button
              color="primary"
              size="lg"
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
            ... on ContentfulResourceVideo {
              ...HelpMeUnderstandVideoCardFragment
            }
          }
        }
      }
    }
  }
`
