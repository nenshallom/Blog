/// <reference types="vite/client" />
interface Window {
  /**
   * Represents the Google Analytics dataLayer array.
   * This is initialized before gtag.js loads.
   */
  dataLayer?: any[]; // <-- ADD THIS LINE

  /**
   * Represents the Google Analytics gtag function.
   * This is loaded from the script in index.html.
   */
  gtag?: (command: string, ...args: any[]) => void;
}
