import { useSiteContent } from "@/context/SiteContext";

const MapSection = () => {
  const { content } = useSiteContent();

  return (
    <section id="location" className="bg-dark-bg noise-overlay relative rounded-lg py-10">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground uppercase text-center mb-8 heading-accent mx-auto w-fit">
          {content.mapTitle}
        </h2>
        <div className="rounded-2xl overflow-hidden border border-steel/10">
          <iframe
            title="Office Location"
            src={content.mapEmbedUrl}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default MapSection;
