import React, { useState } from "react"
import PropTypes from "prop-types"

import { Container, Row, Col, Button } from "reactstrap"
import SeriesCard from "../cards/series-card"
import MessageCard from "../cards/MessageCard"

const ArchiveLayout = ({ items, itemType, heading, children }) => {
  const [showFold, setShowFold] = useState(false)

  const aboveFoldItems = items.slice(0, 3)
  const belowFoldItems = items.slice(3)

  return (
    <>
      <div className="section-gray">{children}</div>
      <section className="section section-gray">
        <Container className="text-center">
          <h1 className="h2 title text-center mt-n3">{heading}</h1>
        </Container>
        <Container>
          <Row>
            <Col>
              <h2 className="mt-0">
                <small>{`Recent ${itemType}`}</small>
              </h2>
            </Col>
          </Row>
          <Row className="mt-4 justify-content-center">
            {aboveFoldItems.map(item => {
              return (
                <Col md="6" lg="4" key={item.id}>
                  {itemType === "Series" ? (
                    <SeriesCard seriesData={item} noDesc />
                  ) : (
                    <MessageCard messageData={item} />
                  )}
                </Col>
              )
            })}
          </Row>
          {!showFold && (
            <Row className="justify-content-center">
              <Button
                color="primary"
                size="lg"
                onClick={() => setShowFold(true)}
                className="mt-5"
              >
                Load More
              </Button>
            </Row>
          )}
        </Container>
      </section>
      {showFold && (
        <section className="section section-dark">
          <Container>
            <Row>
              <Col>
                <h2 className="mt-0 text-light">
                  <small>{`Older ${itemType}`}</small>
                </h2>
              </Col>
            </Row>
            <Row className="mt-4">
              {belowFoldItems.map(item => {
                return (
                  <Col
                    xs={{
                      size: 8,
                      offset: 2,
                    }}
                    sm={{
                      size: 6,
                      offset: 0,
                    }}
                    md="4"
                    lg="3"
                    key={item.id}
                  >
                    {itemType === "Series" ? (
                      <SeriesCard seriesData={item} className="mb-4" noDesc />
                    ) : (
                      <MessageCard messageData={item} />
                    )}
                  </Col>
                )
              })}
            </Row>
          </Container>
        </section>
      )}
    </>
  )
}

ArchiveLayout.propTypes = {
  items: PropTypes.array.isRequired,
  itemType: PropTypes.string.isRequired,
}

export default ArchiveLayout
