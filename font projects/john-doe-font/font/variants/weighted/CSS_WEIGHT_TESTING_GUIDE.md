
# CSS-Based Weight Testing Guide

Since modifying glyph outlines programmatically is complex without FontForge,
here's how to test weight perception using CSS:

## Method 1: Font Weight Selection
Use OpenDyslexic Bold vs Regular to test weight preference:

```css
.test-regular { font-family: 'OpenDyslexic'; font-weight: 400; }
.test-bold { font-family: 'OpenDyslexic'; font-weight: 700; }
```

## Method 2: Text Stroke (Chrome/Safari)
Add visible stroke to simulate weight:

```css
.test-light-stroke {
  -webkit-text-stroke: 0.5px currentColor;
  paint-order: stroke fill;
}

.test-heavy-stroke {
  -webkit-text-stroke: 1px currentColor;
  paint-order: stroke fill;
}
```

## Method 3: Font Synthesis (Browser-generated bold)
Let browser synthesize heavier weight:

```css
.test-synthetic-bold {
  font-weight: bold;
  font-synthesis: weight;
}
```

## Recommended Approach for DOE
1. Test OpenDyslexic Regular vs Bold as the "weight" parameter
2. This tests whether heavier overall weight helps
3. The bottom-weighting is present in both variants
4. For true glyph weighting modification, use FontForge GUI

## FontForge Manual Process
If you have FontForge installed:
1. Open OpenDyslexic-Regular.otf in FontForge
2. Select all glyphs (Ctrl+A)
3. Element > Transformations > Transform
4. Apply non-uniform scale (different X vs Y at different heights)
5. Export as new font variant
