import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Header from "../components/header"
import { Link } from "gatsby"

import { Container, Row, Col, Button } from "reactstrap"
import BreadcrumbSection from "../components/BreadcrumbSection"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faQuestionCircle,
  faLaughSquint,
  faGifts,
  faHandHoldingHeart,
} from "@fortawesome/free-solid-svg-icons"

const pClasses = "text-muted"
const iClasses = "text-info"

const ResourcesPage = ({ data }) => {
  const { banner, sections } = data.page
  const { heading, image } = banner

  return (
    <>
      <SEO
        title="Resources"
        image={image.file.url}
        url="https://pathwaymarietta.com/resources"
        description="Find resources to help you live a full, abundant life with God. From personality tests to spiritual gifts assessments, to videos about confusing faith topics, we want to help you experience life in your faith."
      />
      <div className="section-gray">
        <Header background={image} xxs={true} />
        <BreadcrumbSection
          crumbs={[{ name: "Resources", link: "/resources", active: true }]}
        />
      </div>

      <section className="section section-gray pb-5">
        <Container>
          <Row>
            <div className="ml-auto mr-auto">
              {/* <h2 className="title text-center mb-3">{data.title}</h2> */}
              <h1 className="h2 title text-center mt-0">{heading}</h1>
              <div
                className="description text-center"
                style={{ width: "100%", maxWidth: "900px" }}
              >
                {/* <MDXRenderer>{data.description.childMdx.body}</MDXRenderer> */}
                <p className={pClasses}>
                  God didn't intend you to live a dull faith. He has always
                  wanted you to live a full, purpose-filled life. Here you'll
                  find some resources to help you with just that. Explore each
                  section, take the assessments, and step into a new chapter of
                  your faith today.
                </p>
              </div>
            </div>
          </Row>
          <Row>
            <Col
              sm="6"
              md="5"
              className="ml-auto border-md-right border-md-bottom border-dark py-4"
            >
              <div className="info">
                <div className={`icon ${iClasses}`}>
                  <FontAwesomeIcon icon={faQuestionCircle} />
                </div>
                {/* <h4 className="title">{data.linkedContent[0].headline}</h4> */}
                <h4 className="title">{sections[0].title}</h4>
                {/* <MDXRenderer>
                  {data.linkedContent[0].information.childMdx.body}
                </MDXRenderer> */}
                <p className={pClasses}>
                  How do I read the Bible? What is a "Testament" anyway?
                  Sometimes we just have questions about faith but don't have
                  easy access to answers.
                </p>
                <Button
                  color="primary"
                  size="sm"
                  tag={Link}
                  to={`/resources/help-me-understand`}
                  className="mt-3"
                >
                  View Resources
                </Button>
              </div>
            </Col>
            <Col
              sm="6"
              md="5"
              className="mr-auto border-md-bottom border-dark py-4"
            >
              <div className="info">
                <div className={`icon ${iClasses}`}>
                  <FontAwesomeIcon icon={faLaughSquint} />
                  {/* <i className="fa fa-book mr-1" /> */}
                  {/* <i aria-hidden={true} className="nc-icon nc-ruler-pencil" /> */}
                </div>
                {/* <h4 className="title">{data.linkedContent[1].headline}</h4> */}
                <h4 className="title">{sections[1].title}</h4>
                {/* <MDXRenderer>
                  {data.linkedContent[1].information.childMdx.body}
                </MDXRenderer> */}
                <p className={pClasses}>
                  We're each wired differently. Sometimes we don't like our
                  personalities, but they're truly a gift from God.
                  Understanding our personality is critical to experiencing joy
                  in life.
                </p>
                <Button
                  color="primary"
                  size="sm"
                  tag={Link}
                  to={`/resources/mbti`}
                  className="mt-3"
                >
                  View Resources
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col
              sm="6"
              md="5"
              className="ml-auto border-md-right border-dark py-4"
            >
              <div className="info">
                <div className={`icon ${iClasses}`}>
                  <FontAwesomeIcon icon={faGifts} />
                </div>
                {/* <h4 className="title">{data.linkedContent[2].headline}</h4> */}
                <h4 className="title">{sections[2].title}</h4>
                {/* <MDXRenderer>
                  {data.linkedContent[2].information.childMdx.body}
                </MDXRenderer> */}
                <p className={pClasses}>
                  God has given us each special gifts. They're things that come
                  easy and feel natural to us. Finding and understanding these
                  gifts is key to finding joy in our lives and in our faith.
                </p>
                <Button
                  color="primary"
                  size="sm"
                  tag={Link}
                  to={`/resources/spiritual-gifts`}
                  className="mt-3"
                >
                  View Resources
                </Button>
              </div>
            </Col>
            <Col sm="6" md="5" className="mr-auto py-4">
              <div className="info">
                <div className={`icon ${iClasses}`}>
                  <FontAwesomeIcon icon={faHandHoldingHeart} />
                </div>
                {/* <h4 className="title">{data.linkedContent[2].headline}</h4> */}
                <h4 className="title">{sections[3].title}</h4>
                {/* <MDXRenderer>
                  {data.linkedContent[2].information.childMdx.body}
                </MDXRenderer> */}
                <p className={pClasses}>
                  Sometimes knowing{" "}
                  <span style={{ fontStyle: "italic" }}>why</span> we do what we
                  do is the most important thing we can understand about
                  ourselves. The Enneagram is a great tool for understanding the
                  motivation behind our actions.
                </p>
                <Button
                  color="primary"
                  size="sm"
                  tag={Link}
                  to={`/resources/enneagram`}
                  className="mt-3"
                >
                  View Resources
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* <section
        className={`section section-${index % 2 === 0 ? "gray" : "dark"}`}
        key={section.title}
      >
        <h2 className="title text-center mt-0">Faith Resources</h2>
        <p>
          Sometimes there are things in faith that are hard to understand, or
          just so new we don't understand them yet. There can be so many
          questions How do you read the Bible? What is a "Testament" anyway? Why
          should I get baptized?
        </p>
      </section> */}

      {/* {sections.map((section, index) => (
        <section
          className={`section section-${index % 2 === 0 ? "gray" : "dark"}`}
          key={section.title}
        >
          <Container>
            <h2 className="title text-center mt-0">{section.title}</h2>
            {section.videos !== null && (
              <Row className="justify-content-center">
                {[...section.videos].slice(0, 3).map(video => (
                  <Col md="6" lg="4" key={video.id}>
                    <Link
                      to={`/resources/${
                        section.title === "Help Me Understand Videos"
                          ? "help-me-understand"
                          : section.title === "Myers Briggs Resources"
                          ? "mbti"
                          : section.title === "Spiritual Gifts Resources"
                          ? "spiritual-gifts"
                          : "enneagram"
                      }/${video.slug}`}
                    >
                      {section.title === "Help Me Understand Videos" ? (
                        <HelpMeUnderstandVideoCard videoData={video} image />
                      ) : section.title === "Myers Briggs Resources" ? (
                        <MBTICard videoData={video} />
                      ) : (
                        <SpiritualGiftsCard videoData={video} />
                      )}
                    </Link>
                  </Col>
                ))}
              </Row>
            )}
            <Row className="justify-content-center">
              <Button
                color="primary"
                size="lg"
                tag={Link}
                to={`/resources/${
                  section.title.includes("Help Me")
                    ? "help-me-understand"
                    : section.title.includes("Enneagram")
                    ? "enneagram"
                    : section.title.includes("Myers")
                    ? "mbti"
                    : "spiritual-gifts"
                }`}
                className="mt-3"
              >
                More Resources
              </Button>
            </Row>
          </Container>
        </section>
      ))} */}
    </>
  )
}

export default ResourcesPage

export const data = graphql`
  {
    page: contentfulPages(slug: { eq: "resources" }) {
      ...HeaderFragment
      sections {
        ... on ContentfulPageSection {
          title
          videos: linkedContent {
            ... on ContentfulHelpMeUnderstandVideo {
              ...HelpMeUnderstandVideoCardFragment
            }
            ... on ContentfulMyersBriggsVideo {
              ...MBTICardFragment
            }
            ... on ContentfulSpiritualGiftsVideo {
              ...SpiritualGiftsCardFragment
            }
          }
        }
      }
    }
  }
`
