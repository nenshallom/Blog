export const toggleDarkMode = () => {
  const root = document.documentElement;
  const isDark = root.classList.contains("dark");

  if (isDark) {
    root.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    root.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
};

export const initializeTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const root = document.documentElement;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};
