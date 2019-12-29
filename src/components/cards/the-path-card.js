import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons"

import Image from "gatsby-image"

import { Card, CardBody, Badge, CardTitle, CardFooter } from "reactstrap"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { useObjectPosition } from "../../utils/scripts/custom-hooks"

const ThePathCard = props => {
  const { step } = props
  const image = step.references[0]

  const objectPosition = useObjectPosition(
    image.image.file.details.image,
    image.focalPoint.focalPoint
  )

  return (
    <Card
      data-background="image"
      style={{
        overflow: "hidden",
      }}
      className="no-transition"
    >
      <Image
        fluid={image.image.fluid}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        imgStyle={{
          objectPosition: `${objectPosition.x}% ${objectPosition.y}%`,
        }}
      />
      <CardBody className="py-5 px-4">
        <Badge color="info">{step.name}</Badge>
        <a href="#pablo" onClick={e => e.preventDefault()}>
          <CardTitle tag="h3">{step.alternateName}</CardTitle>
        </a>
        <div className="card-description">
          <MDXRenderer>{step.description.childMdx.body}</MDXRenderer>
        </div>
        <CardFooter>
          <h6>
            <FontAwesomeIcon icon={faCalendarDay} className="mr-2" />
            {step.day}
          </h6>
        </CardFooter>
      </CardBody>
    </Card>
  )
}

export default ThePathCard
