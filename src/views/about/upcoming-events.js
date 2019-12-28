import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import { Container, Row, Col } from "reactstrap"
import { useRemovePastItems } from "../../utils/scripts/custom-hooks"

import EventCard from "../../components/cards/event-card"

const UpcomingEventsSection = () => {
  const { events } = useStaticQuery(graphql`
    {
      section: contentfulPageSection(title: { eq: "Upcoming Events" }) {
        title
        button: linkedContent {
          ... on ContentfulButton {
            text
            link
          }
        }
      }
      events: allContentfulEvent(sort: { fields: start, order: ASC }) {
        all: nodes {
          id: contentful_id
          title: eventName
          start(formatString: "dddd MMMM D, YYYY")
          end
          image {
            file {
              url
            }
            fluid {
              ...GatsbyContentfulFluid
            }
          }
          description {
            description
          }
          callToActionButton {
            link
            text
          }
        }
      }
    }
  `)

  const activeItems = useRemovePastItems(events.all)

  return (
    <section className="team-1">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" md="8">
            <h2 className="title text-center">{section.title}</h2>
          </Col>
        </Row>
        <Row>
          <Col md="6" lg="4">
            <EventCard event={activeItems[0]} />
          </Col>
          <Col md="6" lg="4">
            <EventCard event={activeItems[1]} />
          </Col>
          <Col className="d-md-none d-lg-block" lg="4">
            <EventCard event={activeItems[2]} />
          </Col>
        </Row>
        <Row>
          <Link
            className="btn btn-primary btn-lg mx-auto mt-3"
            to={section.button[0].link}
          >
            {section.button[0].text}
          </Link>
        </Row>
      </Container>
    </section>
  )
}

export default UpcomingEventsSection
