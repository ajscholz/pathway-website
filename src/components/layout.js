/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import Navigation from "./navbar"

import "assets/css/bootstrap.min.css"
import "assets/scss/paper-kit.scss"
import "assets/demo/demo.css"
import "assets/demo/react-demo.css"
import "typeface-source-sans-pro"

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

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navigation />
      <main style={{ flexGrow: 1 }}>{children}</main>
      <Footer style={{ marginTop: "auto", flexGrow: 0 }} />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
