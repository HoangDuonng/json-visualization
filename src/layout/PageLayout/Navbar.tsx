import React from "react";
import { JSONVizLogo } from "../JsonVizLogo";
import { PublicContainer } from "./PublicPage";
import {
  StyledActionLink,
  StyledHeader,
  StyledNavLink,
  StyledNavActions,
  StyledNavLinks,
  StyledNavbar,
} from "./navbarStyles";

export const Navbar: React.FC = () => {
  return (
    <StyledHeader>
      <PublicContainer $wide>
        <StyledNavbar>
          <JSONVizLogo fontSize="1.05rem" />
          <StyledNavLinks aria-label="Public navigation">
            <StyledNavLink href="/docs" prefetch={false}>
              Docs
            </StyledNavLink>
            <StyledNavLink href="/converter/json-to-yaml" prefetch={false}>
              Convert
            </StyledNavLink>
            <StyledNavLink href="/type/json-to-typescript" prefetch={false}>
              Generate types
            </StyledNavLink>
            <StyledNavLink href="/tools/json-schema" prefetch={false}>
              JSON Schema
            </StyledNavLink>
          </StyledNavLinks>
          <StyledNavActions>
            <StyledActionLink href="/draw" prefetch={false}>
              Draw
            </StyledActionLink>
            <StyledActionLink href="/editor" prefetch={false} $primary data-primary>
              Open editor
            </StyledActionLink>
          </StyledNavActions>
        </StyledNavbar>
      </PublicContainer>
    </StyledHeader>
  );
};
