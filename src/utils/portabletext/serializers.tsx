export const ColorMark = ({ value, children }: {
  value?: { hex: string };
  children: React.ReactNode;
}) => {
  console.log(value);
  const color = value?.hex || "inherit";
  return <span style={{ color }}>{children}</span>;
};
