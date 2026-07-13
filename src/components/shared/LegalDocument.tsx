import type { ApprovedLegalContent } from "@/data/legal-pages";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

interface LegalDocumentProps {
  content: ApprovedLegalContent;
  h1: string;
}

const PHONE_DISPLAY = "+971 50 464 1020";

const LegalParagraph = ({ text }: { text: string }) => {
  if (text === PHONE_DISPLAY) {
    return (
      <p>
        <a
          href="tel:+971504641020"
          className="inline-flex min-h-11 items-center font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          dir="ltr"
        >
          {PHONE_DISPLAY}
        </a>
      </p>
    );
  }

  return <p>{text}</p>;
};

const LegalDocument = ({ content, h1 }: LegalDocumentProps) => (
  <div className="pt-28 pb-20">
    <div className="container mx-auto max-w-3xl px-4">
      <AnimatedSection>
        <article aria-labelledby="legal-page-title">
          <header className="mb-10 border-b border-border/70 pb-8">
            <h1 id="legal-page-title" className="mb-5 text-4xl font-display font-bold text-foreground">
              {h1}
            </h1>
            <p className="text-sm font-medium text-foreground">
              آخر تحديث: <time dateTime={content.lastUpdatedIso}>{content.lastUpdatedAr}</time>
            </p>
          </header>

          <div className="space-y-5 text-base leading-8 text-muted-foreground">
            {content.introduction.map((paragraph) => (
              <LegalParagraph key={paragraph} text={paragraph} />
            ))}
          </div>

          <div className="mt-12 space-y-12">
            {content.sections.map((section) => (
              <section key={section.heading} aria-labelledby={`section-${section.heading.split(".")[0]}`}>
                <h2
                  id={`section-${section.heading.split(".")[0]}`}
                  className="mb-5 text-2xl font-display font-semibold leading-relaxed text-foreground"
                >
                  {section.heading}
                </h2>
                <div className="space-y-5 text-base leading-8 text-muted-foreground">
                  {section.blocks.map((block, index) =>
                    block.type === "paragraph" ? (
                      <LegalParagraph key={`${section.heading}-paragraph-${index}`} text={block.text} />
                    ) : (
                      <ol key={`${section.heading}-list-${index}`} className="space-y-3" aria-label={section.heading}>
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ol>
                    ),
                  )}
                </div>
              </section>
            ))}
          </div>
        </article>
      </AnimatedSection>
    </div>
  </div>
);

export default LegalDocument;
