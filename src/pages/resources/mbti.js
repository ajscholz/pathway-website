import React from "react"
import { graphql } from "gatsby"
import SEO from "../../components/seo"
import Header from "../../components/header"

const MyersBriggsPage = ({ data }) => {
  const { banner } = data.page
  const { image } = banner

  return (
    <>
      <SEO
        title="Myers Briggs Resources"
        image={image.file.url}
        url="https://pathwaymarietta.com/resources/mbti"
      />
      <Header background={image} xxs={true} />
      <section>hello from mbti page</section>
      {/* <section>
      <Container fluid style={ { padding: "0", margin: "0" } }>
        <div className="row no-gutters">
          { sections.map((section, i) => {
            return (
              <Col
                key={ section.id }
                sm={ 12 }
                md={ 6 }
                xl={ 4 }
                className={
                  i === 2
                    ? "order-md-3 order-xl-2"
                    : i === 3
                      ? "order-md-2 order-xl-3"
                      : `order-md-${i}`
                }
              >
                <ButtonCard
                  sectionData={ sections[i] }
                  className="mb-0"
                  button={ i === 0 && "solid" }
                  buttonSize={ i === 0 && "lg" }
                />
              </Col>
            )
          }) }
        </div>
      </Container>
    </section> */}
    </>
  )
}

export default MyersBriggsPage

export const data = graphql`
  {
    page: contentfulPages(title: { eq: "MBTI" }) {
      ...HeaderFragment
    }
  }
`
