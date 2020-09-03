import React from "react"
import { graphql } from "gatsby"

import {
  CardText,
  Card,
  CardBody,
  CardTitle,
  CardFooter,
  Button,
} from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"
import CardTopImage from "./CardTopImage"
import Link from "../Link"

const EventCard = ({
  event: {
    image,
    displayStart,
    title,
    action,
    description: { description },
  },
}) => {
  return (
    <Card className="border-1 border-radius-extreme overflow-hidden no-transition">
      <CardTopImage imgData={image} />
      <CardBody>
        <CardTitle tag="h5" className="text-left text-capitalize">
          {title}
        </CardTitle>

        <CardText className={`mb-2 pb-0 text-left`}>
          <small className="text-muted">
            <i className="fa fa-calendar" style={{ marginRight: "6px" }} />
            {displayStart}
          </small>
        </CardText>
        <CardText className="mb-0 pb-0 mt-3">{description}</CardText>
        {action && (
          <CardFooter className="mt-3 d-flex justify-content-end">
            <Button
              tag={Link}
              to={action.link}
              color="info"
              size="sm"
              className="text-white"
            >
              {action.text}
              <span className="ml-3" style={{ fontSize: ".85em" }}>
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </span>
            </Button>
            {/* <a href="https://google.com" target="_blank">
              <CardText
                className={`mt-1 pb-0 text-left h6 font-bold text-info`}
              >
                <small style={{ color: "inherit", fontWeight: "inherit" }}>
                  {action.text}
                  <span className="ml-2" style={{ fontSize: ".95em" }}>
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                  </span>
                </small>
              </CardText>
            </a> */}
          </CardFooter>
        )}
      </CardBody>
    </Card>
  )
}

export default EventCard

export const query = graphql`
  fragment EventCardFragment on ContentfulEvent {
    id: contentful_id
    title: eventName
    start(formatString: "dddd MMMM D, YYYY")
    displayStart: start(formatString: "ddd, MMM D")
    end
    image {
      file {
        url
      }
      fluid {
        ...GatsbyContentfulFluid
      }
    }
    description {
      description
    }
    action: callToActionButton {
      link
      text
    }
  }
`
