type PanelProps = {
  icon: React.ReactNode;
  title: string;
  text: string;
};

export function ThreePanel({ panels }: { panels: PanelProps[] }) {
  return (
    <div className="grid gap-12 md:grid-cols-3">
      {panels.map((p, i) => (
        <div key={i} className="flex flex-col items-start">
          <div className="text-brand-gold text-4xl mb-4">{p.icon}</div>
          <h3 className="text-xl font-heading font-semibold text-white mb-2">
            {p.title}
          </h3>
          <p className="text-gray-300 leading-relaxed">{p.text}</p>
        </div>
      ))}
    </div>
  );
}
