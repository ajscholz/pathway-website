import React from "react"
import PropTypes from "prop-types"
import Image from "gatsby-image"
import { Card, CardBody, CardTitle, CardFooter, Button } from "reactstrap"

const TeamMemberCard = props => {
  const { person } = props

  let id = person.name.match(/\b[a-zA-Z]*\b/)
  id = id[0].toLowerCase()

  return (
    <Card
      className="card-profile no-transition"
      style={{ marginTop: "80px" }}
      id={id}
    >
      <div className="card-avatar border-white">
        <Image alt={person.picture.title} fixed={person.picture.fixed} />
      </div>
      <CardBody>
        <CardTitle tag="h4">{person.name}</CardTitle>
        <h6 className="card-category">{person.position}</h6>
        <p className="card-description">{person.profile.profile}</p>
        <CardFooter className="text-center">
          <Button
            className="btn-icon btn-border btn-round"
            color="default"
            href={`mailto: ${person.email}`}
            // onClick={ e => e.preventDefault() }
            outline
          >
            <i className="fa fa-envelope mr-1" />
            Message
          </Button>
        </CardFooter>
      </CardBody>
    </Card>
  )
}

TeamMemberCard.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    profile: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
    picture: PropTypes.object.isRequired,
  }).isRequired,
}

// TeamMemberCard.defaultProps = {
//   person: {
//     name: "Person",
//     position: "Position",
//     profile:
//       "Here's some information about this person. It's probably not very accurate",
//     email: "heresan@email.com",
//     picture: require("assets/img/faces/kaci-baum-2.jpg"),
//   },
// }

export default TeamMemberCard
