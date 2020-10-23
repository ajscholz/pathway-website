/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ description, lang, meta, title, image, url, type, children }) => {
  const { site, index } = useStaticQuery(graphql`
    {
      site {
        seo: siteMetadata {
          defaultTitle: title
          defaultDescription: description
          siteUrl: url
        }
      }
      index: contentfulPages(title: { eq: "Index" }) {
        banner {
          image {
            file {
              url
            }
          }
        }
      }
    }
  `)
  const imageUrl = image
    ? image.startsWith("https:")
      ? image
      : "https:".concat(image)
    : "https:".concat(index.banner.image.file.url)
  const metaDescription = description || site.seo.defaultDescription
  const ogImage = imageUrl
  const ogType = type || `website`

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: ogType,
        },
        {
          property: `og:image`,
          content: ogImage,
        },
        {
          property: `og:url`,
          content: url,
        },
      ].concat(meta)}
      link={[{ rel: "canonical", href: url }]}
    >
      {children}
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}

export default SEO
