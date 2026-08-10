import React from "react";
import { useRouter } from "next/router";
import { ErrorLayout } from "../components/ErrorLayout";

const Custom500 = () => {
  const router = useRouter();

  return (
    <ErrorLayout
      code="500"
      title="Something bad just happened..."
      description="Our servers could not handle your request. Don't worry, our development team was already notified. Try refreshing the page."
      cardMessage="You can refresh to try again, or head back home."
      metaTitle="Unexpected Error Occurred"
      onRefresh={() => router.reload()}
    />
  );
};

export default Custom500;
