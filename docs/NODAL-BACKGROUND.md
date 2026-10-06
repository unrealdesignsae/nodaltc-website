# Restored Nodal background — 1 October 2026

User clarified that the missing animation is from https://nodaltc.com, not the separate Unreal hero wave.

Inspected the deployed HTML and its NodeCanvas client bundle. It uses the same connected-node implementation already present in this repository: 80 desktop nodes, 220px connection distance, pulsing hub nodes, 140px mouse-influence radius, cursor aura, connection brightening and repulsion. That component had been removed from the page during the previous simplification.

Restored NodeCanvas in the page, behind content, with pointer-events disabled. Raised its layer opacity from the reference site's 0.15 to 0.45 as requested for visibility. Made the drone section backdrop translucent enough for the network to remain visible there. Original interaction/drawing logic preserved, including the existing smaller mobile node count, reduced-motion handling and suspension while the hero is visible or the document is hidden. The Unreal hero wave remains its own animation.

The approach visual remains the newly requested compact automatic scan beside the copy, without slider, drag handle, overlay labels or playback controls. Original media files are unchanged.
