// Isometric projection utilities for Digital Core

export const CENTER_X = 600;
export const CENTER_Y = 650; // Slightly lower to leave room for top elements

// Base grid units
export const UNIT_X = 85;
export const UNIT_Y = 58;
export const UNIT_Z = 80; // Significantly increased to separate layers further

/**
 * Projects 3D coordinates (ix, iy, iz) onto 2D isometric screen space.
 * @param ix X coordinate on the floor grid
 * @param iy Y coordinate on the floor grid
 * @param iz Z coordinate (height)
 * @param scale Uniform scale factor
 * @param zOffset Fixed vertical offset in pixels
 */
export const p = (ix: number, iy: number, iz: number, scale = 1, zOffset = 0) => {
  return {
    x: CENTER_X + (ix - iy) * (UNIT_X * scale),
    y: CENTER_Y + (ix + iy) * (UNIT_Y * scale) - (iz * UNIT_Z) + zOffset
  };
};

/**
 * Generates an SVG polygon string for a rhombus plane.
 */
export const plane = (cz: number, r: number, scale = 1, zOffset = 0) => {
  const p1 = p(r, -r, cz, scale, zOffset);
  const p2 = p(r, r, cz, scale, zOffset);
  const p3 = p(-r, r, cz, scale, zOffset);
  const p4 = p(-r, -r, cz, scale, zOffset);
  return `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`;
};

export const lineProps = (p1: {x: number, y: number}, p2: {x: number, y: number}) => ({
  x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y
});

export const gridLines = (cz: number, r: number, steps: number, scale = 1, zOffset = 0) => {
  const lines = [];
  const stepSize = (r * 2) / steps;
  for (let i = 0; i <= steps; i++) {
    const offset = -r + i * stepSize;
    lines.push(lineProps(p(offset, -r, cz, scale, zOffset), p(offset, r, cz, scale, zOffset)));
    lines.push(lineProps(p(-r, offset, cz, scale, zOffset), p(r, offset, cz, scale, zOffset)));
  }
  return lines;
};
