import styled from "styled-components";
import { MONO_FONT_FAMILY } from "src/constants/globalStyle";

export const StyledGithubLink = styled.a`
  display: inline-block;
  cursor: pointer;
  color: white;
  margin: 0 auto;
  position: relative;
  text-decoration: none;
  font-weight: 600;
  border-radius: 4px;
  overflow: hidden;
  padding: 2px;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 400%;
    height: 100%;
    background: linear-gradient(115deg, #4fcf70, #fad648, #a767e5, #12bcfe, #44ce7b);
    background-size: 25% 100%;
    animation: border-animation 0.75s linear infinite;
    animation-play-state: paused;
    translate: -5% 0%;
    transition: translate 0.25s ease-out;
  }

  &:hover::before {
    animation-play-state: running;
    transition-duration: 0.75s;
    translate: 0% 0%;
  }

  @keyframes border-animation {
    to {
      transform: translateX(-25%);
    }
  }

  span.button-inner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.25rem 0.5rem;
    font-size: 0.65rem;
    background: #000;
    border-radius: 2px;
    height: 100%;
    gap: 0.25rem;
  }
`;

export const StyledStarCount = styled.span`
  font-family: ${MONO_FONT_FAMILY} !important;
`;
