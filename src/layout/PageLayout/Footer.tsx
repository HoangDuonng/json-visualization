import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { JSONCrackLogo } from "../JsonCrackLogo";
import { PublicContainer } from "./PublicPage";

const StyledFooter = styled.footer`
  padding-block: clamp(4rem, 8vw, 7rem) 2rem;
  background: var(--public-text);
  color: #f5f4ef;
  position: relative;
  z-index: 2;
`;

const StyledFooterGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(16rem, 2fr) repeat(3, minmax(8rem, 1fr));
  gap: clamp(2rem, 6vw, 6rem);
  padding-bottom: clamp(3rem, 6vw, 5rem);

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const StyledFooterLeft = styled.div`
  max-width: 24rem;

  p {
    margin: 1rem 0 0;
    color: #aaada5;
    font-size: 0.925rem;
    line-height: 1.65;
  }
`;

const StyledFooterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
`;

const StyledFooterTitle = styled.h3`
  margin: 0 0 0.5rem;
  color: #777b73;
  font-family: inherit;
  font-size: var(--public-type-meta);
  font-weight: 650;
  text-transform: uppercase;
  letter-spacing: 0.12em;
`;

const StyledFooterLink = styled.a`
  color: #d8dad4;
  font-size: 0.875rem;
  text-decoration: none;
  transition: color var(--public-motion);
  cursor: pointer;

  &:hover {
    color: #ffffff;
  }

  &:focus-visible {
    outline: 2px solid #88b99f;
    outline-offset: 3px;
  }
`;

const StyledFooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #353833;
  color: #888c83;
  font-size: 0.75rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledLegalLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

interface FooterProps {
  hideGithubLink?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ hideGithubLink = false }) => {
  return (
    <StyledFooter>
      <PublicContainer $wide>
        <StyledFooterGrid>
          <StyledFooterLeft>
            <JSONCrackLogo style={{ color: "#f5f4ef" }} />
            <p>
              Read, transform, and explain structured data with an open-source visual workspace.
            </p>
          </StyledFooterLeft>
          <StyledFooterSection>
            <StyledFooterTitle>Product</StyledFooterTitle>
            <Link href="/editor" prefetch={false} passHref legacyBehavior>
              <StyledFooterLink>Visual editor</StyledFooterLink>
            </Link>
            <Link href="/draw" prefetch={false} passHref legacyBehavior>
              <StyledFooterLink>JsonDraw</StyledFooterLink>
            </Link>
            <Link href="/tools/json-schema" prefetch={false} passHref legacyBehavior>
              <StyledFooterLink>JSON Schema</StyledFooterLink>
            </Link>
          </StyledFooterSection>
          <StyledFooterSection>
            <StyledFooterTitle>Workflows</StyledFooterTitle>
            <Link href="/converter/json-to-yaml" prefetch={false} passHref legacyBehavior>
              <StyledFooterLink>Converters</StyledFooterLink>
            </Link>
            <Link href="/type/json-to-typescript" prefetch={false} passHref legacyBehavior>
              <StyledFooterLink>Type generation</StyledFooterLink>
            </Link>
            <Link href="/shorten" prefetch={false} passHref legacyBehavior>
              <StyledFooterLink>URL shortener</StyledFooterLink>
            </Link>
          </StyledFooterSection>
          <StyledFooterSection>
            <StyledFooterTitle>Resources</StyledFooterTitle>
            <Link href="/docs" prefetch={false} passHref legacyBehavior>
              <StyledFooterLink>Documentation</StyledFooterLink>
            </Link>
            {!hideGithubLink && (
              <StyledFooterLink
                href="https://github.com/hoangduonng"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </StyledFooterLink>
            )}
            <StyledFooterLink href="mailto:hoangduong@nguuyen.io.vn">Contact</StyledFooterLink>
          </StyledFooterSection>
        </StyledFooterGrid>

        <StyledFooterBottom>
          <span>
            © {new Date().getFullYear()} JSON Visualization. Open-source developer tooling.
          </span>
          <StyledLegalLinks>
            <Link href="/legal/terms" prefetch={false} passHref legacyBehavior>
              <StyledFooterLink>Terms</StyledFooterLink>
            </Link>
            <Link href="/legal/privacy" prefetch={false} passHref legacyBehavior>
              <StyledFooterLink>Privacy</StyledFooterLink>
            </Link>
          </StyledLegalLinks>
        </StyledFooterBottom>
      </PublicContainer>
    </StyledFooter>
  );
};
