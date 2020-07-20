import React, { useState } from "react"
import { graphql } from "gatsby"

import SEO from "components/seo"
import Header from "components/header"

import { Container, Row, Col, Button } from "reactstrap"
import SeriesCard from "../components/cards/series-card"

const MessagesPage = ({
  data: {
    page: {
      banner: { heading, subHeading, image },
    },
    messageSeries,
  },
}) => {
  const [showFold, setShowFold] = useState(false)

  const aboveFoldSeries = messageSeries.all.slice(0, 6)
  const belowFoldSeries = messageSeries.all.slice(6)

  return (
    <>
      <SEO
        title="Messages"
        image={image.file.url}
        url="https://pathwaymarietta.com/messages"
      />
      <Header title={heading} subtitle={subHeading} background={image} />
      <div className="section section-project cd-section" id="projects">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="8">
              <h2 className="title mb-4">Recent Message Series</h2>
            </Col>
          </Row>
          <Row className="mt-4">
            {aboveFoldSeries.map(({ series }) => {
              return (
                <Col md="6" lg="4" key={series.id}>
                  <SeriesCard seriesData={series} className="border-1" />
                </Col>
              )
            })}
          </Row>

          {showFold ? (
            <Row className="mt-4">
              {belowFoldSeries.map(({ series }) => {
                return (
                  <Col md="6" lg="4" key={series.id}>
                    <SeriesCard seriesData={series} className="border-1" />
                  </Col>
                )
              })}
            </Row>
          ) : (
            <Row className="justify-content-center">
              {/* <Col fluid> */}
              <Button
                color="primary"
                size="lg"
                onClick={() => setShowFold(true)}
                className="mt-5"
              >
                View More Series
              </Button>
              {/* </Col> */}
            </Row>
          )}
        </Container>
      </div>
    </>
  )
}

export const data = graphql`
  {
    page: contentfulPages(title: { eq: "Messages" }) {
      ...HeaderFragment
    }
    messageSeries: allContentfulMessageSeries(
      sort: { fields: seriesStartDate, order: DESC }
    ) {
      all: edges {
        series: node {
          id: contentful_id
          title: seriesTitle
          desc: seriesDescription {
            desc: seriesDescription
          }
          start: seriesStartDate(formatString: "MMMM")
          end: seriesEndDate(formatString: "MMMM")
          year: seriesStartDate(formatString: "YYYY")
          graphic: seriesGraphic {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default MessagesPage
