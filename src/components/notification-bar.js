import React, { useState } from "react"
import { useStaticQuery } from "gatsby"

import { Alert, Container, Row, Col } from "reactstrap"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { useGetLinkProps } from "../utils/scripts/custom-hooks"

const NotificationBar = () => {
  const { notificationBars } = useStaticQuery(graphql`
    {
      notificationBars: allContentfulNotificationBar(
        filter: { showBar: { eq: true } }
        sort: { fields: updatedAt, order: DESC }
      ) {
        all: nodes {
          title
          text
          autoOff
          clickthroughLink
        }
      }
    }
  `)

  const now = new Date().toISOString()

  let activeBar = notificationBars.all.find(bar => bar.autoOff > now)

  const [visible, setVisible] = useState(activeBar === undefined ? false : true)

  const linkProps = useGetLinkProps(
    visible === false ? null : activeBar.clickthroughLink
  )

  return visible ? (
    <div className="position-relative d-flex align-items-center bg-warning">
      <Container fluid>
        <Row>
          <Col>
            <Alert
              {...linkProps}
              color="warning"
              isOpen={visible}
              // toggle={() => setVisible(false)}
              className="notification-bar mb-0 text-center py-4 alert-banner"
              fade={false}
            >
              {activeBar.text}
            </Alert>
          </Col>
        </Row>
      </Container>
      <button
        className="text-muted p-0 m-0 position-absolute d-flex align-items-center justify-content-center bg-warning alert-banner-close"
        aria-label="close"
        alt="Close notification bar"
        onClick={e => {
          e.preventDefault()
          setVisible(false)
        }}
      >
        <span aria-hidden="true">
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </button>
    </div>
  ) : null
}

export default NotificationBar
