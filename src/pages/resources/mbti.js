import React from "react"
import { graphql, Link } from "gatsby"
import SEO from "../../components/seo"
import Header from "../../components/header"
import { Container, Row, Col } from "reactstrap"
import { MDXRenderer } from "gatsby-plugin-mdx"
import BreadcrumbSection from "../../components/BreadcrumbSection"
import Controller from "../../components/assessments/Controller"
// import VideoModal from "../../components/VideoModal"
import MBTICard from "../../components/cards/MBTICard"
import VimeoPlayer from "react-player/lib/players/Vimeo"

const MyersBriggsPage = ({ data }) => {
  const { banner, sections } = data.page
  const { image } = banner

  const videos1 = [...sections[1].linkedContent]
  const videos2 = [...sections[2].linkedContent]

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
              <Controller type="mbti">Take Assessment</Controller>
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
            {videos1.map(video => (
              <Col
                md="10"
                lg="8"
                key={video.id}
                className="mb-4 mx-auto text-center text-light"
              >
                <MDXRenderer>{video.description.childMdx.body}</MDXRenderer>

                <div
                  className="mt-5"
                  style={{
                    position: "relative",
                    paddingTop: "56.25%",
                    width: "100%",
                  }}
                >
                  <VimeoPlayer
                    url={video.url}
                    controls={true}
                    light={true}
                    config={{
                      vimeo: {
                        playerOptions: {
                          // controls: true,/
                          // title: true,
                          // transparent: true,
                        },
                      },
                    }}
                    width="100%"
                    height="100%"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  />
                </div>
                {/* <VideoModal video={video}> */}
                {/* <Link to={`/resources/mbti/${video.slug}`}>
                  <MBTICard videoData={video} />
                </Link> */}
                {/* </VideoModal> */}
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section className="section">
        <Container>
          <Row>
            <Col>
              <h1 className="h2 title text-center mt-0">{sections[2].title}</h1>
            </Col>
          </Row>
          <Row>
            {videos2.map(video => (
              <Col md="6" lg="4" key={video.id} className="mb-4">
                {/* <VideoModal video={video}> */}
                <Link to={`/resources/mbti/${video.slug}`}>
                  <MBTICard videoData={video} />
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

export default MyersBriggsPage

export const data = graphql`
  {
    page: contentfulPages(slug: { eq: "mbti" }) {
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
            ... on ContentfulMyersBriggsVideo {
              ...MBTICardFragment
            }
          }
        }
      }
    }
  }
`
