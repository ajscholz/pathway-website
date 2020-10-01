import React from "react"
import { graphql, Link } from "gatsby"
import SEO from "../../components/seo"
import Header from "../../components/header"
import BreadcrumbSection from "../../components/BreadcrumbSection"
import { Container, Row, Col } from "reactstrap"
// import HelpMeUnderstandVideoCard from "../../components/cards/HelpMeUnderstandVideoCard"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Controller from "../../components/assessments/Controller"
import SpiritualGiftsCard from "../../components/cards/SpiritualGiftsCard"

const SpiritualGiftsPage = ({ data }) => {
  const { banner, sections } = data.page
  const { image } = banner

  const videos = [...sections[1].linkedContent].sort((a, b) => {
    if (a.slug > b.slug) return 1
    if (a.slug < b.slug) return -1
    return 0
  })

  return (
    <>
      <SEO
        title="Spiritual Gifts Resources"
        image={image.file.url}
        url="https://pathwaymarietta.com/resources/spiritual-gifts"
      />
      <Header background={image} xxs={true} />
      <div className="section-gray">
        <BreadcrumbSection
          crumbs={[
            { name: "Resources", link: "/resources" },
            {
              name: "Spiritual Gifts",
              link: "",
              active: true,
            },
          ]}
        />
      </div>
      <section className="section section-gray">
        <Container>
          <Row className="justify-content-center">
            <Col className="d-flex flex-column">
              <h1 className="h2 title text-center mt-0">{sections[0].title}</h1>
              <MDXRenderer>{sections[0].description.childMdx.body}</MDXRenderer>
              <Controller type="sg">Take Assessment</Controller>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section section-dark">
        <Container>
          <Row>
            <Col>
              <h1 className="h2 title text-center mt-0">{sections[1].title}</h1>
            </Col>
          </Row>
          <Row>
            {videos.map(video => (
              <Col md="6" lg="4" key={video.id} className="mb-4">
                {/* <VideoModal video={video}> */}
                <Link to={`/resources/spiritual-gifts/${video.slug}`}>
                  <SpiritualGiftsCard videoData={video} />
                </Link>
                {/* </VideoModal> */}
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  )
}

export default SpiritualGiftsPage

export const data = graphql`
  query MyQuery {
    page: contentfulPages(title: { eq: "Spiritual Gifts" }) {
      title
      ...HeaderFragment
      sections {
        ... on ContentfulInformationSection {
          title
          description {
            childMdx {
              body
            }
          }
        }
        ... on ContentfulPageSection {
          title
          linkedContent {
            ... on ContentfulSpiritualGiftsVideo {
              ...SpiritualGiftsCardFragment
            }
          }
        }
      }
    }
  }
`
