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

  // const videos = [...sections[0].linkedContent].slice(0, 3)

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

      {sections.map((section, index) => (
        <section
          className={`section section-${index % 2 === 0 ? "gray" : "dark"}`}
          key={section.title}
        >
          <Container>
            <h2 className="title text-center mt-0">{section.title}</h2>
            {section.linkedContent !== null && (
              <Row className="justify-content-center">
                {[...section.linkedContent].slice(0, 3).map(video => (
                  <Col md="6" lg="4" key={video.id}>
                    <Link to={`/resources/help-me-understand/${video.slug}`}>
                      <HelpMeUnderstandVideoCard videoData={video} image />
                    </Link>
                  </Col>
                ))}
              </Row>
            )}
            <Row className="justify-content-center">
              <Button
                color="primary"
                size="lg"
                tag={Link}
                to={`/resources/${
                  section.title.includes("Help Me")
                    ? "help-me-understand"
                    : section.title.includes("Enneagram")
                    ? "enneagram"
                    : section.title.includes("Myers")
                    ? "mbti"
                    : "spiritual-gifts"
                }`}
                className="mt-3"
              >
                More Resources
              </Button>
            </Row>
          </Container>
        </section>
      ))}
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
