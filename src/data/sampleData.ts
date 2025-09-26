import { SiteConfig } from '../types';

export const sampleSiteConfig: SiteConfig = {
  hero: {
    headline: "Artisan Chronicles",
    subheadline: "Where Tradition Meets Innovation",
    description: "Discover the timeless craft of master artisans who have dedicated their lives to preserving ancient techniques while embracing modern excellence.",
    primaryCta: {
      text: "Explore Collection",
      href: "#chronicles"
    },
    secondaryCta: {
      text: "Meet Artisans",
      href: "#members"
    }
  },
  chronicles: {
    title: "Our Heritage",
    subtitle: "Chronicles of Craftsmanship",
    items: [
      {
        id: "founding",
        title: "The Founding",
        year: "1847",
        description: "Established by master craftsman Edmund Hartwell in the heart of the old quarter, our workshop began as a humble atelier dedicated to the finest woodworking traditions.",
        icon: "M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z"
      },
      {
        id: "expansion",
        title: "The Great Expansion",
        year: "1923",
        description: "Under the guidance of Helena Hartwell, the workshop expanded to include metalworking, leathercraft, and textile arts, becoming a beacon of artisanal excellence.",
        icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
      },
      {
        id: "renaissance",
        title: "Modern Renaissance",
        year: "1987",
        description: "The workshop embraced contemporary design while maintaining traditional techniques, creating a unique fusion that defines our modern identity.",
        icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      }
    ]
  },
  members: {
    title: "Master Artisans",
    subtitle: "The Hands Behind the Craft",
    items: [
      {
        id: "elena",
        name: "Elena Vasquez",
        role: "Master Woodworker",
        bio: "With over 30 years of experience, Elena specializes in traditional joinery techniques passed down through generations of craftspeople.",
        avatar: "/api/placeholder/200/200",
        social: {
          linkedin: "https://linkedin.com/in/elena-vasquez",
          website: "https://elena-woodcraft.com"
        }
      },
      {
        id: "marcus",
        name: "Marcus Chen",
        role: "Metal Artisan",
        bio: "Marcus combines ancient blacksmithing techniques with modern metallurgy to create stunning functional art pieces.",
        avatar: "/api/placeholder/200/200",
        social: {
          twitter: "https://twitter.com/marcusmetalwork",
          website: "https://marcuschen.art"
        }
      },
      {
        id: "sophia",
        name: "Sophia Andersson",
        role: "Textile Designer",
        bio: "Sophia weaves stories into fabric, using traditional looms and natural dyes to create contemporary textile masterpieces.",
        avatar: "/api/placeholder/200/200",
        social: {
          linkedin: "https://linkedin.com/in/sophia-andersson",
          github: "https://github.com/sophia-textiles"
        }
      },
      {
        id: "james",
        name: "James Morrison",
        role: "Leather Craftsman",
        bio: "James transforms raw hide into exquisite leather goods using time-honored techniques and the finest materials.",
        avatar: "/api/placeholder/200/200",
        social: {
          website: "https://morrison-leather.com",
          linkedin: "https://linkedin.com/in/james-morrison-leather"
        }
      },
      {
        id: "aria",
        name: "Aria Nakamura",
        role: "Ceramic Artist",
        bio: "Aria's pottery reflects the harmony between earth and fire, creating vessels that are both functional and deeply spiritual.",
        avatar: "/api/placeholder/200/200",
        social: {
          twitter: "https://twitter.com/aria_ceramics",
          website: "https://aria-pottery.com"
        }
      }
    ]
  },
  footer: {
    title: "Join Our Legacy",
    description: "Become part of a tradition that spans generations. Whether you're seeking to commission a piece or learn the craft yourself, we welcome you to our workshop.",
    cta: {
      text: "Begin Your Journey",
      href: "/contact"
    }
  }
};
