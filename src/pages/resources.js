import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Header from "../components/header"
import { Link } from "gatsby"

import { Container, Row, Col, Button } from "reactstrap"
import BreadcrumbSection from "../components/BreadcrumbSection"
import HelpMeUnderstandVideoCard from "../components/cards/HelpMeUnderstandVideoCard"
import MBTICard from "../components/cards/MBTICard"

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
        <Header title={heading} background={image} xxs={true} />
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
            {section.videos !== null && (
              <Row className="justify-content-center">
                {[...section.videos].slice(0, 3).map(video => (
                  <Col md="6" lg="4" key={video.id}>
                    <Link
                      to={`/resources/${
                        section.title === "Help Me Understand Videos"
                          ? "help-me-understand"
                          : section.title === "Myers Briggs Resources"
                          ? "mbti"
                          : section.title === "Spiritual Gifts Resources"
                          ? "spiritual-gifts"
                          : "enneagram"
                      }/${video.slug}`}
                    >
                      {section.title === "Help Me Understand Videos" ? (
                        <HelpMeUnderstandVideoCard videoData={video} image />
                      ) : (
                        <MBTICard videoData={video} />
                      )}
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
          videos: linkedContent {
            ... on ContentfulHelpMeUnderstandVideo {
              ...HelpMeUnderstandVideoCardFragment
            }
            ... on ContentfulMyersBriggsVideo {
              ...MBTICardFragment
            }
          }
        }
      }
    }
  }
`
