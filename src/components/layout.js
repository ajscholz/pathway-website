/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import "../assets/scss/main.scss"

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import Footer from "./footer"
import Navigation from "./navbar"
import PopupModal from "./popup-modal"
import NotificationBar from "./notification-bar"

// Checks to see if they're on the pwa
// const isPwa = () => {
//   if (typeof "window" !== undefined) {
//     if (
//       window.matchMedia("(display-mode: standalone)").matches ||
//       window.navigator.standalone ||
//       document.referrer.includes("android-app://")
//     )
//       return true
//     else return false
//   }
// }
// console.log("Is this the PWA version? ", isPwa())

const Layout = ({ children }) => {
  // const [modalState, setModalState] = useState(false)

  return (
    <>
      <Helmet>
        <script src="https://js.churchcenter.com/modal/v1" />
        <script>
          {`!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js')
            fbq('init', '2047308288897804');
            fbq('track', 'PageView');`}
        </script>
        <noscript>
          {`<img
            height="1"
            width="1"
            style="display:none"
            src="https://www.facebook.com/tr?id=2047308288897804&ev=PageView&noscript=1"
          />`}
        </noscript>
      </Helmet>

      <PopupModal />
      {/* <NotificationBar /> */}
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
