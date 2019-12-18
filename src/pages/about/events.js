import React from "react"
import { graphql } from "gatsby"

import SEO from "components/seo"
import Header from "components/header"
import { Container, Row, Col } from "reactstrap"
import EventCard from "../../components/cards/event-card"

const EventsPage = props => {
  const { data } = props
  const { page, events } = data
  const { heading, image } = page.banner

  return (
    <>
      <SEO title="Events" />
      <Header title={heading} background={image} xs={true} />
      <div className="section">
        <Container>
          <Row>
            {events.all.map(({ event }) => {
              // only display the event if it's today or later
              const now = new Date()
              let eventDate = new Date(event.start)
              eventDate.setDate(eventDate.getDate() + 1)

              return eventDate > now ? (
                <Col md="6">
                  <EventCard event={event} />
                </Col>
              ) : null
            })}
          </Row>
        </Container>
      </div>
    </>
  )
}

export const data = graphql`
  {
    page: contentfulPages(title: { eq: "Events" }) {
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
    events: allContentfulEvent(sort: { fields: start, order: ASC }) {
      all: edges {
        event: node {
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
  }
`

export default EventsPage
