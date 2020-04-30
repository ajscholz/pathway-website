import React from "react"
import { graphql } from "gatsby"

import SEO from "components/seo"
import Header from "components/header"

import { Container, Row, Col } from "reactstrap"
import SeriesCard from "../components/cards/series-card"

const MessagesPage = props => {
  const { data } = props
  const { page, messageSeries } = data
  const { heading, subHeading, image } = page.banner

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
            {messageSeries.all.map(({ series }) => {
              return (
                <Col md="6" lg="4" key={series.id}>
                  <SeriesCard seriesData={series} className="border-1" />
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
    page: contentfulPages(title: { eq: "Messages" }) {
      ...HeaderFragment
    }
    messageSeries: allContentfulMessageSeries(
      limit: 6
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
