/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import "../assets/scss/main.scss"

import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"

import Footer from "./footer"
import Navigation from "./navbar"
import PopupModal from "./popup-modal"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [modalState, setModalState] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setModalState(true)
    }, 5000)
  })

  return (
    <>
      <PopupModal modalState={modalState} setModalState={setModalState} />
      <Helmet>
        <script src="https://js.churchcenter.com/modal/v1" />
      </Helmet>
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Navigation />
        <main style={{ flexGrow: 1 }}>{children}</main>
        <Footer style={{ marginTop: "auto", flexGrow: 0 }} />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
