# Infrascale Africa Limited — Static Website

A pure HTML / Bootstrap 5 / CSS / JavaScript website. **No build step needed.** Edit any file and reupload to cPanel — changes appear instantly.

---

## File Structure

```
cpanel-site/
├── index.html          ← Main page (all sections)
├── css/
│   └── style.css       ← All custom styles
├── js/
│   └── main.js         ← Mobile menu, contact form, animations
├── images/
│   ├── hero.webp       ← Hero background (1408×768)
│   ├── connectivity.webp
│   ├── digital.webp
│   ├── energy.webp
│   └── *-md.webp       ← Smaller variants for cards
├── logo.png            ← Site logo (used in header + footer)
├── favicon.svg         ← Browser tab icon
├── opengraph.jpg       ← Social sharing image (1200×630)
├── robots.txt          ← Search engine directives
├── sitemap.xml         ← Site map for Google
├── .htaccess           ← Apache security & performance config
└── README.md           ← This file
```

---

## Deploying to cPanel

1. **Compress** the entire `cpanel-site/` folder contents into a zip or tar.gz
2. Log in to **cPanel → File Manager**
3. Navigate to your **`public_html/`** folder (or your domain's document root)
4. **Upload** the zip and **Extract** it
5. Make sure the contents (not the folder itself) sit directly inside `public_html/`
6. Visit your domain — done!

---

## Editing the Site

### Change the Logo
Replace `logo.png` with your new logo file (keep the same filename).
- Recommended size: 600×140 px or 4:1 ratio
- Format: PNG with transparent background

### Change Logo Size
Edit `css/style.css`, search for `.site-logo`:
```css
.site-logo {
  height: 48px;        /* mobile size */
  max-width: 260px;
}
@media (min-width: 992px) {
  .site-logo { 
    height: 64px;      /* desktop size */
    max-width: 360px; 
  }
}
```

### Change Brand Colours
Edit `css/style.css`, top of file under `:root {`:
```css
--color-primary: #C1440E;     /* Terracotta — main brand */
--color-accent: #E89F2C;      /* Amber */
--color-secondary: #4A90A4;   /* Steel blue */
--color-bg: #0A0E14;          /* Page background */
```

### Edit Text Content
Open `index.html` and edit directly — sections are clearly commented:
- **Hero** — search for `<!-- 1. HERO SECTION -->`
- **Thesis** — search for `<!-- 2. THE THESIS -->`
- **Services** — search for `<!-- 3. SERVICES -->`
- **Stats** — search for `<!-- 4. SCALE & STATS -->`
- **How We Deliver** — search for `<!-- 5. HOW WE DELIVER -->`
- **CTA** — search for `<!-- 7. CTA / CONTACT -->`
- **Footer** — search for `<!-- 8. FOOTER -->`

### Add or Change Nav Links
Edit `index.html`:
- **Desktop nav**: search for `<!-- Desktop Nav -->`
- **Mobile nav**: search for `<!-- Mobile Menu Drawer -->`

### Contact Form
- Form submissions go to **info@infrascale.africa** via Web3Forms
- Your access key is in `js/main.js` (line ~99) — change it if needed:
  ```js
  access_key: 'a344f951-eaa0-4df1-9425-689e20c3b6b6'
  ```
- Edit enquiry types in `index.html` — search for `<!-- CONTACT MODAL -->`

### Replace Images
Drop a new file into the `images/` folder with the same name to replace.
Recommended: **WebP format** for best performance.

To convert images online: use [squoosh.app](https://squoosh.app)

---

## Built-in Features

- **Bootstrap 5** — responsive grid + components
- **AOS** — scroll-triggered fade animations
- **Bootstrap Icons** — full icon library
- **Google Analytics 4** — tracking code already installed
- **SEO** — full meta tags, Open Graph, Twitter Card, JSON-LD schema
- **Security** — HSTS, CSP, X-Frame-Options via `.htaccess`
- **Performance** — Gzip compression, browser caching, WebP images, lazy loading
- **Web3Forms contact form** — sends to `info@infrascale.africa`

---

## Browser Support

Modern browsers (Chrome, Edge, Firefox, Safari — last 2 versions). The site uses WebP images and modern CSS.

---

## SEO Checklist (after going live)

1. Submit `https://infrascale.africa/sitemap.xml` to [Google Search Console](https://search.google.com/search-console)
2. Verify your domain in Google Search Console
3. Submit to [Bing Webmaster Tools](https://www.bing.com/webmasters)
4. Set up Google Analytics goals for the contact form
5. Update social media links in the JSON-LD schema (in `index.html` `sameAs` array)
