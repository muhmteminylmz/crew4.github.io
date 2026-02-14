// Project Portfolio Data
const projectsData = {
  tr: [
    {
      id: "interax",
      title: "Interax Website",
      image:
        "https://cdn.prod.website-files.com/6988daaeeaa3c0b1b8065fe0/6988dab0eaa3c0b1b806604d_project-1.jpg",
      category: "Web Tasarım",
      description:
        "Interax için modern ve responsive bir web sitesi tasarladık. UX/UI odaklı yaklaşımımız sayesinde kullanıcı deneyimi ön plana alınmıştır.",
      challenge:
        "Karmaşık bir hizmet yapısını basit ve anlaşılır bir şekilde sunmak",
      solution: "Sezgisel navigasyon, modern tasarım ve hızlı yükleme süresi",
      results: [
        "120K aylık ziyaretçi",
        "+300% dönüşüm artışı",
        "4.9/5.0 kullanıcı puanı",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      year: "2025",
    },
    {
      id: "comet",
      title: "Comet App",
      image:
        "https://cdn.prod.website-files.com/6988daaeeaa3c0b1b8065fe0/6988dab0eaa3c0b1b806604c_project-2.webp",
      category: "Sosyal Medya",
      description:
        "Comet App için kapsamlı sosyal medya yönetimi ve içerik stratejisi uyguladık. Organik büyüme ve marka bilinirliği sağladık.",
      challenge:
        "Yeni bir uygulamanın pazarına giriş yapması ve marka bilinirliği kazanması",
      solution:
        "Stratejik içerik planı, influencer işbirliği ve kampanya yönetimi",
      results: [
        "+50K takipçi",
        "+2.5K günlük aktif kullanıcı",
        "15% engagement oranı",
      ],
      technologies: ["Instagram", "TikTok", "Twitter", "Content Strategy"],
      year: "2025",
    },
    {
      id: "nova",
      title: "Nova Branding",
      image:
        "https://cdn.prod.website-files.com/6988daaeeaa3c0b1b8065fe0/6988dab0eaa3c0b1b8066048_project-4.webp",
      category: "Marka Kimliği",
      description:
        "Nova şirketi için tamamen yeni bir marka kimliği tasarladık. Logo, renkler ve tipografi seçimi markanın değerlerini yansıtıyor.",
      challenge: "Yeni bir marka oluşturmak ve pazar segmentinde öne çıkmak",
      solution:
        "Kapsamlı marka stratejisi, logo tasarımı ve kurumsal kimlik paketi",
      results: [
        "Marka farkındalığı +85%",
        "+200 B2B müşteri",
        "30 milyon TL değer artışı",
      ],
      technologies: [
        "Brand Strategy",
        "Logo Design",
        "Corporate Identity",
        "Visual System",
      ],
      year: "2024",
    },
    {
      id: "zenith",
      title: "Zenith SEO",
      image:
        "https://cdn.prod.website-files.com/6988daaeeaa3c0b1b8065fe0/6988dab0eaa3c0b1b806604a_project-3.webp",
      category: "SEO & Pazarlama",
      description:
        "Zenith şirketi için kapsamlı SEO stratejisi ve dijital pazarlama kampanyaları yönettiğiz. Organik trafik önemli ölçüde artmıştır.",
      challenge: "Yüksek rekabet olan bir pazarda üst sıraya çıkmak",
      solution: "Teknik SEO, içerik optimizasyonu ve link building stratejisi",
      results: [
        "+200% organik trafik",
        "15 ana anahtar kelimedde 1. sıra",
        "+500 günlük ziyaret",
      ],
      technologies: ["SEO", "SEM", "Content Optimization", "Analytics"],
      year: "2024",
    },
  ],
  en: [
    {
      id: "interax",
      title: "Interax Website",
      image:
        "https://cdn.prod.website-files.com/6988daaeeaa3c0b1b8065fe0/6988dab0eaa3c0b1b806604d_project-1.jpg",
      category: "Web Design",
      description:
        "We designed a modern and responsive website for Interax. Our UX/UI-focused approach prioritized user experience.",
      challenge:
        "Presenting a complex service structure in a simple and understandable way",
      solution: "Intuitive navigation, modern design, and fast loading time",
      results: [
        "120K monthly visitors",
        "+300% conversion increase",
        "4.9/5.0 user rating",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      year: "2025",
    },
    {
      id: "comet",
      title: "Comet App",
      image:
        "https://cdn.prod.website-files.com/6988daaeeaa3c0b1b8065fe0/6988dab0eaa3c0b1b806604c_project-2.webp",
      category: "Social Media",
      description:
        "We implemented comprehensive social media management and content strategy for Comet App. We achieved organic growth and brand awareness.",
      challenge: "New app market entry and brand awareness",
      solution:
        "Strategic content plan, influencer collaboration, and campaign management",
      results: [
        "+50K followers",
        "+2.5K daily active users",
        "15% engagement rate",
      ],
      technologies: ["Instagram", "TikTok", "Twitter", "Content Strategy"],
      year: "2025",
    },
    {
      id: "nova",
      title: "Nova Branding",
      image:
        "https://cdn.prod.website-files.com/6988daaeeaa3c0b1b8065fe0/6988dab0eaa3c0b1b8066048_project-4.webp",
      category: "Brand Identity",
      description:
        "We designed a completely new brand identity for Nova. Logo, colors, and typography choices reflect the brand's values.",
      challenge: "Creating a new brand and standing out in the market segment",
      solution:
        "Comprehensive brand strategy, logo design, and corporate identity package",
      results: [
        "Brand awareness +85%",
        "+200 B2B customers",
        "$30M value increase",
      ],
      technologies: [
        "Brand Strategy",
        "Logo Design",
        "Corporate Identity",
        "Visual System",
      ],
      year: "2024",
    },
    {
      id: "zenith",
      title: "Zenith SEO",
      image:
        "https://cdn.prod.website-files.com/6988daaeeaa3c0b1b8065fe0/6988dab0eaa3c0b1b806604a_project-3.webp",
      category: "SEO & Marketing",
      description:
        "We managed comprehensive SEO strategy and digital marketing campaigns for Zenith. Organic traffic increased significantly.",
      challenge: "Ranking top in a highly competitive market",
      solution:
        "Technical SEO, content optimization, and link building strategy",
      results: [
        "+200% organic traffic",
        "1st ranking in 15 main keywords",
        "+500 daily visits",
      ],
      technologies: ["SEO", "SEM", "Content Optimization", "Analytics"],
      year: "2024",
    },
  ],
};

// Get projects by current language
function getProjects() {
  const lang = getCurrentLanguage();
  return projectsData[lang] || projectsData.tr;
}
