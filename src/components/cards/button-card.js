import React from "react"
import PropTypes from "prop-types"
import Image from "gatsby-image"

import { MDXRenderer } from "gatsby-plugin-mdx"

import { Card, CardBody, CardTitle, CardFooter } from "reactstrap"
import LinkButton from "../buttons/link-button"

const baseClass = `w-100 no-border card-plain py-5 px-4`
const baseStyles = {
  // background: "transparent",
  minHeight: "100%",
  minWidth: "100%",
}

const ButtonCard = props => {
  // console.log("sectionData", props.sectionData)
  const { title, subtitle, description, button, background } = props.sectionData

  const cardProps =
    background === "" || !background
      ? {
          style: { ...baseStyles },
          className: `${baseClass} bg-white text-center py-5 ${
            props.className ? props.className : ""
          }`,
        }
      : {
          "data-background": "image",
          style: { ...baseStyles },
          className: `${baseClass} ${props.className ? props.className : ""}`,
        }

  if (!description?.childMdx?.body) {
    console.log(
      `
          
          BAD CARD
          
          `,
      title
    )
  }

  return (
    <Card {...cardProps}>
      {background && (
        <Image
          className="my-n5 mx-n4"
          fluid={background.fluid}
          style={{ position: "absolute", height: "100%", width: "100%" }}
          imgStyle={{ borderRadius: 0 }}
        />
      )}
      <CardBody
        className="h-auto h-xl-100 w-100 py-5 px-1 d-flex flex-column justify-content-center m-0"
        style={{ minWidth: "100%", minHeight: "unset" }}
      >
        <CardTitle tag="h3">{title}</CardTitle>
        {/* <div className="card-icon">
                      <i className="nc-icon nc-world-2" />
                    </div> */}
        {subtitle && <p className="card-description">{subtitle}</p>}
        <div
          className={`card-description ${subtitle && "font-weight-bold mt-0"}`}
        >
          <MDXRenderer>{description.childMdx.body}</MDXRenderer>
        </div>
        <CardFooter className="mt-xl-auto">
          <LinkButton
            button={button}
            className={`${
              props.button === "solid" ? "btn" : "btn-outline-primary"
            } mt-2`}
            color="primary"
            size={props.buttonSize ? props.buttonSize : null}
          >
            {/* <i className="fa fa-plus mr-1" /> */}
            {button.text}
          </LinkButton>
        </CardFooter>
      </CardBody>
    </Card>
  )
}

ButtonCard.propTypes = {
  sectionData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    description: PropTypes.object.isRequired,
    button: PropTypes.object.isRequired,
    background: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }).isRequired,
}

export default ButtonCard
