import Link from 'next/link';

function SectionHeader({ number, label }: { number: string; label?: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-px bg-muted-foreground/50" />
      <span className="font-mono text-xs tracking-wide text-muted-foreground">
        {number}{label && ` / ${label}`}
      </span>
    </div>
  );
}

function SubcategoryLabel({ label }: { label: string }) {
  return (
    <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/70 mt-2">
      {label}
    </p>
  );
}

type CardItem = {
  title: string;
  role?: string;
  description: string;
  badge?: string;
  href?: string;
};

function CardGrid({ items }: { items: CardItem[] }) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="grid sm:grid-cols-2 gap-px bg-border">
        {items.map((item, i) => {
          const inner = (
            <div className="group bg-background p-4 sm:p-5 transition-colors hover:bg-muted/30 h-full">
              <div className="flex justify-between items-start">
                <div className="space-y-1.5 min-w-0 flex-1">
                  <h3 className="text-sm font-medium">
                    <span className="group-hover:underline underline-offset-4">
                      {item.title}
                    </span>
                    {item.role && (
                      <span className="text-muted-foreground font-normal">
                        {' '}&mdash; {item.role}
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed break-words">
                    {item.description}
                  </p>
                  {item.badge && (
                    <span className="inline-block mt-1.5 px-2 py-0.5 text-[11px] font-mono border border-border rounded text-muted-foreground">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-muted-foreground/40 ml-3 shrink-0 pt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          );

          if (item.href) {
            const isExternal = item.href.startsWith('http');
            if (isExternal) {
              return (
                <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                  {inner}
                </a>
              );
            }
            return (
              <Link key={i} href={item.href} className="block h-full">
                {inner}
              </Link>
            );
          }
          return <div key={i} className="h-full">{inner}</div>;
        })}
        {items.length % 2 !== 0 && (
          <div className="hidden sm:block bg-background" />
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="space-y-10 sm:space-y-16">
      {/* 01 - Hero */}
      <section className="space-y-4">
        <SectionHeader number="01" />
        <h1 className="text-4xl sm:text-5xl font-serif tracking-tight">
          Hey, I&apos;m <span className="italic">Morten Bruun</span>
        </h1>
        <p className="font-mono text-sm text-muted-foreground tracking-wide">
          Danish founder and builder based in New York.
        </p>
      </section>

      {/* 02 - Building */}
      <section className="space-y-6">
        <SectionHeader number="02" label="Building" />
        <CardGrid
          items={[
            {
              title: 'Hebbia',
              role: 'Member of Technical Staff',
              description:
                'Building AI for finance. Backed by a16z, Index, Google Ventures, Peter Thiel, and more.',
              badge: 'Product',
              href: 'https://hebbia.ai',
            },
            {
              title: 'FlashDocs',
              role: 'Co-Founder & CEO',
              description:
                'The #1 API for automating slide decks with AI. Powered 10,000+ slides per day. Product of the Day on Product Hunt.',
              badge: 'Acquired by Hebbia',
              href: 'https://flashdocs.ai',
            },
          ]}
        />
      </section>

      {/* 03 - Previously */}
      <section className="space-y-6">
        <SectionHeader number="03" label="Previously" />
        <CardGrid
          items={[
            {
              title: 'Worksome',
              role: 'SVP Revenue',
              description:
                'Scaled the North American business from launch to enterprise. Went from MD to SVP in three years.',
              badge: 'From $0 to $120M GMV',
              href: 'https://worksome.com',
            },
            {
              title: 'McKinsey & Company',
              role: 'Associate',
              description:
                'Drew charts, worked hard, excelled in Excel.',
              badge: 'Fast tracked promo in 7mo',
            },
            {
              title: 'Google',
              role: 'Industry Manager',
              description:
                'Led digital transformation for top-tier Danish partners in finance, retail, and pharma.',
              badge: 'Youngest globally',
            },
            {
              title: 'Forbes',
              role: '30 under 30',
              description:
                'Finance - Class of 2019.',
              badge: 'Class of 2019',
            },
          ]}
        />
      </section>

      {/* 04 - Education */}
      <section className="space-y-6">
        <SectionHeader number="04" label="Education" />
        <CardGrid
          items={[
            {
              title: 'London School of Economics',
              description: 'MSc Management',
              badge: '2017 - 2019',
            },
            {
              title: 'Wharton',
              description: 'Business Analytics',
              badge: '2015 - 2016',
            },
            {
              title: 'Copenhagen Business School',
              description: 'BSc Business Administration & Organizational Communication',
              badge: '2012 - 2015',
            },
          ]}
        />
      </section>

      {/* 05 - Writing */}
      <section className="space-y-6">
        <SectionHeader number="05" label="Writing" />
        <CardGrid
          items={[
            {
              title: 'The PM is dead. Long live the PM',
              description:
                'The product manager role as we know it is cooked. And that\'s not necessarily a bad thing.',
              badge: 'Feb 2026',
              href: '/blog/the-pm-is-dead-long-live-the-pm',
            },
            {
              title: 'Hello World',
              description: 'My first blog post.',
              badge: 'Blog',
              href: '/blog/hello-world',
            },
          ]}
        />
      </section>
    </div>
  );
}
