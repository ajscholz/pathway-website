import React from "react"
import { graphql } from "gatsby"

import SEO from "../../components/seo"
import Header from "../../components/header"

import ArchiveLayout from "../../components/layout/ArchiveLayout"
import BreadcrumbSection from "../../components/BreadcrumbSection"

const MessageArchive = ({
  data: {
    page: {
      banner: { heading, subHeading, image },
    },
    messages,
  },
}) => {
  return (
    <>
      <SEO
        title="Message Archive"
        description="Find all the weekly Sunday messages from Pathway Community Church in Marietta, Ohio."
        image={image.file.url}
        url="https://pathwaymarietta.com/messages/message-archive"
      />
      <Header
        title={heading}
        subtitle={subHeading}
        background={image}
        xs={true}
      />
      <ArchiveLayout items={messages.all} itemType="Messages">
        <BreadcrumbSection
          crumbs={[
            { name: "Messages", link: "/messages" },
            { name: "Message Archive", link: "", active: true },
          ]}
        />
      </ArchiveLayout>
    </>
  )
}

export const data = graphql`
  {
    page: contentfulPages(title: { eq: "Message Archive" }) {
      ...HeaderFragment
    }
    messages: allContentfulMessage(sort: { fields: messageDate, order: DESC }) {
      all: nodes {
        ...MessageCardFragment
      }
    }
  }
`

export default MessageArchive
