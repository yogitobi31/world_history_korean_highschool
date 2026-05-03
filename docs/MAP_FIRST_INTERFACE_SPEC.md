# Map-First Interface Spec

## Core principle

The world map must be the main interface, not one content block among many.

This app is a world-history learning map. Cards, filters, timelines, and detail panels should behave as supporting overlays around the map.

## Required direction

1. The world map should occupy the primary screen area.
2. Information panels should float over or beside the map in a calm, minimal way.
3. The map should support zoom and pan.
4. Desktop should support mouse wheel zoom, drag pan, and click interactions.
5. Mobile should support pinch zoom, drag pan, and touch-friendly point selection.
6. Event points may become dense, so clustering, zoom-dependent visibility, or expanded hit areas should be considered.
7. The UI should not feel like a split card layout where the map is only one content section.
8. Timeline and event detail should feel organically connected to the map.

## Interaction priorities

Phase 1:
- Make the map visually dominant.
- Add zoom and pan.
- Make event points easier to select.
- Keep a floating detail panel for selected events.

Phase 2:
- Add point clustering or zoom-based point density control.
- Add line and area layers.
- Improve mobile touch interactions.

## Design principle

The interface should feel like a premium interactive atlas:

- minimal
- calm
- spacious
- map-centered
- no visual clutter
- supporting panels should appear only when useful

The user should feel: “I am exploring world history through a living map.”
