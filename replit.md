# KoeNaWin - Daily Round Tracker

## Overview
This is a Progressive Web App (PWA) for tracking daily rounds based on a 9x9 grid system. The app features:
- Burmese language interface
- Dark mode with system preference detection
- Offline capability via service workers
- localStorage for persistence
- Vegetarian day alerts with audio notification
- 7-day calendar preview
- History tracking
- Backup/restore functionality
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
- `server.py` - Python HTTP server for development
- `icons/` - PWA icons (192x192 and 512x512)
- `README.md` - Basic project documentation

## Recent Changes
- 2025-11-30: Major visual and functional enhancements
  - Added dark mode toggle with localStorage persistence
  - Created PWA icons and updated manifest
  - Added smooth animations for interactions
  - Built 7-day calendar preview with round and vegetarian day highlights
  - Implemented history tracking for past rounds
  - Added notification sound for vegetarian day alerts
  - Created backup/restore functionality (JSON export/import)
  - Updated service worker with network-first caching strategy

- 2025-11-13: Initial setup for Replit environment
  - Added Python HTTP server workflow to serve static files on port 5000
  - Configured to bind to 0.0.0.0 for Replit proxy compatibility
  - Fixed service worker registration path
  - Configured deployment for autoscale target

## Technical Details
- CSS custom properties system for theme switching
- Service worker uses network-first strategy with cache fallback
- Uses Tailwind CSS via CDN
- Google Fonts (Quicksand) loaded via CDN
- No build process required - pure static HTML
- Deployment: Autoscale deployment using Python HTTP server on port 5000

## User Preferences Stored
- `startDate` - User's starting Monday
- `vegAlertsEnabled` - Vegetarian day alerts toggle
- `darkMode` - Dark/light theme preference
- `roundHistory` - Array of past round entries (max 30)
