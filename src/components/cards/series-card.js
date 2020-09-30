import React from "react"
import { Link, graphql } from "gatsby"
import PropTypes from "prop-types"
import CardBigRadius from "./CardBigRadius"

import CardDescription from "./CardDescription"
import CardDateFooter from "./CardDateFooter"

const SeriesCard = ({
  seriesData: {
    title,
    start,
    end,
    year,
    desc: { desc },
    graphic,
    slug,
  },
  noDesc,
  className,
}) => {
  const date = start === end ? `${start} ${year}` : `${start}-${end} ${year}`

  return (
    <Link to={`/messages/series/${slug}`}>
      <CardBigRadius className={className} title={title} imgData={graphic}>
        {!noDesc && <CardDescription desc={desc} />}
        <CardDateFooter date={date} />
      </CardBigRadius>
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
    slug: PropTypes.string.isRequired,
  }),
}

export default SeriesCard

export const query = graphql`
  fragment SeriesCardFragment on ContentfulMessageSeries {
    id: contentful_id
    title: seriesTitle
    desc: seriesDescription {
      desc: seriesDescription
    }
    start: seriesStartDate(formatString: "MMMM")
    end: seriesEndDate(formatString: "MMMM")
    year: seriesStartDate(formatString: "YYYY")
    graphic: seriesGraphic {
      fluid {
        ...GatsbyContentfulFluid
      }
    }
    slug
  }
`
