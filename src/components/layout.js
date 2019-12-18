/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import "../assets/scss/main.scss"

import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import Footer from "./footer"
import Navigation from "./navbar"
import PopupModal from "./popup-modal"
import NotificationBar from "./notification-bar"

const Layout = ({ children }) => {
  const [modalState, setModalState] = useState()

  useEffect(() => {
    setTimeout(() => {
      setModalState(true)
    }, 5000)
  }, [])

  return (
    <>
      <PopupModal modalState={modalState} setModalState={setModalState} />
      <Helmet>
        <script src="https://js.churchcenter.com/modal/v1" />
      </Helmet>
      <NotificationBar />
      <div
        className="position-relative"
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Navigation />
        {/* negative margin is the height of the navbar due to it's position:sticky to account for the notification bar */}
        <main style={{ flexGrow: 1, marginTop: "-132.22px" }}>{children}</main>
        <Footer style={{ marginTop: "auto", flexGrow: 0 }} />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
