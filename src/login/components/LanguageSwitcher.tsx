import { useState } from "react";
import {
  createStyles,
  UnstyledButton,
  Menu,
  Image,
  Group,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import { KcContext } from "login/kcContext";

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
  control: {
    width: 200,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 15px",
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]
    }`,
    transition: "background-color 150ms ease",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[opened ? 5 : 6]
        : opened
        ? theme.colors.gray[0]
        : theme.white,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  label: {
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
  },

  icon: {
    transition: "transform 150ms ease",
    transform: opened ? "rotate(180deg)" : "rotate(0deg)",
  },
}));

export function LanguageSwitcher({
  i18n,
  kcContext,
}: {
  i18n: any;
  kcContext: KcContext;
}) {
  const { msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag } =
    i18n;
  const { realm, locale, auth, url, message, isAppInitiatedAction } = kcContext;
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });

  const items = locale?.supported.map(
    ({ languageTag }: { languageTag: string }) => (
      <Menu.Item
        icon={
          <Image
            src={url.resourcesPath + "/flags/" + languageTag + ".svg"}
            width={18}
            height={18}
            radius="xl"
          />
        }
        onClick={() => changeLocale(languageTag)}
        key={languageTag}
      >
        {labelBySupportedLanguageTag[languageTag]}
      </Menu.Item>
    )
  );

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
    >
      <Menu.Target>
        <UnstyledButton className={classes.control}>
          <Group spacing="xs">
            <Image
              src={url.resourcesPath + "/flags/" + currentLanguageTag + ".svg"}
              width={22}
              height={22}
              radius="xl"
            />
            <span className={classes.label}>
              {labelBySupportedLanguageTag[currentLanguageTag]}
            </span>
          </Group>
          <IconChevronDown size={16} className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}
