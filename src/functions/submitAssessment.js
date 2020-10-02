// https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1

const nodemailer = require("nodemailer")
const { google } = require("googleapis")
const { config } = require("@fortawesome/fontawesome-svg-core")

exports.handler = async event => {
  const OAuth2 = google.auth.OAuth2

  const { body } = event
  const data = JSON.parse(body)
  const { name, email, to, type, results } = data

  // ------------- Google OAuth2 authorization -------------
  const oauth2Client = new OAuth2(
    process.env.GMAIL_CLIENT_ID, // ClientID
    process.env.GMAIL_CLIENT_SECRET // Client Secret
  )
  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  })
  const accessToken = oauth2Client.getAccessToken() // Original article had deprecated access token method
  // ------------- End Google OAuth2 authorization -------------

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "andrew@citynorth.church",
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  })

  // const transporter = nodemailer.createTransport({
  //   host: "smtp.mailtrap.io",
  //   port: 2525,
  //   auth: {
  //     user: "a949c930869b32",
  //     pass: "00f4db531864a8",
  //   },
  // })

  const options = { year: "numeric", month: "long", day: "numeric" }
  const date = new Intl.DateTimeFormat("en-US", options).format(new Date())

  let core = ""
  if (type === "Myers-Briggs") {
  }

  const processSgAssessment = items =>
    `</p><ol>${items
      .map(item => `<li>${item.gift}: ${item.perc}</li>`)
      .toString()
      .replace(/,/g, "")}
    </ol>
    <a href=${item.link} target="_blank" rel="noopener noreferrer">${
      item.gift
    }</a>
    <h2>Pastor Ryan's Spiritual Gifts Talks</h2>
    ${items
      .map(
        item =>
          `<div><a href=${item.link} target="_blank" rel="noopener noreferrer">${item.gift}</a></div>`
      )
      .toString()
      .replace(/,/g, "")}
    <p>`

  const processEnneagramAssessment = items =>
    items.length === 1
      ? `Type ${items[0] + 1}`
      : `Type ${items[0] + 1} or Type ${items[1] + 1}`

  const processMbtiAssessment = items => {
    const type = items
      .map(item => item.win)
      .toString()
      .replace(/,/g, "")
    // get core results based on dispResult string
    let core
    if (type.charAt(1) === "N") {
      core = "N".concat(type.charAt(2) === "T" ? "T" : "F")
    } else {
      core = "S".concat(type.charAt(3) === "J" ? "J" : "P")
    }
    const corePage =
      core === "NF"
        ? "https://pathwaymarietta.com/resources/mbti/nf-idealists"
        : core === "NT"
        ? "https://pathwaymarietta.com/resources/mbti/nt-rationals"
        : core === "SJ"
        ? "https://pathwaymarietta.com/resources/mbti/sj-guardians"
        : "https://pathwaymarietta.com/resources/mbti/sp-artisans"

    return `${type}
    </p>
    <p>
      ${items
        .map(item => `<ul>${item.win} - ${item.scores[item.winIndex]}%</ul>`)
        .toString()
        .replace(/,/g, "")}
    </p>
    <h2>Pastor Ryan's Myers Briggs Talks</h2>
    <p>
    <a href="https://pathwaymarietta.com/resources/mbti/myers-briggs-overview" target="_blank" rel="noopener noreferrer">Myers Briggs Overview Video</a>
    <a href="${corePage}" target="_blank" rel="noopener noreferrer">${core} Core Video</a>`
  }

  const formattedResults = `
    <p>
      <span>${
        type === "Spiritual Gifts"
          ? "Top Spiritual Gifts"
          : type === "Enneagram"
          ? "Enneagram Type: "
          : "Myers-Briggs Type: "
      }
      </span>
      ${
        type === "Spiritual Gifts"
          ? processSgAssessment(results)
          : type === "Enneagram"
          ? processEnneagramAssessment(results)
          : processMbtiAssessment(results)
      }
    </p>
  `

  //`

  const message = {
    from: {
      name: to === "pathway" ? "AJSolutions" : "Pathway Community Church",
      address:
        to === "pathway"
          ? "andrew@citynorth.church"
          : "pathwaymarietta@gmail.com",
    },
    replyTo:
      to === "pathway"
        ? `${name} <${email}>`
        : `Pathway Community Church <pathwaymarietta@gmail.com>`,
    to:
      to === "pathway"
        ? `Pathway Community Church <pathwaymarietta@gmail.com>`
        : `${name} <${email}>`,
    // bcc: `Andrew Scholz <andrew@citynorth.church>`,
    subject:
      to === "pathway"
        ? `New ${type} Assessment Submission`
        : `Your ${type} Assessment Results From pathwaymarietta.com`,
    generateTextFromHTML: true,
    html:
      to === "pathway"
        ? `
    <html>
      <style>
        span {
          font-weight: 700;
        }
      </style>
      <h1>
        You've received a new ${type} Assessment.
      </h1>
      <hr>
      <br>
      <p>
        <span>Date Submitted: </span>
        ${date}
      </p>
      <p>
        <span>Name: </span>
        ${name}
      </p>
      <p>
        <span>Email: </span>
        <a href="mailto: ${email}">${email}</a>
      </p>
        ${formattedResults}
      <br>
      <hr>
      <h4>
        To reply to your message simply reply to this email directly.
      </h4>
    </html>`
        : `<html>
      <style>
        span {
          font-weight: 700;
        }
      </style>
      <h1>
        Your ${type} Assessment Results
      </h1>
      <hr>
      <p>
        <span>Date Submitted: </span>
        ${date}
      </p>
        ${formattedResults}
      <br>
      <hr>
      <p>Please <a href="mailto: pathwaycommunity@gmail.com">contact Pathway</a> with any questions about your results.</p>
      <p>Or you can always <a href="https://pathwaymarietta.com/resources/${
        type === "Spiritual Gifts"
          ? "spiritual-gifts"
          : type === "Enneagram"
          ? "enneagram"
          : "mbti"
      }" target="_blank" rel="noopener noreferrer">check out the training resources on our website</a> anytime you'd like.
    </html`,
  }

  try {
    const response = await transporter.sendMail(message)
    if (response.accepted.length === 0) {
      console.log("Form submission failed")
      return {
        statusCode: 500,
        body: JSON.stringify({
          msg:
            "Sorry, there was an error submitting your message. Please try again.",
        }),
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: "Message submitted successfully." }),
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: JSON.stringify({
        msg:
          "Sorry, there was an error submitting your message. Please try again.",
      }),
    }
  }
}
