import React from "react"

import { graphql } from "gatsby"

import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap"

const MessageSeriesTemplate = () => {
  return (
    <>
      <div style={{ height: "131.22px" }} className="bg-dark" />
      <div className="section secion-blog cd-section">
        hello from series template
      </div>
      <hr />
      <div style={{ height: "20px" }} />
    </>
  )
}

export const data = graphql`
  query($slug: String) {
    contentfulMessageSeries(fields: { slug: { eq: $slug } }) {
      seriesTitle
      seriesStartDate
      seriesEndDate
      seriesDescription {
        seriesDescription
      }
    }
  }
`

export default MessageSeriesTemplate
