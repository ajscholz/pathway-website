import React from "react"
import { graphql } from "gatsby"
import SEO from "../../components/seo"
import Header from "../../components/header"
import BreadcrumbSection from "../../components/BreadcrumbSection"
import { Container, Row, Col } from "reactstrap"
// import HelpMeUnderstandVideoCard from "../../components/cards/HelpMeUnderstandVideoCard"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Controller from "../../components/assessments/Controller"

const SpiritualGiftsPage = ({ data }) => {
  const { banner, sections } = data.page
  const { image } = banner

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
            {/* {videos.map(video => (
              <Col md="6" lg="4" key={video.id} className="mb-4">
                <Link to={`/resources/help-me-understand${video.fields.slug}`}>
                  <HelpMeUnderstandVideoCard videoData={video} />
                </Link>
              </Col>
            ))} */}
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
        }
      }
    }
  }
`
