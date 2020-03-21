/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

require("typeface-source-sans-pro")

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
  const startDay = 5
  const startHour = 22
  const startMinute = 35

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
