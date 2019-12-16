import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Image from "gatsby-image"

import { Card, CardBody, CardTitle, CardFooter, Button } from "reactstrap"

const ButtonCard = props => {
  const { title, subtitle, description, button, background } = props.sectionData

  // set button props for a Gatsby link or a normal a link
  const buttonProps =
    button.link.charAt(0) === "/"
      ? {
          to: button.link,
          tag: Link,
        }
      : {
          href: button.link,
          target: "_blank",
          rel: "noopener noreferrer",
        }

  const cardProps =
    background === "" || !background
      ? {
          style: { background: "transparent" },
          className: `no-border card-plain text-center py-5 ${
            props.className ? props.className : ""
          }`,
        }
      : {
          "data-background": "image",
          style: {
            background: "transparent",
          },
          className: `no-border card-plain ${
            props.className ? props.className : ""
          }`,
        }

  return (
    <Card {...cardProps}>
      {background && (
        <Image
          fluid={background.fluid}
          style={{ position: "absolute", height: "100%", width: "100%" }}
          imgStyle={{ borderRadius: 0 }}
        />
      )}
      <CardBody className="d-flex flex-column justify-content-center ">
        <CardTitle tag="h3">{title}</CardTitle>
        {/* <div className="card-icon">
                      <i className="nc-icon nc-world-2" />
                    </div> */}
        {subtitle && <p className="card-description">{subtitle}</p>}
        <p
          className={`card-description ${subtitle && "font-weight-bold mt-0"}`}
        >
          {description}
        </p>
        <CardFooter>
          <Button
            className={`${
              props.button === "solid" ? "btn" : "btn-outline-primary"
            } mt-2`}
            color="primary"
            {...buttonProps}
          >
            {/* <i className="fa fa-plus mr-1" /> */}
            {button.text}
          </Button>
        </CardFooter>
      </CardBody>
    </Card>
  )
}

ButtonCard.propTypes = {
  sectionData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    description: PropTypes.string.isRequired,
    button: PropTypes.object.isRequired,
    background: PropTypes.object.isRequired,
  }).isRequired,
}

ButtonCard.defaultProps = {
  sectionData: {
    title: "Title",
    description: "description here",
  },
}

export default ButtonCard
