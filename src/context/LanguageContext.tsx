import { createContext, useContext, useState, ReactNode, useCallback } from "react";

export type Lang = "en" | "bn";

const translations = {
  // Navbar
  "nav.home": { en: "Home", bn: "হোম" },
  "nav.about": { en: "About", bn: "সম্পর্কে" },
  "nav.services": { en: "Services", bn: "সেবাসমূহ" },
  "nav.projects": { en: "Projects", bn: "প্রকল্পসমূহ" },
  "nav.clients": { en: "Clients", bn: "ক্লায়েন্ট" },
  "nav.certifications": { en: "Certifications", bn: "সার্টিফিকেশন" },
  "nav.contact": { en: "Contact", bn: "যোগাযোগ" },
  "nav.getQuote": { en: "Get a Quote", bn: "কোটেশন নিন" },
  "nav.menu": { en: "Menu", bn: "মেনু" },

  // Hero
  "hero.headline": { en: "Bangladesh's Most Trusted Engineering Construction Company", bn: "বাংলাদেশের সবচেয়ে বিশ্বস্ত ইঞ্জিনিয়ারিং কনস্ট্রাকশন কোম্পানি" },
  "hero.subheadline": { en: "30 Years of Excellence in Power, Energy & Industrial Sector", bn: "বিদ্যুৎ, জ্বালানি ও শিল্প খাতে ৩০ বছরের শ্রেষ্ঠত্ব" },
  "hero.viewProjects": { en: "View Our Projects", bn: "আমাদের প্রকল্প দেখুন" },
  "hero.downloadProfile": { en: "Download Company Profile", bn: "কোম্পানি প্রোফাইল ডাউনলোড" },

  // Stats
  "stats.yearsExperience": { en: "Years Experience", bn: "বছরের অভিজ্ঞতা" },
  "stats.projectsCompleted": { en: "Projects Completed", bn: "সম্পন্ন প্রকল্প" },
  "stats.governmentClients": { en: "Government Clients", bn: "সরকারি ক্লায়েন্ট" },
  "stats.established": { en: "Established", bn: "প্রতিষ্ঠিত" },
  "stats.projects": { en: "Projects", bn: "প্রকল্প" },
  "stats.years": { en: "Years", bn: "বছর" },
  "stats.clients": { en: "Clients", bn: "ক্লায়েন্ট" },
  "stats.engineers": { en: "Engineers", bn: "প্রকৌশলী" },

  // About
  "about.title": { en: "About Us", bn: "আমাদের সম্পর্কে" },

  // Services
  "services.title": { en: "Our Services", bn: "আমাদের সেবাসমূহ" },

  // Projects
  "projects.title": { en: "Our Projects", bn: "আমাদের প্রকল্পসমূহ" },
  "projects.subtitle": { en: "Explore our complete portfolio of industrial and infrastructure projects across Bangladesh.", bn: "বাংলাদেশ জুড়ে আমাদের শিল্প ও অবকাঠামো প্রকল্পের সম্পূর্ণ পোর্টফোলিও দেখুন।" },
  "projects.viewAll": { en: "View All Projects", bn: "সব প্রকল্প দেখুন" },
  "projects.locations": { en: "Project Locations", bn: "প্রকল্পের অবস্থান" },
  "projects.locationsDesc": { en: "Hover over the pins to explore our projects across Bangladesh", bn: "বাংলাদেশ জুড়ে আমাদের প্রকল্পগুলো দেখতে পিনের উপর হোভার করুন" },
  "projects.viewDetails": { en: "View Details", bn: "বিস্তারিত দেখুন" },
  "projects.across": { en: "Projects across Bangladesh", bn: "বাংলাদেশ জুড়ে প্রকল্প" },
  "projects.all": { en: "All", bn: "সব" },
  "projects.noProjects": { en: "No projects found in this category.", bn: "এই ক্যাটাগরিতে কোনো প্রকল্প পাওয়া যায়নি।" },

  // Project Detail
  "projectDetail.overview": { en: "Overview", bn: "সারসংক্ষেপ" },
  "projectDetail.scope": { en: "Scope of Work", bn: "কাজের পরিধি" },
  "projectDetail.gallery": { en: "Project Gallery", bn: "প্রকল্প গ্যালারি" },
  "projectDetail.discuss": { en: "Discuss a Similar Project", bn: "অনুরূপ প্রকল্প নিয়ে আলোচনা করুন" },
  "projectDetail.location": { en: "Project Location", bn: "প্রকল্পের অবস্থান" },
  "projectDetail.locationDesc": { en: "See where this project is located across Bangladesh", bn: "বাংলাদেশে এই প্রকল্পের অবস্থান দেখুন" },
  "projectDetail.explore": { en: "Explore More Projects", bn: "আরও প্রকল্প দেখুন" },
  "projectDetail.youMayLike": { en: "You may also like", bn: "আপনি আরও পছন্দ করতে পারেন" },
  "projectDetail.similar": { en: "Similar", bn: "অনুরূপ" },
  "projectDetail.client": { en: "Client", bn: "ক্লায়েন্ট" },
  "projectDetail.locationLabel": { en: "Location", bn: "অবস্থান" },
  "projectDetail.year": { en: "Year", bn: "বছর" },
  "projectDetail.duration": { en: "Duration", bn: "সময়কাল" },
  "projectDetail.notFound": { en: "Project Not Found", bn: "প্রকল্প পাওয়া যায়নি" },
  "projectDetail.backHome": { en: "← Back to Home", bn: "← হোমে ফিরুন" },
  "projectDetail.viewProject": { en: "View Project →", bn: "প্রকল্প দেখুন →" },

  // Clients
  "clients.title": { en: "Our Clients", bn: "আমাদের ক্লায়েন্ট" },

  // Certifications
  "certifications.title": { en: "Certifications", bn: "সার্টিফিকেশন" },

  // Testimonials
  "testimonials.title": { en: "Testimonials", bn: "প্রশংসাপত্র" },

  // Why Choose Us
  "whyChooseUs.title": { en: "Why Choose Us", bn: "কেন আমাদের বেছে নেবেন" },

  // Contact
  "contact.title": { en: "Get In Touch", bn: "যোগাযোগ করুন" },
  "contact.fullName": { en: "Full Name", bn: "পূর্ণ নাম" },
  "contact.company": { en: "Company Name", bn: "কোম্পানির নাম" },
  "contact.phone": { en: "Phone Number", bn: "ফোন নম্বর" },
  "contact.email": { en: "Email Address", bn: "ইমেইল" },
  "contact.projectType": { en: "Project Type", bn: "প্রকল্পের ধরন" },
  "contact.message": { en: "Message", bn: "বার্তা" },
  "contact.submit": { en: "Submit Inquiry", bn: "অনুসন্ধান পাঠান" },
  "contact.submitting": { en: "Submitting...", bn: "পাঠানো হচ্ছে..." },
  "contact.success": { en: "Thank you! We'll get back to you shortly.", bn: "ধন্যবাদ! আমরা শীঘ্রই যোগাযোগ করব।" },
  "contact.selectType": { en: "Select project type", bn: "প্রকল্পের ধরন নির্বাচন করুন" },
  "contact.powerEnergy": { en: "Power & Energy", bn: "বিদ্যুৎ ও জ্বালানি" },
  "contact.cement": { en: "Cement Industry", bn: "সিমেন্ট শিল্প" },
  "contact.fertilizer": { en: "Fertilizer Plant", bn: "সার কারখানা" },
  "contact.refinery": { en: "Refinery", bn: "শোধনাগার" },
  "contact.infrastructure": { en: "Infrastructure", bn: "অবকাঠামো" },
  "contact.other": { en: "Other", bn: "অন্যান্য" },

  // Footer
  "footer.services": { en: "Services", bn: "সেবাসমূহ" },
  "footer.contact": { en: "Contact", bn: "যোগাযোগ" },
  "footer.officeHours": { en: "Office Hours", bn: "অফিস সময়" },
  "footer.quickLinks": { en: "Quick Links & Services", bn: "দ্রুত লিংক ও সেবা" },
  "footer.fax": { en: "Fax", bn: "ফ্যাক্স" },

  // Map
  "map.title": { en: "Our Location", bn: "আমাদের অবস্থান" },

  // Chatbot
  "chatbot.title": { en: "Techno-Tech AI", bn: "টেকনো-টেক এআই" },
  "chatbot.subtitle": { en: "Engineering Assistant", bn: "ইঞ্জিনিয়ারিং সহকারী" },
  "chatbot.placeholder": { en: "Ask about our services...", bn: "আমাদের সেবা সম্পর্কে জিজ্ঞাসা করুন..." },
  "chatbot.greeting": { en: "Hello! I'm the Techno-Tech AI assistant. How can I help you learn about our engineering services, projects, or certifications?", bn: "হ্যালো! আমি টেকনো-টেক এআই সহকারী। আমাদের ইঞ্জিনিয়ারিং সেবা, প্রকল্প বা সার্টিফিকেশন সম্পর্কে কীভাবে সাহায্য করতে পারি?" },

  // Admin Panel
  "admin.title": { en: "Admin Panel", bn: "অ্যাডমিন প্যানেল" },
  "admin.general": { en: "General", bn: "সাধারণ" },
  "admin.services": { en: "Services", bn: "সেবাসমূহ" },
  "admin.clients": { en: "Clients", bn: "ক্লায়েন্ট" },
  "admin.certifications": { en: "Certifications", bn: "সার্টিফিকেশন" },
  "admin.testimonials": { en: "Testimonials", bn: "প্রশংসাপত্র" },
  "admin.whyChooseUs": { en: "Why Choose Us", bn: "কেন আমাদের" },
  "admin.footer": { en: "Footer", bn: "ফুটার" },
  "admin.leads": { en: "Leads", bn: "লিডস" },
  "admin.chatbot": { en: "AI Chatbot", bn: "এআই চ্যাটবট" },
  "admin.images": { en: "Project Images", bn: "প্রকল্পের ছবি" },
  "admin.descriptions": { en: "Descriptions", bn: "বিবরণ" },
  "admin.mapPins": { en: "Map Pins", bn: "ম্যাপ পিন" },
  "admin.saveChanges": { en: "Save Changes", bn: "পরিবর্তন সংরক্ষণ" },
  "admin.backToSite": { en: "Back to Site", bn: "সাইটে ফিরুন" },
  "admin.logout": { en: "Logout", bn: "লগআউট" },
  "admin.login": { en: "Admin Login", bn: "অ্যাডমিন লগইন" },
  "admin.password": { en: "Password", bn: "পাসওয়ার্ড" },
  "admin.enter": { en: "Enter", bn: "প্রবেশ" },
  "admin.incorrectPassword": { en: "Incorrect password", bn: "ভুল পাসওয়ার্ড" },
  "admin.adminAccess": { en: "Admin Access", bn: "অ্যাডমিন অ্যাক্সেস" },
  "admin.enterPassword": { en: "Enter password", bn: "পাসওয়ার্ড দিন" },
  "admin.heroHeadline": { en: "Hero Headline", bn: "হিরো শিরোনাম" },
  "admin.heroSubheadline": { en: "Hero Subheadline", bn: "হিরো উপশিরোনাম" },
  "admin.aboutSection": { en: "About Section", bn: "সম্পর্কে বিভাগ" },
  "admin.aboutTitle": { en: "About Title", bn: "সম্পর্কে শিরোনাম" },
  "admin.aboutSubtitle": { en: "About Subtitle", bn: "সম্পর্কে উপশিরোনাম" },
  "admin.aboutText": { en: "About Text", bn: "সম্পর্কে টেক্সট" },
  "admin.aboutHighlight": { en: "About Highlight", bn: "সম্পর্কে হাইলাইট" },
  "admin.aboutBullets": { en: "About Bullet Points", bn: "সম্পর্কে বুলেট পয়েন্ট" },
  "admin.heroStats": { en: "Hero Stats", bn: "হিরো পরিসংখ্যান" },
  "admin.contactMap": { en: "Contact & Map", bn: "যোগাযোগ ও ম্যাপ" },
  "admin.contactSectionTitle": { en: "Contact Section Title", bn: "যোগাযোগ বিভাগ শিরোনাম" },
  "admin.mapSectionTitle": { en: "Map Section Title", bn: "ম্যাপ বিভাগ শিরোনাম" },
  "admin.mapEmbedUrl": { en: "Map Embed URL", bn: "ম্যাপ এম্বেড URL" },
  "admin.contactEmail": { en: "Contact Email", bn: "যোগাযোগ ইমেইল" },
  "admin.contactPhone": { en: "Contact Phone", bn: "যোগাযোগ ফোন" },
  "admin.contactPhone2": { en: "Contact Phone 2", bn: "যোগাযোগ ফোন ২" },
  "admin.fax": { en: "Fax", bn: "ফ্যাক্স" },
  "admin.contactAddress": { en: "Contact Address", bn: "যোগাযোগ ঠিকানা" },
  "admin.officeHours": { en: "Office Hours", bn: "অফিস সময়" },
  "admin.sectionTitle": { en: "Section Title", bn: "বিভাগ শিরোনাম" },
  "admin.sectionSubtitle": { en: "Section Subtitle", bn: "বিভাগ উপশিরোনাম" },
  "admin.serviceTitle": { en: "Service Title", bn: "সেবা শিরোনাম" },
  "admin.description": { en: "Description", bn: "বিবরণ" },
  "admin.name": { en: "Name", bn: "নাম" },
  "admin.detail": { en: "Detail", bn: "বিস্তারিত" },
  "admin.authority": { en: "Authority", bn: "কর্তৃপক্ষ" },
  "admin.quote": { en: "Quote", bn: "উক্তি" },
  "admin.title2": { en: "Title", bn: "পদবি" },
  "admin.organization": { en: "Organization", bn: "প্রতিষ্ঠান" },
  "admin.linkedProject": { en: "Linked Project", bn: "সংযুক্ত প্রকল্প" },
  "admin.noLinkedProject": { en: "No linked project", bn: "কোনো সংযুক্ত প্রকল্প নেই" },
  "admin.companyName": { en: "Company Name", bn: "কোম্পানির নাম" },
  "admin.tagline": { en: "Tagline", bn: "ট্যাগলাইন" },
  "admin.copyrightText": { en: "Copyright Text", bn: "কপিরাইট টেক্সট" },
  "admin.serviceLinks": { en: "Service Links", bn: "সেবা লিংক" },
  "admin.apiKeys": { en: "API Keys", bn: "এপিআই কী" },
  "admin.apiKeysWarning": { en: "⚠️ Keys are stored in localStorage. For production, move to server-side secrets.", bn: "⚠️ কীগুলো localStorage-এ সংরক্ষিত। প্রোডাকশনে সার্ভার-সাইড সিক্রেটে স্থানান্তর করুন।" },
  "admin.systemPrompt": { en: "System Prompt", bn: "সিস্টেম প্রম্পট" },
  "admin.aiSystemPrompt": { en: "AI System Prompt", bn: "এআই সিস্টেম প্রম্পট" },
  "admin.keyPoints": { en: "Key Points", bn: "মূল পয়েন্ট" },
  "admin.yearsCount": { en: "Years Count", bn: "বছরের সংখ্যা" },
  "admin.yearsLabel": { en: "Years Label", bn: "বছরের লেবেল" },
  "admin.value": { en: "Value", bn: "মান" },
  "admin.suffix": { en: "Suffix", bn: "প্রত্যয়" },
  "admin.label": { en: "Label", bn: "লেবেল" },
  "admin.projectsSection": { en: "Projects Section", bn: "প্রকল্প বিভাগ" },

  // Common
  "common.bangladesh": { en: "Bangladesh", bn: "বাংলাদেশ" },
  "common.viewAll": { en: "View All", bn: "সব দেখুন" },
  "common.readMore": { en: "Read More", bn: "আরও পড়ুন" },
  "common.remove": { en: "Remove", bn: "মুছুন" },
  "common.add": { en: "Add", bn: "যোগ করুন" },
  "common.save": { en: "Save", bn: "সংরক্ষণ" },
  "common.cancel": { en: "Cancel", bn: "বাতিল" },
  "common.edit": { en: "Edit", bn: "সম্পাদনা" },
  "common.delete": { en: "Delete", bn: "মুছুন" },
  "common.addBulletPoint": { en: "+ Add Bullet Point", bn: "+ বুলেট পয়েন্ট যোগ করুন" },
  "common.addClient": { en: "+ Add Client", bn: "+ ক্লায়েন্ট যোগ করুন" },
  "common.addCertification": { en: "+ Add Certification", bn: "+ সার্টিফিকেশন যোগ করুন" },
  "common.removeCertification": { en: "Remove certification", bn: "সার্টিফিকেশন মুছুন" },
  "common.addTestimonial": { en: "+ Add Testimonial", bn: "+ প্রশংসাপত্র যোগ করুন" },
  "common.removeTestimonial": { en: "Remove testimonial", bn: "প্রশংসাপত্র মুছুন" },
  "common.addServiceLink": { en: "+ Add Service Link", bn: "+ সেবা লিংক যোগ করুন" },
  "common.addPoint": { en: "+ Add Point", bn: "+ পয়েন্ট যোগ করুন" },

  // Categories
  "category.all": { en: "All", bn: "সব" },
  "category.powerSector": { en: "Power Sector", bn: "বিদ্যুৎ খাত" },
  "category.cement": { en: "Cement", bn: "সিমেন্ট" },
  "category.fertilizer": { en: "Fertilizer", bn: "সার" },
  "category.refinery": { en: "Refinery", bn: "শোধনাগার" },
  "category.sports": { en: "Sports", bn: "খেলাধুলা" },
  "category.water": { en: "Water", bn: "পানি" },
} as const;

type TranslationKey = keyof typeof translations;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("site-lang");
    return (saved === "bn" ? "bn" : "en") as Lang;
  });

  const handleSetLang = useCallback((newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("site-lang", newLang);
  }, []);

  const toggleLang = useCallback(() => {
    handleSetLang(lang === "en" ? "bn" : "en");
  }, [lang, handleSetLang]);

  const t = useCallback((key: TranslationKey): string => {
    return translations[key]?.[lang] || key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
