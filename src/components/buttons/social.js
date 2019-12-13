import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import { Button } from "reactstrap"

export const FacebookButton = props => (
  <Button
    href={`https://www.facebook.com/${props.link}`}
    target="_blank"
    rel="noopener noreferrer"
    className={`btn-just-icon ${props.className}`}
    color="facebook"
  >
    <i className="fa fa-facebook" />
  </Button>
)

export const TwitterButton = props => {
  return (
    <Button
      href={`https://twitter.com/${props.link}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-just-icon ${props.className}`}
      color="twitter"
    >
      <i className="fa fa-twitter" />
    </Button>
  )
}

export const InstagramButton = props => {
  return (
    <Button
      href={`https://www.instagram.com/${props.link}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-just-icon ${props.className}`}
      color="instagram"
    >
      <i className="fa fa-instagram" />
    </Button>
  )
}

const SocialButtons = props => {
  const { links } = useStaticQuery(graphql`
    {
      links: contentfulChurchInformation {
        fb: facebookUsername
        tw: twitterUsername
        in: instagramUsername
      }
    }
  `)

  return (
    <div className={props.className} style={props.style}>
      <FacebookButton link={links.fb} />
      <TwitterButton className="mr-2 ml-2" link={links.tw} />
      <InstagramButton link={links.in} />
    </div>
  )
}

export default SocialButtons
