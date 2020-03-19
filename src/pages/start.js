import React from "react"
import { graphql } from "gatsby"

import SEO from "components/seo"
import Header from "components/header"
import FirstStepsSection from "../views/start/first-steps-section"
import ExploreOurMinistriesSection from "../views/start/explore-our-ministries-section"
import AttendThePathSection from "../views/start/attend-the-path-section"

const StartPage = props => {
  const { data } = props
  const { heading, subHeading, image } = data.page.banner

  return (
    <>
      <SEO title="Start" />
      <Header title={heading} subtitle={subHeading} background={image} />
      <FirstStepsSection />
      <ExploreOurMinistriesSection />
      <AttendThePathSection />
    </>
  )
}

export const data = graphql`
  {
    page: contentfulPages(title: { eq: "Start" }) {
      banner {
        heading
        subHeading
        image {
          fluid(maxWidth: 2000, quality: 80) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
  }
`

export default StartPage
