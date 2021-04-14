import React from "react"
import { graphql } from "gatsby"

import SEO from "components/seo"
import Header from "components/header"

import ArchiveLayout from "../../components/layout/ArchiveLayout"
import BreadcrumbSection from "../../components/BreadcrumbSection"

const SeriesArchive = ({
  data: {
    page: {
      banner: { heading, subHeading, image },
    },
    messageSeries,
  },
}) => {
  return (
    <>
      <SEO
        title="Message Series Archive"
        image={image.file.url}
        url="https://pathwaymarietta.com/messages/series"
      />
      <Header background={image} xs />
      <ArchiveLayout
        items={messageSeries.all}
        itemType="Series"
        heading={heading}
      >
        <BreadcrumbSection
          crumbs={[
            { name: "Messages", link: "/messages" },
            { name: "Series", link: "/messages/series", active: true },
          ]}
        />
      </ArchiveLayout>
    </>
  )
}

export const data = graphql`
  {
    page: contentfulPages(title: { eq: "Series Archive" }) {
      ...HeaderFragment
    }
    messageSeries: allContentfulMessageSeries(
      sort: { fields: seriesStartDate, order: DESC }
    ) {
      all: nodes {
        ...SeriesCardFragment
      }
    }
  }
`

export default SeriesArchive
