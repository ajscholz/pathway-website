import React from "react"
import { graphql } from "gatsby"

import SEO from "components/seo"
import Header from "components/header"
import { Container, Row, Col } from "reactstrap"
import EventCard from "../../components/cards/event-card"
import {
  useCenterColumns,
  useRemovePastItems,
} from "../../utils/scripts/custom-hooks"

const EventsPage = props => {
  const { data } = props
  const { page, events } = data
  const { heading, image } = page.banner

  const activeItems = useRemovePastItems(events.all)

  const colSizes = useCenterColumns(activeItems)

  return (
    <>
      <SEO
        title="Events"
        image={image.file.url}
        url="https://pathwaymarietta.com/about/events"
      />
      <Header title={heading} background={image} xs={true} />
      <div className="section">
        <Container>
          <Row>
            {activeItems.map((event, index) => (
              <Col {...colSizes[index]} key={event.id}>
                <EventCard event={event} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  )
}

export const data = graphql`
  {
    page: contentfulPages(title: { eq: "Events" }) {
      ...HeaderFragment
    }
    events: allContentfulEvent(sort: { fields: start, order: ASC }) {
      all: nodes {
        id: contentful_id
        title: eventName
        start(formatString: "dddd MMMM D, YYYY")
        displayStart: start(formatString: "dddd, MMM DD")
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
`

export default EventsPage
