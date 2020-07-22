import React from "react"
import { graphql } from "gatsby"
import SEO from "../../components/seo"
import Header from "../../components/header"

import { Link } from "gatsby"
import BreadcrumbSection from "../../components/BreadcrumbSection"

import { Container, Row, Col } from "reactstrap"
import HelpMeUnderstandVideoCard from "../../components/cards/HelpMeUnderstandVideoCard"

const HelpMeUnderstandPage = ({ data }) => {
  const { banner, sections } = data.page
  const { image } = banner

  const videos = sections[0].linkedContent

  return (
    <>
      <SEO
        title="Resources"
        image={image.file.url}
        url="https://pathwaymarietta.com/resources"
      />
      <Header background={image} xxs={true} />
      <section className="blog-2 section section-gray">
        <BreadcrumbSection
          crumbs={[
            { name: "Resources", link: "/resources" },
            { name: "Help Me Understand Videos", link: "", active: true },
          ]}
        />
        <Container>
          <h1 className="h2 title text-center">{sections[0].title}</h1>
          <Row className="justify-content-center">
            {videos.map(video => (
              <Col md="6" lg="4" key={video.id} className="mb-4">
                <Link to={`/resources/help-me-understand${video.fields.slug}`}>
                  <HelpMeUnderstandVideoCard videoData={video} />
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  )
}

export default HelpMeUnderstandPage

export const data = graphql`
  {
    page: contentfulPages(title: { eq: "Help Me Understand Videos" }) {
      ...HeaderFragment
      sections {
        ... on ContentfulPageSection {
          title
          linkedContent {
            ... on ContentfulHelpMeUnderstandVideo {
              ...HelpMeUnderstandVideoCardFragment
              id: contentful_id
              fields {
                slug
              }
              videoUserGuide {
                file {
                  fileName
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`
