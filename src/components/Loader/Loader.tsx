import React from "react";
import { StyledLoader } from "./styles";

export const Loader: React.FC = () => {
  return (
    <StyledLoader>
      <div className="loader-inner" />
    </StyledLoader>
  );
};

export default Loader;
