import React from "react";
import { FAQSection } from "./components/FAQSection";
import { FormatsSection } from "./components/FormatsSection";
import { HeroSection } from "./components/HeroSection";
import { PreviewSection } from "./components/PreviewSection";
import { StorySection } from "./components/StorySection";
import { WorkflowsSection } from "./components/WorkflowsSection";

export const EditorialHome: React.FC = () => {
  return (
    <>
      <HeroSection />
      <PreviewSection />
      <StorySection />
      <WorkflowsSection />
      <FormatsSection />
      <FAQSection />
    </>
  );
};

export default EditorialHome;
