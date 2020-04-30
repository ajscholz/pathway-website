import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import SEO from "components/seo"
import Header from "components/header"
import { Container, Row, Col } from "reactstrap"
import MissionSection from "../views/about/mission"
import OurTeam from "../views/about/our-team"
import UpcomingEventsSection from "../views/about/upcoming-events"

const AboutPage = props => {
  const { data } = props
  const { page, storyData } = data
  const { heading, subHeading, image } = page.banner

  return (
    <>
      <SEO
        title="About"
        image={image.file.url}
        url="https://pathwaymarietta.com/about"
      />
      <Header title={heading} subtitle={subHeading} background={image} />

      {/* ********* OUR STORY SECTION ********* */}
      <section className="team-1">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" md="8">
              <h2 className="title text-center">{storyData.title}</h2>
              <MDXRenderer className="text-left">
                {storyData.description.childMdx.body}
              </MDXRenderer>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ********* END OUR STORY SECTION ********* */}

      <MissionSection />

      <OurTeam />

      <UpcomingEventsSection />
      {/* ********* ADD CONTACT SECTION ********* */}
    </>
  )
}

export const data = graphql`
  {
    page: contentfulPages(title: { eq: "About" }) {
      ...HeaderFragment
    }
    storyData: contentfulPageSection(
      contentful_id: { eq: "3bYmAhy0IIJkCYusWEinxG" }
    ) {
      title
      description {
        childMdx {
          body
        }
      }
    }
  }
`

export default AboutPage
