import React from "react";
import { ErrorLayout } from "../components/ErrorLayout";

const NotFound = () => {
  return (
    <ErrorLayout
      code="404"
      title="Page not found"
      description="The page you are looking for doesn't exist or has been moved. Head back home or open the editor to continue."
      cardMessage="If you believe this is an error, please reach out and we'll check it."
      metaTitle="404"
      noindex
    />
  );
};

export default NotFound;
