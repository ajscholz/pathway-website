import React from "react"
import { Card, CardTitle, CardBody } from "reactstrap"
import CardTopImage from "./CardTopImage"

const CardBigRadius = ({ children, className, title, imgData }) => {
  return (
    <Card
      className={`border-1 border-radius-extreme overflow-hidden${
        className ? ` ${className}` : ""
      }`}
    >
      <CardTopImage imgData={imgData} />
      <CardBody>
        <CardTitle tag="h5" className="text-left text-capitalize">
          {title}
        </CardTitle>
        {children}
      </CardBody>
    </Card>
  )
}

export default CardBigRadius
