import React from "react"
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi"
import Social, { SocialLink } from "../../shared/social"

const SocialOne = ({ social, ...restProps }) => {
  const { facebook, instagram, linkedin, twitter, youtube } = social
  return (
    <Social {...restProps}>
      {facebook && (
        <SocialLink path={facebook}>
          <FiFacebook />
        </SocialLink>
      )}
      {instagram && (
        <SocialLink path={instagram}>
          <FiInstagram />
        </SocialLink>
      )}
      {youtube && (
        <SocialLink path={youtube}>
          <FiYoutube />
        </SocialLink>
      )}
    </Social>
  )
}

SocialOne.defaultProps = {
  pr: "27px",
}

export default SocialOne
