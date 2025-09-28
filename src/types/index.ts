export interface SiteConfig {
  hero: {
    headline: string;
    subheadline: string;
    description: string;
    primaryCta: {
      text: string;
      href: string;
    };
    secondaryCta: {
      text: string;
      href: string;
    };
  };
  chronicles: {
    title: string;
    subtitle: string;
    items: ChronicleItem[];
  };
  members: {
    title: string;
    subtitle: string;
    items: Member[];
  };
  footer: {
    title: string;
    description: string;
    cta: {
      text: string;
      href: string;
    };
  };
}

export interface ChronicleItem {
  id: string;
  title: string;
  year: string;
  description: string;
  icon: string; // SVG path or icon name
}

export interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export interface ScrollProgress {
  scrollY: number;
  scrollYProgress: number;
}
