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

  // set background of alternating sections to white

  let counter = 0

  while (counter < sections.length) {
    if (counter % 2 === 0) {
      sections[counter].background = ""
    }
    // if (counter === 0 || counter === 3) {
    //   sections[counter].full = true
    // } else {
    //   sections[counter].full = false
    // }
    counter++
  }

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
            {sections.map((section, i) => (
              <Col
                key={section.id}
                sm={12}
                xl={4}
                // md={section.full === true ? 12 : 6}
              >
                <ButtonCard
                  sectionData={sections[i]}
                  className="mb-0"
                  button={i === 0 && "solid"}
                  buttonSize={i === 0 && "lg"}
                />
              </Col>
            ))}
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
          id: contentful_id
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
