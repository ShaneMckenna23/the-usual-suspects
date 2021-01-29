import React from "react"
import PropTypes from "prop-types"
import { Container, Row, Col } from "reactstrap"
import { useStaticQuery, graphql } from "gatsby"
import Heading from "../../../components/shared/heading"
import { HeroWrapper, HeroBG, HeroTextBox } from "./hero-area.stc"

const HeroArea = props => {
  const heroData = useStaticQuery(graphql`
    query HomeHeroQuery {
      homeJson(id: { eq: "home-hero-content" }) {
        title
        desc
        image {
          childImageSharp {
            fluid(maxWidth: 1920, maxHeight: 1080, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      file(relativePath: { eq: "video/Seamless_Loop_11.mp4" }) {
        childVideoFfmpeg {
          mp4: transcode(
            maxWidth: 900
            maxHeight: 480
            fileExtension: "mp4"
            codec: "libx264"
            options: [["-profile:v", "main"], ["-pix_fmt", "yuv420p"]]
            outputOptions: ["-movflags faststart"]
          ) {
            width
            src
            presentationMaxWidth
            presentationMaxHeight
            originalName
            height
            aspectRatio
          }
        }
      }
    }
  `)

  console.log("heroData: ", heroData)
  const { title, desc, image } = heroData.homeJson
  const { headingStyle, textStyle, textHeadingStyle } = props
  const { src } = heroData.file.childVideoFfmpeg.mp4
  //<HeroBG fluid={image.childImageSharp.fluid} />
  return (
    <HeroWrapper>
      <HeroBG
        autoPlay={true}
        width="320"
        height="240"
        controls={false}
        muted={true}
        loop={true}
      >
        <source src={src} type="video/mp4" />
      </HeroBG>
      <Container>
        <Row>
          <Col lg={6}>
            <HeroTextBox>
              {title && (
                <Heading {...textHeadingStyle} {...headingStyle}>
                  {title}
                </Heading>
              )}
            </HeroTextBox>
          </Col>
        </Row>
      </Container>
    </HeroWrapper>
  )
}

HeroArea.propTypes = {
  headingStyle: PropTypes.object,
  textStyle: PropTypes.object,
  textHeadingStyle: PropTypes.object,
}

HeroArea.defaultProps = {
  headingStyle: {
    as: "h1",
    fontSize: ["70px", null, "90px", "80px", "100px", "100px"],
    textTransform: "capitalize",
    fontFamily: "Passion One",
    mb: ["10px", null, 0],
  },
  textStyle: {
    fontSize: ["35px", "48px"],
    fontFamily: "segoe",
  },
  textHeadingStyle: {
    color: "#fff",
    lineHeight: 1,
    fontWeight: "regular",
  },
}

export default HeroArea
