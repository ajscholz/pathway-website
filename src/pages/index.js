import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import Header from "../components/header"
import ButtonCard from "../components/cards/button-card"

import { Container, Col } from "reactstrap"

const IndexPage = ({ data }) => {
  const { page, videos } = data
  const { banner, sections } = page
  const { heading, image } = banner

  let d = new Date()

  // get last Sunday's date
  do {
    d.setDate(d.getDate() - 1)
  } while (d.getDay() !== 0)

  const prevWeekLink = videos.all.find(video => {
    const vidDate = new Date(video.dateTime)
    return vidDate.toDateString() === d.toDateString()
  })

  sections[0].button.link = prevWeekLink.videoUrl

  // set background of first section
  let whiteSection = sections[0]
  whiteSection.background = ""

  return (
    <>
      <SEO
        title="Home"
        image={image.file.url}
        url="https://pathwaymarietta.com"
      />
      <Header
        title={heading}
        subtitle={`Worship online beginning at 10:30am every Sunday`}
        background={image}
        full={true}
        countdown={true}
      />
      <section>
        <Container fluid style={{ padding: "0", margin: "0" }}>
          <div className="row no-gutters">
            <Col>
              <ButtonCard
                sectionData={sections[0]}
                className="mb-0"
                button="solid"
                buttonSize="lg"
              />
            </Col>
          </div>
          <div className="row no-gutters">
            <Col md="6">
              <ButtonCard sectionData={sections[1]} className="mb-0" />
            </Col>
            <Col md="6">
              <ButtonCard sectionData={sections[2]} className="mb-0" />
            </Col>
          </div>
          <div className="row no-gutters">
            <Col md={8} className="mx-auto">
              <ButtonCard
                sectionData={sections[3]}
                className="mb-0"
                button="solid"
              />
            </Col>
          </div>
          <div className="row no-gutters">
            <Col md="12" className="mx-auto">
              <ButtonCard
                sectionData={sections[4]}
                className="mb-0 card-plain no-border"
                button="solid"
              />
            </Col>
          </div>
        </Container>
      </section>
    </>
  )
}

export const data = graphql`
  {
    page: contentfulPages(title: { eq: "Index" }) {
      ...HeaderFragment
      sections {
        ... on ContentfulInformationSection {
          title
          subtitle
          description {
            childMdx {
              body
            }
          }
          button: callToAction {
            text
            link
          }
          background {
            fluid(maxWidth: 1000, quality: 60) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
    videos: allContentfulStreamingVideo(
      sort: { fields: dateTime, order: DESC }
      limit: 10
    ) {
      all: nodes {
        dateTime
        videoUrl
      }
    }
  }
`

export default IndexPage
