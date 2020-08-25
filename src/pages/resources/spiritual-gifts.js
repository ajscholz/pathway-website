import React from "react"
import { graphql } from "gatsby"
import SEO from "../../components/seo"
import Header from "../../components/header"

const SpiritualGiftsPage = ({ data }) => {
  const { banner } = data.page
  const { image } = banner

  return (
    <>
      <SEO
        title="Resources"
        image={image.file.url}
        url="https://pathwaymarietta.com/resources/spiritual-gifts"
      />
      <Header background={image} xxs={true} />
      <section>hello from spiritual gifts page</section>
      {/* <section className="blog-2 section section-gray">
        <BreadcrumbSection
          crumbs={[
            { name: "Resources", link: "/resources" },
            { name: "Help Me Understand Videos", link: "", active: true },
          ]}
        />
        <Container>
          <h1 className="h2 title text-center">{sections[0].title}</h1>
          <Row className="justify-content-center">
            {videos.map(video => (
              <Col md="6" lg="4" key={video.id} className="mb-4">
                <Link to={`/resources/help-me-understand${video.fields.slug}`}>
                  <HelpMeUnderstandVideoCard videoData={video} />
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section> */}
    </>
  )
}

export default SpiritualGiftsPage

export const data = graphql`
  {
    page: contentfulPages(title: { eq: "Spiritual Gifts" }) {
      ...HeaderFragment
    }
  }
`
