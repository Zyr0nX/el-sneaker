export const ColorMark = ({ value, children }: {
  value?: { hex: string };
  children: React.ReactNode;
}) => {
  const color = value?.hex || "inherit";
  return <span style={{ color }}>{children}</span>;
};
