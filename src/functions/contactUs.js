// https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1

const nodemailer = require("nodemailer")
const { google } = require("googleapis")

exports.handler = async event => {
  const OAuth2 = google.auth.OAuth2

  const { body } = event
  let data = JSON.parse(body)

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

  const message = {
    from: {
      name: "AJSolutions",
      address: "andrew@citynorth.church",
    },
    replyTo: `${data.name} <${data.email}>`,
    to: `Pathway Community Church <yoitsscholzy@gmail.com>`,
    bcc: `Andrew Scholz <andrew@citynorth.church>`,
    subject: "Website Form Submission",
    generateTextFromHTML: true,
    html: `
    <html>
      <style>
        span {
          font-weight: 700;
        }
      </style>
      <h1>
        You've received a new form submission!
      </h1>
      <hr>
      <p>
        <span>Name: </span>
        ${data.name}
      </p>
      <p>
        <span>Email: </span>
        <a href="mailto: ${data.email}">${data.email}</a>
      </p>
      <p>
        <span>Message: </span>
        ${data.message}
      </p>
      <br>
      <hr>
      <h4>
        To reply to your message simply reply to this email directly!
      </h4>
    </html>`,
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
