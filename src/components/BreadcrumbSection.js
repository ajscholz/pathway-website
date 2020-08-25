import React from "react"
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const BreadcrumbSection = ({ crumbs }) => {
  return (
    <Container>
      <Row>
        <Col>
          <small>
            <Breadcrumb className="mx-n3 mt-3 mb-n3">
              <BreadcrumbItem>
                <Link to="/">Home</Link>
              </BreadcrumbItem>
              {crumbs.map(crumb => (
                <BreadcrumbItem key={crumb.name} className="text-capitalize">
                  {!crumb.active ? (
                    <Link to={crumb.link}>{crumb.name}</Link>
                  ) : (
                    <span className="text-muted">{crumb.name}</span>
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
