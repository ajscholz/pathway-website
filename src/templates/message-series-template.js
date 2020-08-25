import React from "react"

import { graphql } from "gatsby"

import { Container, Row, Col } from "reactstrap"
import Header from "../components/header"
import BreadcrumbSection from "../components/BreadcrumbSection"
import SEO from "../components/seo"
import MessageCard from "../components/cards/MessageCard"
import Metadata from "../components/Metadata"

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
      slug,
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
        url={`https://pathwaymarietta.com/messages/series/${slug}`}
      />
      <Header background={graphic} xs={true} />
      <div className="section-gray">
        <BreadcrumbSection
          crumbs={[
            { name: "Messages", link: "/messages" },
            { name: "Series", link: "/messages/series" },
            { name: `${title} Series`, link: "", active: true },
          ]}
        />
      </div>
      <section className="section section-gray">
        <Container>
          <Row
            className="justify-content-md-center"
            style={{ marginBottom: "40px" }}
          >
            <Col>
              <h1 className="title h2 mt-0">{`${title} Message Series`}</h1>
              <Metadata>
                {`${date}`}
                {`${length} ${length > 1 ? "Parts" : "Part"}`}
              </Metadata>
              <p className="author">{desc}</p>
            </Col>
          </Row>

          <Row className="mb-n4">
            <Col xs={12}>
              <h2 className="h3 mb-3">Messages</h2>
            </Col>
            {messages.all.map(message => {
              return (
                <Col key={message.id} md="6" lg="4" className="mb-4">
                  <MessageCard messageData={message} />
                </Col>
              )
            })}
          </Row>
        </Container>{" "}
      </section>
    </>
  )
}

export const data = graphql`
  query($slug: String) {
    series: contentfulMessageSeries(slug: { eq: $slug }) {
      title: seriesTitle
      start: seriesStartDate(formatString: "MMMM")
      end: seriesEndDate(formatString: "MMMM")
      year: seriesStartDate(formatString: "YYYY")
      length
      slug
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
    }
    messages: allContentfulMessage(
      filter: { messageSeries: { slug: { eq: $slug } } }
      sort: { fields: messageDate, order: ASC }
    ) {
      all: nodes {
        ...MessageCardFragment
      }
    }
  }
`

export default MessageSeriesTemplate
