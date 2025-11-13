# KoeNaWin - Daily Round Tracker

## Overview
This is a Progressive Web App (PWA) for tracking daily rounds based on a 9x9 grid system. The app features:
- Burmese language interface
- Offline capability via service workers
- localStorage for persistence
- Vegetarian day alerts
- Responsive design

## Project Architecture
- **Frontend**: Pure HTML/CSS/JavaScript (no framework)
- **Hosting**: Static files served via Python HTTP server on port 5000
- **Storage**: Browser localStorage for user data
- **PWA Features**: Service worker (sw.js) and manifest.json for offline support

## File Structure
- `index.html` - Main application file with embedded styles and JavaScript
- `manifest.json` - PWA manifest for installability
- `sw.js` - Service worker for offline caching
- `README.md` - Basic project documentation

## Recent Changes
- 2025-11-13: Initial setup for Replit environment
  - Added Python HTTP server workflow to serve static files on port 5000
  - Configured to bind to 0.0.0.0 for Replit proxy compatibility
  - Added basic .gitignore for Replit artifacts
  - Fixed service worker registration path from `/KoeNaWin/sw.js` to `/sw.js`
  - Updated service worker cache paths for Replit environment
  - Configured deployment for autoscale target
  - Added SO_REUSEADDR to server for better restart handling

## Technical Details
- Service worker caches static assets for offline use
- Uses Tailwind CSS via CDN
- Google Fonts (Quicksand) loaded via CDN
- No build process required - pure static HTML
- Deployment: Autoscale deployment using Python HTTP server on port 5000
- Server includes cache-control headers to prevent stale content in development
