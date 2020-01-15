import React from "react"

import { graphql, Link } from "gatsby"

import { Container, Row, Col, Card, CardBody } from "reactstrap"
import Header from "../components/header"

const MessageSeriesTemplate = props => {
  const { data } = props
  const { messages, series } = data
  let { title, start, end, length, year, desc, graphic } = series

  if (start === null || start === undefined) {
    start = new Date().getMonth()
  }
  if (end === null || end === undefined) {
    end = new Date().getMonth()
  }
  if (length === null || length === undefined) {
    length = 4
  }
  if (year === null || year === undefined) {
    year = new Date().getFullYear()
  }
  if (desc === null || desc === undefined) {
    desc = { desc: "Here's some placeholder text" }
  }
  if (graphic === null || graphic === undefined) {
    graphic = { fluid: {} }
  }

  console.log("desc = ", desc)

  const date = start === end ? `${start} ${year}` : `${start}-${end} ${year}`

  return (
    <>
      <Header background={graphic} xs={true} />
      <div className="section">
        <Container>
          <Row
            className="justify-content-md-center"
            style={{ marginBottom: "40px" }}
          >
            <Col md="10">
              <h2 className="title">{`${title} Message Series`}</h2>
              <h6 className="p-0 text-muted">
                {`${date}`}&nbsp;&nbsp;&#8226;&nbsp;&nbsp;
                {`${length} Parts`}
              </h6>
              <p className="author">{desc.desc}</p>
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            {messages.all.map(({ message }, index) => {
              return (
                <Col key={message.id} md="10">
                  <Link
                    to={`/messages/series${series.fields.slug}${message.fields.slug}`}
                  >
                    <Card
                      className="info info-horizontal py-0"
                      data-background="color"
                      data-color="dark"
                      style={{ maxWidth: "unset" }}
                    >
                      <CardBody>
                        <div className="icon icon-primary pl-4">
                          <strong>{`P${index + 1}`}</strong>
                        </div>

                        <h4 className="info-title text-white">
                          {message.title}
                        </h4>
                        <h6 className="text-muted mb-3 mt-n2">
                          {message.date}
                        </h6>
                      </CardBody>
                    </Card>
                  </Link>
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
  query($slug: String) {
    series: contentfulMessageSeries(fields: { slug: { eq: $slug } }) {
      title: seriesTitle
      start: seriesStartDate(formatString: "MMMM")
      end: seriesEndDate(formatString: "MMMM")
      year: seriesStartDate(formatString: "YYYY")
      length
      desc: seriesDescription {
        desc: seriesDescription
      }
      graphic: seriesGraphic {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      fields {
        slug
      }
    }
    messages: allContentfulMessage(
      filter: { messageSeries: { fields: { slug: { eq: $slug } } } }
      sort: { fields: messageDate, order: ASC }
    ) {
      all: edges {
        message: node {
          id: contentful_id
          title: messageTitle
          date: messageDate(formatString: "MMMM DD, YYYY")
          fields {
            slug
          }
        }
      }
    }
  }
`

export default MessageSeriesTemplate
