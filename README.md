# 🌤️ SkyCast – Weather Information Website

A responsive, multi-page weather website built with **HTML5, CSS3 and vanilla JavaScript**. It shows live weather and a 7-day forecast for any city using the free [Open-Meteo](https://open-meteo.com/) APIs (no API key required).

## Features
- 🔍 Search any city for current weather (temperature, feels-like, humidity, wind, daily high/low)
- 📅 7-day forecast with animated weather icons
- 📍 "My location" using the browser Geolocation API
- 🌡️ °C / °F toggle (preference saved in `localStorage`)
- 🌆 Compare 6 cities (Ludhiana, Delhi, Mumbai, London, New York, Tokyo) with sorting by name / hottest / coldest
- 📰 Weather articles with category filter (Science, Safety, Climate) and a featured video
- ✉️ Contact form with client-side validation
- 💾 Remembers your last searched city
- 📱 Responsive layout with animated sky background

## Project Structure
```
SkyCast/
├── index.html      # Home: search, current weather, 7-day forecast
├── forecast.html   # Compare Cities
├── articles.html   # Articles + video
├── about.html      # About + contact form
├── style.css       # Styling, animations, responsive rules
├── script.js       # Shared logic: navigation, API calls, rendering, filters, validation
└── assets/
    └── weather.mp4 # (optional) video shown on the Articles page
```

## How to Run
1. Download or clone the project folder.
2. Open `index.html` in any modern browser (an internet connection is needed for live data).
3. Optional: add a weather clip at `assets/weather.mp4` for the Articles page video.

## Technologies Used
HTML5 · CSS3 (Flexbox, Grid, animations, media queries) · JavaScript ES6 (async/await, Fetch API) · Geolocation API · Web Storage (localStorage) · Open-Meteo Geocoding & Forecast APIs

---

## 📘 Case Study

| | |
|---|---|
| **Title** | SkyCast – Weather Information Website: A Responsive Web Application Using Live Weather API |
| **Submitted By** | Kiran |
| **UID** | 26MCA20076 |
| **Semester** | 1 |
| **Department** | Department of Computer Application |
| **Programme** | Master of Computer Applications (MCA) |
| **Academic Year** | 2026–2028 |
| **Subject** | Web Programming (Mini Project) |

**Case study summary:** Many weather websites are cluttered with ads, need sign-ups or API keys, and make it hard to compare cities. SkyCast solves this with a clean, fully client-side application that fetches live data from Open-Meteo, converts a city name to coordinates (Geocoding API), retrieves current and 7-day weather (Forecast API) and renders it dynamically with JavaScript. The architecture has three layers — presentation (HTML/CSS), logic (`script.js`) and external data (Open-Meteo plus browser `localStorage`/Geolocation). The project was tested with 11 functional test cases covering search, unit conversion, geolocation, persistence, sorting, filtering, form validation and responsiveness.

**Limitations & future scope:** Only daily forecasts are shown; the compare list is fixed; the contact form is not connected to a server. Future work includes hourly forecasts, charts, air-quality data, weather alerts, PWA/offline support and a back-end for user favourites.

📄 Full report: [`SkyCast_MCA_Case_Study.docx`](SkyCast_MCA_Case_Study.docx)

---
© 2026 SkyCast · MCA Web Programming Mini Project · Data: Open-Meteo.com
