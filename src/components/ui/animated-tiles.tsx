"use client"

import { useEffect, useRef } from "react"

interface AnimatedTilesProps {
  rows?: number
  cols?: number
  /** Max tile size in px — will shrink on narrow viewports */
  tileSize?: number
  imageUrl?: string
}

export function AnimatedTiles({
  rows = 8,
  cols = 6,
  tileSize = 65,
  imageUrl = "/founder.jpg",
}: AnimatedTilesProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const tilesRef = useRef<HTMLDivElement>(null)

  // Each value = how much the tile COVERS the image (0.0 = fully revealed, 1.0 = fully hidden)
  const coverOpacities = [
    [1.00, 0.95, 0.85, 0.85, 0.95, 1.00],
    [0.95, 0.60, 0.25, 0.25, 0.60, 0.95],
    [0.80, 0.20, 0.04, 0.04, 0.20, 0.80],
    [0.70, 0.10, 0.00, 0.00, 0.10, 0.70],
    [0.70, 0.10, 0.00, 0.00, 0.10, 0.70],
    [0.80, 0.25, 0.08, 0.08, 0.25, 0.80],
    [0.90, 0.60, 0.35, 0.35, 0.60, 0.90],
    [1.00, 0.90, 0.80, 0.80, 0.90, 1.00],
  ]

  useEffect(() => {
    const wrapper = wrapperRef.current
    const overlay = tilesRef.current
    if (!wrapper || !overlay) return

    let animationFrames: number[] = []

    const buildTiles = () => {
      // Compute the actual tile size from the container width so we never overflow
      const containerWidth = wrapper.clientWidth
      const actualTileSize = Math.min(tileSize, Math.floor(containerWidth / cols))
      const actualHeight = actualTileSize * rows

      // Sync the wrapper height to the computed tile grid
      wrapper.style.height = `${actualHeight}px`
      overlay.style.height = `${actualHeight}px`

      // Cancel any running animations
      animationFrames.forEach((id) => cancelAnimationFrame(id))
      animationFrames = []
      overlay.innerHTML = ""

      const tiles: HTMLDivElement[] = []

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const tile = document.createElement("div")
          tile.style.position = "absolute"
          tile.style.left = `${col * actualTileSize}px`
          tile.style.top = `${row * actualTileSize}px`
          tile.style.width = `${actualTileSize}px`
          tile.style.height = `${actualTileSize}px`
          tile.style.backgroundColor = "#070a0f"
          tiles.push(tile)
          overlay.appendChild(tile)
        }
      }

      tiles.forEach((tile, i) => {
        const row = Math.floor(i / cols)
        const col = i % cols
        const baseCover = coverOpacities[row]?.[col] ?? 1.0

        const variance = baseCover < 0.15 ? 0.10 : 0.22
        const minCover = Math.max(0, baseCover - variance)
        const maxCover = Math.min(1, baseCover + variance * 0.4)

        const duration = Math.random() * 2.5 + 3
        const offset = Math.random() * duration
        let startTime: number | null = null

        const animate = (currentTime: number) => {
          if (startTime === null) startTime = currentTime
          const elapsed = (currentTime - startTime) / 1000
          const progress = (elapsed + offset) % (duration * 2)
          const normalizedProgress =
            progress < duration
              ? progress / duration
              : (duration * 2 - progress) / duration

          const cover = minCover + (maxCover - minCover) * normalizedProgress
          tile.style.opacity = Math.max(minCover, Math.min(maxCover, cover)).toString()
          animationFrames[i] = requestAnimationFrame(animate)
        }

        animationFrames[i] = requestAnimationFrame(animate)
      })
    }

    buildTiles()

    // Rebuild on resize so tiles always fill the container
    const ro = new ResizeObserver(buildTiles)
    ro.observe(wrapper)

    return () => {
      ro.disconnect()
      animationFrames.forEach((id) => cancelAnimationFrame(id))
    }
  }, [rows, cols, tileSize])

  return (
    // Outer wrapper fills parent width on mobile; caps at computed pixel width on desktop
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: `${cols * tileSize}px`,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* Base image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt="Portrait"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          display: "block",
        }}
      />

      {/* Tile overlay */}
      <div
        ref={tilesRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
        }}
      />
    </div>
  )
}
