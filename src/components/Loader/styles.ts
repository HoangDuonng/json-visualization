import styled from "styled-components";

export const StyledLoader = styled.div`
  display: inline-block;

  .loader-inner {
    width: 16px;
    height: 16px;
    position: relative;
  }

  .loader-inner:before {
    content: "";
    width: 16px;
    height: 2px;
    background: rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 20px;
    left: 0;
    border-radius: 50%;
    animation: shadow324 0.5s linear infinite;
  }

  .loader-inner:after {
    content: "";
    width: 100%;
    height: 100%;
    background: #868e96;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 2px;
    animation: jump7456 0.5s linear infinite;
  }

  @keyframes jump7456 {
    15% {
      border-bottom-right-radius: 2px;
    }

    25% {
      transform: translateY(3px) rotate(22.5deg);
    }

    50% {
      transform: translateY(6px) scale(1, 0.9) rotate(45deg);
      border-bottom-right-radius: 12px;
    }

    75% {
      transform: translateY(3px) rotate(67.5deg);
    }

    100% {
      transform: translateY(0) rotate(90deg);
    }
  }

  @keyframes shadow324 {
    0%,
    100% {
      transform: scale(1, 1);
    }

    50% {
      transform: scale(1.2, 1);
    }
  }
`;
