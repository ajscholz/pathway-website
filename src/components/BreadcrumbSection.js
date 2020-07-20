import React from "react"
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const BreadcrumbSection = ({ crumbs }) => {
  return (
    <Container className="mt-n5 mb-5">
      <Row>
        <Col>
          <small>
            <Breadcrumb className="mx-n3">
              <BreadcrumbItem>
                <Link to="/">Home</Link>
              </BreadcrumbItem>
              {crumbs.map(crumb => (
                <BreadcrumbItem key={crumb.name}>
                  {!crumb.active ? (
                    <Link to={crumb.link}>{crumb.name}</Link>
                  ) : (
                    crumb.name
                  )}
                </BreadcrumbItem>
              ))}
            </Breadcrumb>
          </small>
        </Col>
      </Row>
    </Container>
  )
}

BreadcrumbSection.propTypes = {
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      active: PropTypes.bool,
    }).isRequired
  ),
}

export default BreadcrumbSection
