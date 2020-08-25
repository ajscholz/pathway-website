import React from "react"
import PropTypes from "prop-types"
import { Card, CardTitle, CardBody, Badge, CardFooter } from "reactstrap"
import CardDateFooter from "./CardDateFooter"
import CardTopImage from "./CardTopImage"

const CardBigRadius = ({ children, className, title, imgData, footerData }) => {
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
        {typeof footerData === "string" ? (
          <CardDateFooter date={footerData} />
        ) : (
          <CardFooter className="mt-4 text-left">
            <div className="author">
              {footerData.map(tag => (
                <Badge
                  // onClick={e => e.preventDefault()}
                  key={tag}
                  style={{ marginRight: "6px", color: "#FFF" }}
                  pill
                  color="info"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            {/* <div className="stats">
                              <i className="fa fa-clock-o" /> 5 min read
                            </div> */}
          </CardFooter>
        )}
      </CardBody>
    </Card>
  )
}

CardBigRadius.propTypes = {
  // children: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
}

export default CardBigRadius
