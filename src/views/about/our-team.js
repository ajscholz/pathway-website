import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import { Container, Row, Col } from "reactstrap"

import TeamMemberCard from "../../components/cards/team-member-card"
import { useCenterColumns } from "../../utils/scripts/custom-hooks"

const OurTeam = () => {
  const { teamData } = useStaticQuery(graphql`
    {
      teamData: contentfulPageSection(
        contentful_id: { eq: "5VExuaOKaFyomQTxqYjsex" }
      ) {
        title
        linkedContent {
          ... on ContentfulTeamMember {
            id: contentful_id
            name
            position
            profile {
              profile
            }
            email
            picture {
              title
              fixed(width: 112) {
                ...GatsbyContentfulFixed
              }
            }
          }
        }
      }
    }
  `)

  const colSizes = useCenterColumns(teamData.linkedContent)

  return (
    <section className="team-1 bg-dark ">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto text-center" md="8">
            <h2 className="title text-light">{teamData.title}</h2>
            {/* <h5 className="description">
                This is the paragraph where you can write more details about
                your team. Keep you user engaged by providing meaningful
                information.
              </h5> */}
          </Col>
        </Row>
        <Row>
          {teamData.linkedContent.map((person, i) => (
            <Col {...colSizes[i]} key={person.id}>
              <TeamMemberCard person={person} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default OurTeam
