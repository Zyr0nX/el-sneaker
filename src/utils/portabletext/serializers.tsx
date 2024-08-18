export const ColorMark = ({ value, children }: {
  value?: { hex: string };
  children: React.ReactNode;
}) => {
  const color = value?.hex || "inherit";
  return <span style={{ color }}>{children}</span>;
};

export const BulletPoint = ({ children }: { children?: React.ReactNode }) => {
  return <ul className="list-disc list-inside flex flex-col gap-2">{children}</ul>;
}