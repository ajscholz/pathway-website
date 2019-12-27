import React from "react"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import SEO from "components/seo"
import Header from "components/header"
import { Button, Container, Row, Col } from "reactstrap"
import TeamMemberCard from "../components/cards/team-member-card"
import MissionSection from "../views/about/mission"

const AboutPage = props => {
  const { data } = props
  const { page, storyData, teamData } = data
  const { heading, subHeading, image } = page.banner

  return (
    <>
      <SEO title="About" />
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

      {/* ********* OUR TEAM SECTION ********* */}
      <section className="team-1 bg-dark ">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="8">
              <h2 className="title text-light">{teamData.title}</h2>
              {/* <h5 className="description">
                This is the paragraph where you can write more details about
                your team. Keep you user engaged by providing meaningful
                information.
              </h5> */}
            </Col>
          </Row>
          <Row>
            {teamData.linkedContent.map(person => {
              return (
                <Col md="6" lg="4">
                  <TeamMemberCard person={person} />
                </Col>
              )
            })}
          </Row>
        </Container>
      </section>
      {/* ********* END OUR TEAM SECTION ********* */}

      {/* ********* ADD EVENTS SECTION -- SHOW NEXT 3 THINGS AND LINK TO MORE EVENTS ********* */}

      {/* ********* ADD CONTACT SECTION ********* */}

      
    </>
  )
}

export const data = graphql`
  {
    page: contentfulPages(title: { eq: "About" }) {
      banner {
        heading
        subHeading
        image {
          fluid(resizingBehavior: FILL) {
            ...GatsbyContentfulFluid
          }
        }
      }
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

    teamData: contentfulPageSection(
      contentful_id: { eq: "5VExuaOKaFyomQTxqYjsex" }
    ) {
      title
      linkedContent {
        ... on ContentfulTeamMember {
          id: contentful_id
          name
          position
          profile {
            profile
          }
          email
          picture {
            title
            fixed(width: 112) {
              ...GatsbyContentfulFixed
            }
          }
        }
      }
    }
  }
`

export default AboutPage
