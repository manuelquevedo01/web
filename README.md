# Manu Saxophonist Dubai

Professional website for Manu, a saxophonist based in Dubai specializing in live performances at luxury events.

## 🎷 Features

- **Modern Design**: Premium aesthetics with glassmorphism, smooth animations, and elegant typography
- **Full SEO Optimization**: Meta tags, Open Graph, Twitter Cards, and comprehensive JSON-LD structured data
- **AI Crawler Ready**: Optimized for ChatGPT, Claude, and other AI assistants
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **GitHub Pages Ready**: Pure HTML/CSS/JS with no build step required

## 🚀 Deployment to GitHub Pages

### Option 1: Quick Deploy

1. Create a new GitHub repository named `manusax.github.io` (or your preferred name)
2. Push all files to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. Go to **Settings** → **Pages** → Select **main** branch → Save
4. Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO/`

### Option 2: Custom Domain

1. Follow Option 1 steps first
2. In **Settings** → **Pages** → **Custom domain**, enter your domain (e.g., `manusax.com`)
3. Create a `CNAME` file with your domain:
   ```
   manusax.com
   ```
4. Configure your domain's DNS:
   - **A Records** pointing to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **CNAME Record**: `www` → `YOUR_USERNAME.github.io`

5. Enable **Enforce HTTPS** in GitHub Pages settings

## 📝 Customization

### Update Contact Information
Edit `index.html` and replace:
- `book@manusax.com` with your email
- `+971 XX XXX XXXX` with your phone number
- Social media URLs with your profiles
- Form action URL with your Formspree ID (get one at [formspree.io](https://formspree.io))

### Update Domain
Find and replace `manusax.com` with your actual domain in:
- `index.html` (meta tags, canonical URL, JSON-LD)
- `sitemap.xml`
- `robots.txt`

## 🔍 SEO Features

- **Structured Data**: Person, LocalBusiness, MusicGroup, FAQPage schemas
- **Local SEO**: Dubai/UAE geo-targeting
- **Social Sharing**: Full Open Graph and Twitter Card support
- **Semantic HTML**: Proper heading hierarchy and ARIA labels

## 📁 File Structure

```
/
├── index.html      # Main webpage
├── styles.css      # All styles
├── script.js       # Interactivity
├── robots.txt      # Search engine directives
├── sitemap.xml     # Sitemap for crawlers
├── README.md       # This file
└── images/
    ├── hero.png
    ├── event-rooftop.png
    ├── event-wedding.png
    └── saxophone-closeup.png
```

## 📄 License

© 2024 Manu Saxophonist Dubai. All rights reserved.
