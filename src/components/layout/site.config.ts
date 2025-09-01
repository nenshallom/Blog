import { FaFacebook,  FaLinkedin,  FaInstagramSquare } from "react-icons/fa";
import { PiXLogoBold } from "react-icons/pi";


export const MainLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Our Story", href: "/ourStory" },
    { name: "NewsLetter", href: "/NewsLetter" },
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
