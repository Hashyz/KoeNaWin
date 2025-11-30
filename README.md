# KoeNaWin - ကိုးနဝင်း မိုးလင်းမှသိမယ်

A Progressive Web App (PWA) for tracking daily Buddhist meditation rounds using a traditional 9x9 grid system.

## Features

- **9x9 Grid Tracking**: Follow the traditional 81-round cycle across 9 columns and 9 rows
- **83-Day Cycle**: 81 grid days + 2 rest days (Saturday/Sunday), then restart
- **Vegetarian Day Alerts**: Audio notification on column 4 days (သက်သတ်လွတ်နေ့)
- **7-Day Calendar Preview**: See upcoming rounds at a glance
- **History Tracking**: View your past 30 rounds
- **Dark Mode**: Toggle between light and dark themes
- **QR Code Backup/Restore**: Transfer your data between devices
- **Offline Support**: Works without internet connection
- **Burmese Language**: Native Myanmar language interface

## How It Works

### The 9x9 Grid System

The app tracks your progress through a 9x9 grid (81 days total):

| Row | Col 1 | Col 2 | Col 3 | Col 4* | Col 5 | Col 6 | Col 7 | Col 8 | Col 9 |
|-----|-------|-------|-------|--------|-------|-------|-------|-------|-------|
| 1   | 1     | 2     | 3     | 4      | 5     | 6     | 7     | 8     | 9     |
| 2   | 10    | 11    | 12    | 13     | 14    | 15    | 16    | 17    | 18    |
| ... | ...   | ...   | ...   | ...    | ...   | ...   | ...   | ...   | ...   |
| 9   | 73    | 74    | 75    | 76     | 77    | 78    | 79    | 80    | 81    |

*Column 4 = Vegetarian days (သက်သတ်လွတ်နေ့)

### 83-Day Cycle

1. **Days 1-81**: Regular grid rounds
2. **Days 82-83**: Rest days (နားရက်) - Saturday and Sunday
3. **Day 84**: Cycle restarts from round 1 on Monday

### Getting Started

1. Open the app
2. Select a **Monday** as your starting day
3. The app will calculate your current round automatically
4. Enable vegetarian day alerts if desired

## Backup & Restore

### Export Your Data
1. Tap "Show QR Code"
2. A QR code containing all your data will appear
3. Screenshot or show this QR to another device

### Import Data
1. Tap "Scan QR Code"
2. Allow camera access
3. Point your camera at the QR code from another device
4. Your data will be restored automatically

## Installation

### As a Web App
Simply visit the URL in any modern browser.

### As a PWA (Recommended)
1. Open the app in Chrome, Safari, or Edge
2. Look for "Add to Home Screen" or "Install" option
3. The app will work offline once installed

## Technical Details

- **Frontend**: Pure HTML/CSS/JavaScript
- **Storage**: Browser localStorage
- **Offline**: Service Worker with network-first caching
- **Libraries**: 
  - Tailwind CSS (styling)
  - qrcode.js (QR generation)
  - html5-qrcode (QR scanning)

## Data Stored

All data is stored locally in your browser:

- `startDate` - Your starting Monday
- `vegAlertsEnabled` - Vegetarian alerts toggle
- `darkMode` - Theme preference
- `roundHistory` - Last 30 round entries

## License

MIT License

---

သတိထား၍ ကိုးနဝင်း တရားအားထုတ်ပါ။ 🙏
