import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Container, Col, Button } from "reactstrap"

import SEO from "../components/seo"
import Header from "../components/header"
import ButtonCard from "../components/cards/button-card"
import CountdownTimer from "../components/CountdownTimer"

const IndexPage = ({ data }) => {
  const { page, messages, times } = data
  const { banner, sections } = page
  const { heading, image, subHeading } = banner

  const pageSections = sections.filter(
    section => section.__typename === "ContentfulInformationSection"
  )

  // let d = new Date()

  // // get last Sunday's date
  // do {
  //   d.setDate(d.getDate() - 1)
  // } while (d.getDay() !== 0)

  // const prevWeekLink = videos.all.find(video => {
  //   const vidDate = new Date(video.dateTime)
  //   return vidDate.toDateString() === d.toDateString()
  // })

  // console.log(sections[0])

  // // make sure there is a previous weeks' video -- if not then just grab the last existing video
  sections[0].button.link = messages.all[0].fullServiceVideoLink

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
      <CountdownTimer />
      <SEO
        title="Home"
        image={image.file.url}
        url="https://pathwaymarietta.com"
      />
      <Header
        title={heading}
        subtitle={subHeading}
        background={image}
        full={true}
        countdown={true}
      >
        {/* <div className="text-primary"> */}
        <h3>
          {/* {`Saturdays, 6pm`}
          <br /> */}
          {`Sundays  |  ${times.serviceTimes.join(", ")}am`}
        </h3>
        <h5 className="text-primary">{`113 Ellsworth Ave., Marietta, OH`}</h5>
        <Button
          size="lg"
          color="danger"
          className="mt-4"
          href="https://pathwaymarietta.online.church"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="mr-2 nc-icon nc-tap-01" />
          Watch Live
        </Button>
        {/* </div> */}
      </Header>
      <section>
        <Container fluid style={{ padding: "0", margin: "0" }}>
          <div className="row no-gutters">
            {pageSections.map((section, i) => {
              return (
                <Col
                  key={section.id}
                  sm={12}
                  md={6}
                  xl={4}
                  className={
                    i === 2
                      ? "order-md-3 order-xl-2"
                      : i === 3
                      ? "order-md-2 order-xl-3"
                      : `order-md-${i}`
                  }
                >
                  <ButtonCard
                    sectionData={sections[i]}
                    className="mb-0"
                    button={i === 0 && "solid"}
                    buttonSize={i === 0 && "lg"}
                  />
                </Col>
              )
            })}
          </div>
        </Container>
      </section>
    </>
  )
}

export const data = graphql`
  {
    page: contentfulPage(slug: { eq: "index" }) {
      ...HeaderFragment
      sections {
        ... on ContentfulInformationSection {
          __typename
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
    messages: allContentfulMessage(
      limit: 1
      sort: { fields: messageDate, order: DESC }
    ) {
      all: nodes {
        fullServiceVideoLink
      }
    }
    times: contentfulChurchInformation {
      serviceTimes
    }
  }
`

export default IndexPage
