import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"
import PropTypes from "prop-types"
import { Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap"

const SeriesCard = props => {
  const {
    title,
    start,
    end,
    year,
    desc,
    graphic,
    fields,
    className,
  } = props.seriesData

  const date = start === end ? `${start} ${year}` : `${start}-${end} ${year}`

  return (
    <Link to={fields.slug}>
      <Card
        className={className}
        style={{
          border: `1px solid #e3e3e3`,
          borderRadius: 0,
        }}
      >
        <CardImg top tag="div">
          <Image fluid={graphic.fluid} />
        </CardImg>
        <CardBody>
          <CardTitle tag="h3">{title}</CardTitle>
          <CardText>{desc.desc}</CardText>
          <CardText>
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
