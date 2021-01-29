import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useStaticQuery, graphql } from 'gatsby'
import Blog from '../../../components/blog/layout-one'
import Swiper from '../../../components/shared/swiper'
import { truncateString } from '../../../utils/utilFunctions'
import { FeaturePostWrapper } from './feature-post-area.stc'

const FeaturePostArea = (props) => {
	const featurePostData = useStaticQuery(graphql`
        query FeaturePostQuery {
            allMarkdownRemark(
            	sort: {order: DESC, fields: frontmatter___date},
            	filter: {frontmatter: {is_featured: {eq: true}}}
            ) {
                totalCount
                edges {
                    node {
                        fields {
                            slug
                            dateSlug
                            postID
                        }
                        frontmatter {
                            category
                            date(formatString: "LL")
                            format
                            tags
                            title
                            is_featured
                            video_link
                            quote_text
                            quote_author
                            link
                            image {
                                childImageSharp {
                                    fluid(maxWidth: 510, maxHeight: 560, quality: 100, srcSetBreakpoints: 6) {
                                        ...GatsbyImageSharpFluid_withWebp
                                        presentationWidth
                                        presentationHeight
                                    }
                                }
                            }
                            images {
                                childImageSharp {
                                    fluid(maxWidth: 510, maxHeight: 560, quality: 100, srcSetBreakpoints: 6) {
                                        ...GatsbyImageSharpFluid_withWebp
                                        presentationWidth
                                        presentationHeight
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `);
	const blogs = featurePostData.allMarkdownRemark.edges;
	const { sliderSettings, sliderStyle } = props
	return (
		<FeaturePostWrapper id="feature-post">
			<Container>
				<Row>
					<Col lg={12}>
						<div className="feature-post-slider">
							<Swiper settings={sliderSettings} {...sliderStyle}>
								{blogs.map(blog => (
									<div className="item" key={blog.node.fields.slug}>
										<Blog
											content={{
												...blog.node.fields,
												...blog.node.frontmatter,
												title: truncateString(blog.node.frontmatter.title, 35)
											}}
										/>
									</div>
								))}
							</Swiper>
						</div>
					</Col>
				</Row>
			</Container>
		</FeaturePostWrapper>
	)
}

FeaturePostArea.defaultProps = {
	sliderSettings: {
		slidesPerView: 1,
		spaceBetween: 30,
		arrows: false,
		customArrows: true,
		autoplay: {
			delay: 3000
		},
		breakpoints: {
			1200: {
				slidesPerView: 3,
			},
			768: {
				slidesPerView: 2,
			},
			320: {
				slidesPerView: 1
			}
		}
	},
	sliderStyle: {
		navStyle: 2
	}
}

export default FeaturePostArea
