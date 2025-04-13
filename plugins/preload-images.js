import fs from 'fs';
import path from 'path';

export default defineNuxtPlugin((nuxtApp) => {
  if (!process.server) return; // Ensure this runs only on the server

  const assetsDir = path.resolve(process.cwd(), 'public/icons'); // Adjust path if needed
  const preloadLinks = [];

  // Read all files in the public/icons folder
  if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir);

    files.forEach((file) => {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
        preloadLinks.push({
          rel: 'preload',
          as: 'image',
          href: `/icons/${file}`, // Adjust the path to match your public folder
        });
      }
    });
  }

  // Add preload links to the head using useHead
  if (preloadLinks.length > 0) {
    const links = preloadLinks.map((link) => ({
      rel: link.rel,
      as: link.as,
      href: link.href,
    }));

    nuxtApp.hook('app:rendered', () => {
      useHead({
        link: links,
      });
    });
  }
});