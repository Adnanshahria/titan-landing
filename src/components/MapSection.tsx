const MapSection = () => {
  return (
    <section id="location" className="bg-dark-bg noise-overlay relative rounded-2xl">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground uppercase text-center mb-8 heading-accent mx-auto w-fit">
          Our Location
        </h2>
        <div className="rounded-2xl overflow-hidden border border-steel/10">
          <iframe
            title="Techno-Tech Engineering Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9024!2d90.3873!3d23.7515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b7a55cd36f%3A0x1d4b5c4e8f1a5b9e!2sFarmgate%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000"
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
