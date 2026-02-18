export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="space-y-6">
      {children}
    </article>
  );
}
