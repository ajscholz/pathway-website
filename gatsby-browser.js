/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
const React = require("react")
require("typeface-source-sans-pro")
const { MDXProvider } = require("@mdx-js/react")
const { Link } = require("gatsby")
const { navigate } = require("@reach/router")

exports.onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  )
  if (answer === true) {
    window.location.reload()
  }
}

exports.onClientEntry = () => {
  // starts on Sunday at 10:30a
  const startDay = 6
  const startHour = 12
  const startMinute = 30

  const setNextSunday = d => {
    d.setDate(d.getDate() + ((startDay + 7 - d.getDay()) % 7))
    return d
  }

  const setNextSundayFromSunday = d => {
    const days = 7 - d.getDay() + startDay
    const nextSunday = new Date(d.setDate(d.getDate() + days))
    return nextSunday
  }

  const setTime = d => {
    d.setHours(startHour)
    d.setMinutes(startMinute)
    d.setSeconds(0)
    return d
  }

  const findNextSunday = d => {
    if (d.getDay() !== startDay) {
      d = setNextSunday(d)
    } else if (
      (d.getHours() === startHour && d.getMinutes() >= startMinute) ||
      d.getHours() > startHour
    ) {
      d = setNextSundayFromSunday(d)
    }
    return setTime(d)
  }
  const sunday = findNextSunday(new Date())
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem("nextSunday", sunday)
  }
}

// --------- CUSTOM MDX PROVIDER TO SET PROPER LINK TYPE ---------- //
const MyLink = props => {
  const onClick = (e, link) => {
    e.preventDefault()
    navigate(link, { state: { offset: -100 } })
  }

  const link = new URL(props.href)
  if (link.host === "pathwaymarietta.com")
    if (link.hash !== "")
      return (
        <a
          href={link.href}
          onClick={e => onClick(e, `${link.pathname}${link.hash}`)}
        >
          {props.children}
        </a>
      )
    else return <Link to={link.pathname}>{props.children}</Link>
  else
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    )
}

const components = {
  a: MyLink,
}

exports.wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
)

// ---------------------------------------------------------------- //
