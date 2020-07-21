import React from "react"

import { graphql } from "gatsby"

import { Container, Row, Col } from "reactstrap"
import Header from "../components/header"
import BreadcrumbSection from "../components/BreadcrumbSection"
import SEO from "../components/seo"
import MessageCard from "../components/cards/MessageCard"

const MessageSeriesTemplate = ({
  data: {
    messages,
    series: {
      title,
      start,
      end,
      length,
      year,
      desc: { desc },
      graphic,
      fields: { slug },
    },
  },
}) => {
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

  const date = start === end ? `${start} ${year}` : `${start}-${end} ${year}`

  return (
    <>
      <SEO
        title={title}
        description={desc}
        image={graphic.file.url}
        url={`https://pathwaymarietta.com/messages/series${slug}`}
      />
      <Header background={graphic} xs={true} />
      <div className="section section-gray">
        <Container>
          <Row className="justify-content-md-center">
            <Col className="px-0">
              <BreadcrumbSection
                crumbs={[
                  { name: "Messages", link: "/messages" },
                  { name: "Series", link: "/messages/series" },
                  { name: `${title} Series`, link: "", active: true },
                ]}
              />
            </Col>
          </Row>
          <Row
            className="justify-content-md-center"
            style={{ marginBottom: "40px" }}
          >
            <Col>
              <h2 className="title">{`${title} Message Series`}</h2>
              <h6 className="p-0 text-primary">
                {`${date}`}&nbsp;&nbsp;&#8226;&nbsp;&nbsp;
                {`${length} ${length > 1 ? "Parts" : "Part"}`}
              </h6>
              <p className="author">{desc.desc}</p>
            </Col>
          </Row>

          <Row className="mb-n4">
            {messages.all.map(message => {
              return (
                <Col key={message.id} md="6" lg="4" className="mb-4">
                  <MessageCard messageData={message} />
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
        file {
          url
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
      all: nodes {
        ...MessageCardFragment
      }
    }
  }
`

export default MessageSeriesTemplate
