import React from "react"
import { graphql } from "gatsby"
import SEO from "../../components/seo"
import Header from "../../components/header"
import { Container, Row, Col, Button } from "reactstrap"
import { MDXRenderer } from "gatsby-plugin-mdx"
import BreadcrumbSection from "../../components/BreadcrumbSection"

const MyersBriggsPage = ({ data }) => {
  const { banner, sections } = data.page
  const { image } = banner

  return (
    <>
      <SEO
        title="Myers Briggs Resources"
        image={image.file.url}
        url="https://pathwaymarietta.com/resources/mbti"
      />
      <Header background={image} xxs={true} />
      <div className="section-gray">
        <BreadcrumbSection
          crumbs={[
            { name: "Resources", link: "/resources" },
            {
              name: "Myers-Briggs",
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
              <Button
                color="primary"
                className="mt-3 mx-auto"
                onClick={() => alert("opening assessment")}
              >
                Take Assessment
              </Button>
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

export default MyersBriggsPage

export const data = graphql`
  {
    page: contentfulPages(title: { eq: "MBTI" }) {
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