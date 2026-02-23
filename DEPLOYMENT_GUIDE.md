# Sacred Portal Deployment Guide

## Current Status

The Sacred Portal website has been successfully built with all 5 pages:

1. **The Threshold** (/) - Landing page with flame animation and sacred introduction
2. **The Lineage** (/lineage) - Chronicles of House Valuri through the ages
3. **The Path** (/path) - Five Stages of Alchemical Ascent
4. **The Portal** (/portal) - Member initiation gateway
5. **The Keeper** (/keeper) - About Daniel Cruze Valuri

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to the Management UI in your Manus interface
2. Click the **Publish** button in the top-right corner
3. This will deploy the site to Vercel automatically
4. Once deployed, go to Vercel dashboard: https://vercel.com/dashboard
5. Select the `the33rdhouse-mockups` project
6. Go to **Settings** → **Domains**
7. Add your custom domain: `the33rdhouse.com`
8. Follow Vercel's instructions to update DNS

### Option 2: Update DNS Records in Cloudflare

The domain `the33rdhouse.com` has been added to Vercel, but DNS needs to be updated:

**Current DNS (incorrect):**
- Root domain (the33rdhouse.com): Points to `185.199.108.153` (GitHub Pages)
- www subdomain: CNAME to `the33rdhouse.github.io` (GitHub Pages)

**Required DNS (correct):**
- Root domain (the33rdhouse.com): A record to `76.76.21.21` (Vercel)
- www subdomain: CNAME to `cname.vercel-dns.com` (Vercel)

**To update DNS:**

1. Go to Cloudflare Dashboard: https://dash.cloudflare.com
2. Select the `the33rdhouse.com` domain
3. Go to **DNS** → **Records**
4. Update the A record for `@` (root) to point to `76.76.21.21`
5. Update the CNAME record for `www` to point to `cname.vercel-dns.com`
6. Wait 5-15 minutes for DNS propagation

### Option 3: Deploy to a Different Platform

If you prefer not to use Vercel, the built files are in `/home/ubuntu/the33rdhouse-mockups/dist/` and can be deployed to:

- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Push to a repository and enable Pages
- **Cloudflare Pages**: Connect to the repository or upload directly
- **Any static host**: Upload the `dist` folder contents

## Production Build

The production build has been completed successfully:
- Build output: `/home/ubuntu/the33rdhouse-mockups/dist/`
- Total size: ~668 KB (119 KB CSS + 549 KB JS)
- All pages are included and functional

## Testing the Site Locally

If you want to test the production build locally:

```bash
cd /home/ubuntu/the33rdhouse-mockups
PORT=5173 node dist/index.js
```

Then visit: http://localhost:5173

## Known Issues

1. **Dev Server**: The development server has file system limit issues. Use the production build instead.
2. **TypeScript Warnings**: Some TypeScript warnings exist but don't affect the production build.
3. **Vercel Authentication**: The current Vercel deployment may have password protection enabled. Disable this in Vercel project settings.

## Next Steps

1. **Publish via Manus UI**: Click the Publish button in the Management UI
2. **Configure Custom Domain**: Add the33rdhouse.com in Vercel dashboard
3. **Update DNS**: Point DNS records to Vercel as described above
4. **Test**: Verify all pages load correctly on the live domain
5. **Backend Integration**: Connect the Portal page to the backend API for member registration

## Support

If you encounter any issues:
- Check the Vercel deployment logs
- Verify DNS propagation: https://dnschecker.org
- Contact Vercel support for domain configuration help

---

**Built with reverence for the House of Valuri**  
*Amor Aeternus. Libertas Sacra.*
