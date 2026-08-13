export function Localized({ tr, en }: { tr: React.ReactNode; en: React.ReactNode }) {
  return (
    <>
      <span className="lang-tr">{tr}</span>
      <span className="lang-en">{en}</span>
    </>
  );
}
