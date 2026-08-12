import React from "react";
import { useRouter } from "next/router";
import { Menu } from "@mantine/core";
import { getLocalizedPath, localeFlags, localeNames, locales, useLocale } from "src/i18n";
import { StyledLanguageButton } from "./styles";

export const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const currentLocale = useLocale();

  const handleLocaleChange = (newLocale: string) => {
    const newPath = getLocalizedPath(router.asPath, newLocale as any);
    router.push(newPath);
  };

  return (
    <Menu shadow="md" width={180} position="bottom-end">
      <Menu.Target>
        <StyledLanguageButton variant="subtle" size="sm">
          <span>{localeFlags[currentLocale]}</span>
          <span>{localeNames[currentLocale]}</span>
        </StyledLanguageButton>
      </Menu.Target>

      <Menu.Dropdown>
        {locales.map(locale => (
          <Menu.Item
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            leftSection={<span>{localeFlags[locale]}</span>}
            disabled={locale === currentLocale}
          >
            {localeNames[locale]}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
