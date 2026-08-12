import React from "react";
import { Flex } from "@mantine/core";
import { FaGithub, FaStar } from "react-icons/fa6";
import { StyledGithubLink, StyledStarCount } from "./styles";

export interface GithubButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  stars?: number;
  href: string;
}

export const GithubButton: React.FC<GithubButtonProps> = ({ stars = 0, href, ...props }) => {
  return (
    <StyledGithubLink href={href} target="_blank" rel="noopener noreferrer" {...props}>
      <span className="button-inner">
        <Flex align="center" gap="4">
          <FaGithub size="10" />
          GitHub
        </Flex>
        <Flex align="center" gap="2" style={{ opacity: 0.7 }}>
          <FaStar size="8" />
          <StyledStarCount>{stars.toLocaleString("en-US")}</StyledStarCount>
        </Flex>
      </span>
    </StyledGithubLink>
  );
};
