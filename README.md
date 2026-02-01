# Entain - Next to Go - Racing Application

Create a single page application that displays 'Next to go’ races using our API.
A user should see 5 races at all times, and they should be sorted by time ascending. Race should disappear from the list after 1 min past the start time (advertised_start). User should see meeting name (meeting_name), race number (race_number) and countdown timer that indicates the start of the race.
User should be able to toggle race categories to view races belonging to only the selected
category.

## Quick Start

```bash
# Install dependencies
npm install

# Run the application
npm run dev

# Open http://localhost:3000
```

## Build for Production

```bash
npm run build
npm start
```

## Core Features

- Always shows 5 races - Automatically displays the next 5 races to go
- Live countdown timers - Real-time countdown to race start
- Category filtering - Filter by Horse, Greyhound, or Harness racing
- Auto-refresh - Updates every 60 seconds with fresh race data
- Race removal - Races disappear 1 minute after they start

## How it works

This is a Next.js project structured across multiple folders. Core logic such as the store and API services is housed in the lib directory, with the intention that this logic can be extracted into a separate package if required in the future. In contrast, components, hooks, and utils etc, are designed with lower reusability in mind and are more tightly coupled to the application’s business logic and functional requirements.
The project uses Tailwind CSS, with layouts and smaller UI components designed from the ground up. The mock UI design is as follows:
<img width="2853" height="2135" alt="image" src="https://github.com/user-attachments/assets/1482c9ca-a913-4c63-84fa-58a28e72e976" />

### Smart Timer System

- **Before start**: Shows countdown timer (e.g., "02m 30s")
- **After start**: Shows elapsed time with green badge (e.g., "00m 15s")
- **After 1 minute**: Race automatically disappears from the list

## Project Structure

```
app/
├── page.tsx                    # Main page
├── layout.tsx                  # App wrapper with providers
└── globals.css                 # Global styles

components/
├── Categories.tsx              # Filter buttons
├── RaceCardList.tsx            # Race grid container
├── RaceCard.tsx                # Individual race card
├── RaceTimer.tsx               # Countdown/count-up timer
└── RaceDetails.tsx             # Race information

lib/
├── store/
│   ├── store.ts                # Redux store setup
│   ├── categorySlice.ts        # Category filter state
│   ├── liveRacesSlice.ts       # Live races management
│   └── metadataSlice.ts        # Last refresh time
└── services/
    └── api.ts                  # API integration

hooks/
└── useRaceData.ts              # Main data fetching hook

types/
└── races.ts                    # TypeScript types
```

### Why Custom Hook (useRaceData)?

Instead of duplicating complex filtering and sorting logic across components, a single custom hook provides:

- One place to manage the "top 5 races" logic
- Consistent behavior everywhere
- Easier testing and maintenance
- Clean component code
- Able to have the live races into a separate redux slice and aggregate the api data with state live race data into one hook and have a centralized place to manage the data filtering logic
