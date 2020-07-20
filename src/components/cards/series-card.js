import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"
import PropTypes from "prop-types"
import { Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap"

const SeriesCard = ({
  seriesData: { title, start, end, year, desc, graphic, fields, className },
}) => {
  const date = start === end ? `${start} ${year}` : `${start}-${end} ${year}`

  return (
    <Link to={`/messages/series${fields.slug}`}>
      <Card className={className}>
        <CardImg
          top
          tag="div"
          style={{
            position: "relative",
            paddingTop: "56.25%",
            overflow: "hidden",
          }}
        >
          <Image
            fluid={graphic.fluid}
            style={{
              position: "absolute",
              top: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </CardImg>
        <CardBody>
          <CardTitle tag="h3">{title}</CardTitle>
          <div
            style={{
              overflow: "hidden",
              position: "relative",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            <CardText
              className="mt-2 pb-0"
              // style={{ maxHeight: "100%", overflow: "hidden" }}
            >
              {desc.desc}
            </CardText>
            {/* <div
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                top: 0,
                background:
                  "linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.2) 20%)",
              }}
            /> */}
          </div>
          <CardText className="mt-3 pb-0">
            <small className="text-muted">
              <i className="fa fa-calendar" style={{ marginRight: "6px" }} />
              {date}
            </small>
          </CardText>
        </CardBody>
      </Card>
    </Link>
  )
}

SeriesCard.propTypes = {
  seriesData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    desc: PropTypes.shape({
      desc: PropTypes.string.isRequired,
    }).isRequired,
    graphic: PropTypes.object.isRequired,
    fields: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }),
}

export default SeriesCard
