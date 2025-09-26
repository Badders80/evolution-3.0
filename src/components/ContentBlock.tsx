import { ReactNode } from "react";

type ContentBlockProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export default function ContentBlock({ eyebrow, title, description, children }: ContentBlockProps) {
  return (
    <section className="py-48 px-6 max-w-5xl mx-auto bg-black text-white">
      {eyebrow && (
        <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="text-4xl font-heading font-semibold text-white mb-6">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-gray-300 mb-8 max-w-3xl">
          {description}
        </p>
      )}
      {children && <div className="grid gap-8">{children}</div>}
    </section>
  );
}
