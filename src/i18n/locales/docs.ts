import type { Locale } from "../config";
import { docsIndexTranslations } from "./docs-index";
import { embedWidgetTranslations } from "./docs/embed-widget";
import { exportImageTranslations } from "./docs/export-image";
import { formatConversionTranslations } from "./docs/format-conversion";
import { formatValidateTranslations } from "./docs/format-validate";
import { jqQueryTranslations } from "./docs/jq-query";
import { jsonPathTranslations } from "./docs/json-path";
import { jsonSchemaTranslations } from "./docs/json-schema";
import { jsonDrawTranslations } from "./docs/jsondraw";
import { typeGenerationTranslations } from "./docs/type-generation";
import { visualizationTranslations } from "./docs/visualization";

export const docsTranslations = {
  // ==================== COMMON ====================
  common: {
    needHelp: {
      en: "Need Help?",
      vi: "Cần Trợ Giúp?",
    },
    needHelpText: {
      en: "If you encounter issues or have questions, visit our",
      vi: "Nếu bạn gặp vấn đề hoặc có câu hỏi, hãy truy cập",
    },
    documentation: {
      en: "Documentation",
      vi: "Tài Liệu",
    },
    orTry: {
      en: "or try the",
      vi: "hoặc thử",
    },
    directly: {
      en: "directly",
      vi: "trực tiếp",
    },
    editor: {
      en: "Editor",
      vi: "Trình Soạn Thảo",
    },
    tipsAndBestPractices: {
      en: "Tips & Best Practices",
      vi: "Mẹo & Thực Hành Tốt Nhất",
    },
    howToUse: {
      en: "How to Use",
      vi: "Cách Sử Dụng",
    },
    examples: {
      en: "Examples",
      vi: "Ví Dụ",
    },
    practicalExamples: {
      en: "Practical Examples",
      vi: "Ví Dụ Thực Tế",
    },
    supportedFormats: {
      en: "Supported Formats",
      vi: "Định Dạng Được Hỗ Trợ",
    },
    relatedReading: {
      en: "Related Reading",
      vi: "Đọc Tiếp",
    },
    previous: {
      en: "Previous",
      vi: "Trước",
    },
    next: {
      en: "Next",
      vi: "Tiếp",
    },
    onThisPage: {
      en: "On This Page",
      vi: "Mục Lục",
    },
  },

  // ==================== DOCS INDEX ====================
  index: docsIndexTranslations,

  // ==================== VISUALIZATION ====================
  visualization: visualizationTranslations,

  // ==================== JSONDRAW ====================
  jsonDraw: jsonDrawTranslations,

  // ==================== FORMAT CONVERSION ====================
  formatConversion: formatConversionTranslations,

  // ==================== FORMAT & VALIDATE ====================
  formatValidate: formatValidateTranslations,

  // ==================== TYPE GENERATION ====================
  typeGeneration: typeGenerationTranslations,

  // ==================== JSON SCHEMA ====================
  jsonSchema: jsonSchemaTranslations,

  // ==================== JQ QUERY ====================
  jqQuery: jqQueryTranslations,

  // ==================== JSON PATH ====================
  jsonPath: jsonPathTranslations,

  // ==================== EXPORT IMAGE ====================
  exportImage: exportImageTranslations,

  // ==================== EMBED WIDGET ====================
  embedWidget: embedWidgetTranslations,
};

export function getDocsTranslation(key: string, locale: Locale): string {
  const keys = key.split(".");
  let value: any = docsTranslations;

  for (const k of keys) {
    value = value?.[k];
  }

  return value?.[locale] || value?.en || key;
}
