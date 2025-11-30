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
- Backup/restore functionality (JSON export/import + QR code generation/scanning)
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
- 2025-11-30: Rest day cycle implementation
  - Added 83-day cycle (81 grid days + 2 rest days)
  - After completing 81 days, users get Saturday/Sunday rest
  - Shows "နားရက်" (Rest Day) message on rest days
  - Calendar preview highlights rest days in purple
  - Cycle restarts on Monday after rest days

- 2025-11-30: UI cleanup and improvements
  - Removed JSON export/import buttons (replaced by QR)
  - Hide setup section once start date is set
  - Added confirmation dialog for reset start date
  - Only Show QR Code and Scan QR Code buttons remain

- 2025-11-30: QR code backup/restore
  - Added QR code generation using qrcodejs library (CDN)
  - Added QR code scanning using html5-qrcode library (CDN)
  - Show QR Code button generates scannable QR with all user data
  - Scan QR Code button uses camera to import data from another device
  - Fixed timezone bug in date parsing for Monday validation

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
- QR code generation: qrcode.js (jsdelivr CDN)
- QR code scanning: html5-qrcode (unpkg CDN)
- No build process required - pure static HTML
- Deployment: Autoscale deployment using Python HTTP server on port 5000

## User Preferences Stored
- `startDate` - User's starting Monday
- `vegAlertsEnabled` - Vegetarian day alerts toggle
- `darkMode` - Dark/light theme preference
- `roundHistory` - Array of past round entries (max 30)
