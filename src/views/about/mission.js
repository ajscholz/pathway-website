import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"

import { Container, Row, Col } from "reactstrap"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCross, faUserFriends, faCubes } from '@fortawesome/free-solid-svg-icons'

const MissionSection = () => {
  const { data } = useStaticQuery(graphql`
    {
      data: contentfulPageSection(
        contentful_id: { eq: "5kPAGeDLqogj5G4DKtxkVm" }
      ) {
        title
        description {
          childMdx {
            body
          }
        }
        linkedContent {
          ... on ContentfulHeadlineAndInformation {
            id: contentful_id
            headline
            information {
              childMdx {
                body
              }
            }
          }
        }
        backgroundImage {
          fluid {
            src
          }
        }
      }
    }
  `)

  return (
    <div
      className="features-5 section-image"
    >
      <Image fluid={data.backgroundImage.fluid} className="position-absolute" style={{top:0, width:'100%', height:'100%', background: 'black'}} imgStyle={{opacity: '.4'}} />
      <Container>
        <Row>
          <div className="ml-auto mr-auto">
            <h2 className="title text-center mb-3">{data.title}</h2>
            <h5 className="description text-center mb-5">
              <MDXRenderer>{data.description.childMdx.body}</MDXRenderer>
            </h5>
          </div>
        </Row>
        <Row>
          <Col className="ml-auto" sm="6" md="5">
            <div className="info">
              <div className="icon">
                <FontAwesomeIcon icon={faCross} />
              </div>
              <h4 className="title">{data.linkedContent[0].headline}</h4>
              <MDXRenderer>
                {data.linkedContent[0].information.childMdx.body}
              </MDXRenderer>
            </div>
          </Col>
          <Col className="mr-auto" sm="6" md="5">
            <div className="info">
              <div className="icon">
                {/* <i className="fa fa-book mr-1" /> */}
                <FontAwesomeIcon icon={faUserFriends} />
                {/* <i aria-hidden={true} className="nc-icon nc-ruler-pencil" /> */}
              </div>
              <h4 className="title">{data.linkedContent[1].headline}</h4>
              <MDXRenderer>
                {data.linkedContent[1].information.childMdx.body}
              </MDXRenderer>
            </div>
          </Col>
        </Row>
        <Row className="bottom-line mt-3">
          <Col className="mx-auto" sm="8">
            <div className="info">
              <div className="icon">
                <FontAwesomeIcon icon={faCubes} />
              </div>
              <h4 className="title">{data.linkedContent[2].headline}</h4>
              <MDXRenderer>
                {data.linkedContent[2].information.childMdx.body}
              </MDXRenderer>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MissionSection
