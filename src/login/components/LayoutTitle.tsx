import { Title, useMantineTheme } from "@mantine/core";

export function LayoutTitle({
  children,
  icon: Icon,
  color = "gray",
  colorIndex = 8,
}: {
  children: any;
  icon?: any;
  color?: string;
  colorIndex?: number;
}) {
  const theme = useMantineTheme();

  return (
    <Title
      color={"light"}
      sx={{
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
      mb="lg"
    >
      {Icon && <Icon size={40} color={theme.colors[color][colorIndex]} />}
      {children}
    </Title>
  );
}
