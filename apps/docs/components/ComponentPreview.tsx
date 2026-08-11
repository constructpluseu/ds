export function ComponentPreview({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="cp-docs-preview">
      <span className="cp-docs-preview__label">{label}</span>
      {children}
    </div>
  );
}
