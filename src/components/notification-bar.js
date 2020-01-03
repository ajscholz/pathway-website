import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"

import { Alert, Container } from "reactstrap"

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

  const activeBar = notificationBars.all.find(bar => bar.autoOff > now)

  const [showNotificationBar, setShowNotificationBar] = useState(
    activeBar === undefined ? false : true
  )

  const linkProps = useGetLinkProps(activeBar.clickthroughLink)

  console.log(linkProps)

  // const alertRef = useRef()

  // useEffect(() => {
  //   console.log(alertRef.current.clientHeight)
  // }, [])

  // useEffect(() => {
  //   const navbar = document.getElementById("navbar-main")
  //   if (showNotificationBar === true) {
  //     navbar.style.marginTop = `${alertRef.current.clientHeight}px`
  //   } else {
  //     navbar.style.marginTop = "0px"
  //   }
  // }, [showNotificationBar])

  return showNotificationBar === false ? null : (
    // <div  >
    <div className="position-relative d-flex">
      <Alert
        {...linkProps}
        color="info"
        className="notification-bar mb-0 position-relative"
        fade={false}
        style={{ textAlign: "center", width: "100%" }}
      >
        {/* <Container style={{ padding: "0 24px" }}> */}
        {/* <span style={{ textDecoration: "underline", fontWeight: "bold" }}>
            {activeBar.title}
          </span> */}
        {/* <br /> */}
        <span style={{ fontWeight: 400 }}>{activeBar.text}</span>

        {/* </Container> */}
      </Alert>
      <button
        className="text-muted p-0 m-0 position-absolute d-flex align-items-center justify-content-center bg-info"
        style={{
          border: "none",
          right: "0px",
          top: "0px",
          height: "100%",
          width: "40px",
        }}
        alt="Close notification bar"
        onClick={e => {
          e.preventDefault()
          setShowNotificationBar(false)
        }}
      >
        <FontAwesomeIcon icon={faTimes} color="white" />
      </button>
    </div>
  )
}

export default NotificationBar
