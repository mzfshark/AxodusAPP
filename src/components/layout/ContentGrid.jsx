export default function ContentGrid({ children, columns = 'auto', className = '' }) {
  const columnClass = {
    auto: 'ax-grid-auto',
    two: 'ax-grid-two',
    three: 'ax-grid-three',
    four: 'ax-grid-four',
  }[columns] ?? 'ax-grid-auto';

  return (
    <div className={`ax-content-grid ${columnClass} ${className}`}>
      {children}
    </div>
  );
}
