const MapSection = () => {
  return (
    <section className="w-full">
      <iframe
        title="Techno-Tech Engineering Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9024!2d90.3873!3d23.7515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b7a55cd36f%3A0x1d4b5c4e8f1a5b9e!2sFarmgate%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000"
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="grayscale hover:grayscale-0 transition-all duration-500"
      />
    </section>
  );
};

export default MapSection;
