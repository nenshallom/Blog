import { FaFacebook,  FaLinkedin,  FaInstagramSquare } from "react-icons/fa";
import { PiXLogoBold } from "react-icons/pi";
import { Home, BookOpen, User, Mail } from "lucide-react";


export const MainLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Our Story", href: "/ourStory", icon: User },
  { name: "NewsLetter", href: "/NewsLetter", icon: Mail },
  ];

export const footerTags = [
  "#AI",
  "#BusinessTools",
  "#Productivity",
  "#DeepDive",
  "#Innovation",
];

export const socialLinks = [
  { href: "https://www.instagram.com/codeandcultivatenow/", label: "Instagram", icon:  FaInstagramSquare },
  { href: "https://x.com/CodeCultivate", label: "Twitter", icon: PiXLogoBold },
  { href: "#", label: "Facebook", icon: FaFacebook },
  { href: "#", label: "LinkedIn", icon:  FaLinkedin},
];
