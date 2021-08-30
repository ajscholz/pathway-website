import React from "react"
import { graphql } from "gatsby"

import SEO from "components/seo"
import Header from "components/header"

import { Container, Row, Col, Button } from "reactstrap"
import SeriesCard from "../components/cards/series-card"
import MessageCard from "../components/cards/MessageCard"
import { Link } from "gatsby"

const MessagesPage = ({
  data: {
    page: {
      banner: { heading, subHeading, image },
    },
    messageSeries,
    messages,
  },
}) => {
  return (
    <>
      <SEO
        title="Messages"
        image={image.file.url}
        url="https://pathwaymarietta.com/messages"
      />
      <Header title={heading} subtitle={subHeading} background={image} />
      <div
        className="section section-project cd-section section-gray"
        id="projects"
      >
        <Container>
          <Row className="mt-4 justify-content-center">
            {messages.all.map(message => {
              return (
                <Col
                  lg="6"
                  key={message.id}
                  className="d-flex flex-column text-center"
                >
                  <h2 className="title mb-4">Latest Message</h2>
                  <MessageCard messageData={message} />
                  <Button
                    color="primary"
                    size="lg"
                    tag={Link}
                    to="/messages/message-archive"
                    className="mt-3 mx-auto"
                  >
                    View More Messages
                  </Button>
                </Col>
              )
            })}

            {messageSeries.all.map(series => {
              return (
                <Col
                  lg="6"
                  key={series.id}
                  className="d-flex flex-column text-center mt-5 mt-lg-0"
                >
                  <h2 className="title mb-4">Latest Message Series</h2>
                  <SeriesCard seriesData={series} className="border-1" noDesc />
                  <Button
                    color="primary"
                    size="lg"
                    tag={Link}
                    to="/messages/series"
                    className="mt-3 mx-auto"
                  >
                    View More Series
                  </Button>
                </Col>
              )
            })}
          </Row>
        </Container>
      </div>
    </>
  )
}

export const data = graphql`
  {
    page: contentfulPages(slug: { eq: "messages" }) {
      ...HeaderFragment
    }
    messageSeries: allContentfulMessageSeries(
      sort: { fields: seriesStartDate, order: DESC }
      limit: 1
    ) {
      all: nodes {
        ...SeriesCardFragment
      }
    }
    messages: allContentfulMessage(
      sort: { fields: messageDate, order: DESC }
      limit: 1
    ) {
      all: nodes {
        ...MessageCardFragment
      }
    }
  }
`

export default MessagesPage
