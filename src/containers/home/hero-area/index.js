import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { useStaticQuery, graphql } from 'gatsby';
import Heading from '../../../components/shared/heading';
import { HeroWrapper, HeroBG, HeroTextBox } from './hero-area.stc';

const HeroArea = (props) => {
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
        id
        name
        videoH264 {
          name
          path
        }
      }
    }
  `);

  console.log('heroData: ', heroData);
  const { title } = heroData.homeJson;
  const { headingStyle, textHeadingStyle } = props;
  const { path } = heroData.file.videoH264;

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
        <source src={path} type="video/mp4" />
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
  );
};

HeroArea.propTypes = {
  headingStyle: PropTypes.object,
  textStyle: PropTypes.object,
  textHeadingStyle: PropTypes.object,
};

HeroArea.defaultProps = {
  headingStyle: {
    as: 'h1',
    fontSize: ['70px', null, '90px', '90px', '110px', '120px'],
    textTransform: 'capitalize',
    fontFamily: 'Slaztone',
    mb: ['10px', null, 0],
  },
  textStyle: {
    fontSize: ['35px', '48px'],
    fontFamily: 'segoe',
  },
  textHeadingStyle: {
    color: '#fff',
    lineHeight: 1,
    fontWeight: 'regular',
  },
};

export default HeroArea;
