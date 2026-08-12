import React from "react";
import Link from "next/link";
import { JSONVizLogo } from "../JsonVizLogo";
import { PublicContainer } from "./PublicPage";
import {
  StyledFooter,
  StyledFooterBottom,
  StyledFooterGrid,
  StyledFooterLeft,
  StyledFooterLink,
  StyledFooterSection,
  StyledFooterTitle,
  StyledLegalLinks,
} from "./footerStyles";

export interface FooterProps {
  hideGithubLink?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ hideGithubLink = false }) => {
  return (
    <StyledFooter>
      <PublicContainer $wide>
        <StyledFooterGrid>
          <StyledFooterLeft>
            <JSONVizLogo style={{ color: "#f5f4ef" }} />
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
