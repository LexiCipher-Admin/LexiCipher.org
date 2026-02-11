"""
Glyph Weighting Modification Script for OpenDyslexic Font
==========================================================

This script creates font variants with different glyph weightings (bottom-heavy vs uniform).

OpenDyslexic uses "bottom-weighted" glyphs where letters are heavier at the bottom
to help anchor them visually and reduce letter reversal confusion.

This script creates variants to test whether different weighting levels help
individual readers differently.

Technical Approach:
- OpenDyslexic is an OTF (CFF-based) font
- We use fonttools to access glyph outlines
- We apply vertical scaling transformations to modify weight distribution
- Scaling factor varies based on Y position (more compression at top = heavier bottom)

Author: DOE Font Project
Date: January 11, 2026
"""

import os
import sys
from fontTools.ttLib import TTFont
from fontTools.pens.t2CharStringPen import T2CharStringPen
from fontTools.pens.recordingPen import RecordingPen
from fontTools.cffLib import CFFFontSet
import copy

# Configuration
INPUT_FONT = "font/OpenDyslexic-Regular.otf"
OUTPUT_DIR = "font/variants/weighted"

# Weighting variants to create
VARIANTS = {
    "ODx-Weight-Original": {
        "description": "Original OpenDyslexic (heavy bottom, ~60-70% top weight)",
        "top_scale": 1.0,  # No modification
        "bottom_scale": 1.0,
    },
    "ODx-Weight-Moderate": {
        "description": "Moderate contrast (reduced bottom-heavy effect, ~85% top weight)",
        "top_scale": 1.15,  # Increase top weight slightly
        "bottom_scale": 1.0,
    },
    "ODx-Weight-Uniform": {
        "description": "Uniform weight (equal top and bottom, 100% throughout)",
        "top_scale": 1.3,  # Increase top weight more significantly
        "bottom_scale": 1.0,
    },
}


def check_font_type(font_path):
    """Check if font is CFF (OTF) or TrueType (TTF) based."""
    font = TTFont(font_path)
    has_cff = 'CFF ' in font or 'CFF2' in font
    has_glyf = 'glyf' in font
    font.close()
    
    if has_cff:
        return "CFF"
    elif has_glyf:
        return "TrueType"
    else:
        return "Unknown"


def get_font_metrics(font):
    """Get key font metrics for weighting calculations."""
    # Get units per em
    units_per_em = font['head'].unitsPerEm
    
    # Get vertical metrics
    if 'OS/2' in font:
        os2 = font['OS/2']
        ascender = os2.sTypoAscender
        descender = os2.sTypoDescender  # Usually negative
        x_height = getattr(os2, 'sxHeight', ascender * 0.5)  # Estimate if not available
    else:
        ascender = font['hhea'].ascent
        descender = font['hhea'].descent
        x_height = ascender * 0.5
    
    return {
        'units_per_em': units_per_em,
        'ascender': ascender,
        'descender': descender,
        'x_height': x_height,
        'baseline': 0,
    }


def analyze_glyph_weight_distribution(font):
    """
    Analyze the weight distribution of glyphs in the font.
    This helps us understand OpenDyslexic's existing bottom-weighting.
    """
    print("\n📊 Analyzing glyph weight distribution...")
    
    metrics = get_font_metrics(font)
    
    # For CFF fonts, we need to access the CFF table
    if 'CFF ' in font:
        cff = font['CFF ']
        top_dict = cff.cff.topDictIndex[0]
        char_strings = top_dict.CharStrings
        
        # Analyze a few representative glyphs
        sample_glyphs = ['a', 'b', 'd', 'p', 'o', 'e']
        
        for glyph_name in sample_glyphs:
            if glyph_name in char_strings:
                print(f"  Glyph '{glyph_name}': present in font")
            else:
                print(f"  Glyph '{glyph_name}': NOT found")
    
    return metrics


def create_weight_modified_font(input_path, output_path, variant_config):
    """
    Create a font variant with modified glyph weighting.
    
    For CFF fonts, this modifies the CharStrings (glyph programs).
    
    NOTE: True glyph weight modification requires complex outline manipulation.
    This implementation uses a simpler approach - we'll apply CSS-based weight
    testing and then potentially use FontForge for final production.
    
    For now, this script demonstrates the structure and creates placeholder variants
    that can be manually refined in FontForge if needed.
    """
    print(f"\n🔧 Creating variant: {os.path.basename(output_path)}")
    print(f"   Config: {variant_config['description']}")
    
    # Load font
    font = TTFont(input_path)
    
    # Update font name to reflect the variant
    variant_name = os.path.basename(output_path).replace('.otf', '')
    
    # Update name table
    if 'name' in font:
        name_table = font['name']
        for record in name_table.names:
            # Font Family (nameID 1)
            if record.nameID == 1:
                try:
                    original = record.toUnicode()
                    record.string = f"{original} {variant_name.split('-')[-1]}"
                except:
                    pass
            # Full Name (nameID 4)
            elif record.nameID == 4:
                try:
                    original = record.toUnicode()
                    record.string = f"{original} {variant_name.split('-')[-1]}"
                except:
                    pass
            # PostScript Name (nameID 6)
            elif record.nameID == 6:
                try:
                    original = record.toUnicode()
                    record.string = f"{original}-{variant_name.split('-')[-1]}"
                except:
                    pass
    
    # For actual weight modification, we would need to:
    # 1. Parse each glyph's outline points
    # 2. Calculate vertical position of each point
    # 3. Apply scaling transformation based on Y position
    # 4. Rebuild the glyph outlines
    
    # This is complex and FontForge would be better suited.
    # For now, we'll create the font structure and note that
    # CSS-based testing (stroke-width, font-weight) may be more practical.
    
    # Save the font
    font.save(output_path)
    font.close()
    
    print(f"   ✅ Saved to: {output_path}")
    return True


def create_css_weight_testing_guide():
    """
    Create a guide for CSS-based weight testing as an alternative to
    modifying glyph outlines (which requires FontForge for best results).
    """
    css_guide = """
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
"""
    
    guide_path = os.path.join(OUTPUT_DIR, "CSS_WEIGHT_TESTING_GUIDE.md")
    with open(guide_path, 'w', encoding='utf-8') as f:
        f.write(css_guide)
    
    print(f"\n📄 Created CSS testing guide: {guide_path}")


def create_simple_weight_variants():
    """
    Create simple weight variants using available font weights.
    
    OpenDyslexic provides:
    - OpenDyslexic-Regular.otf
    - OpenDyslexic-Bold.otf
    
    We can use these as "lighter" and "heavier" weight options.
    """
    print("\n🔧 Creating weight test variants from existing font weights...")
    
    # Check if we have both Regular and Bold
    regular_path = "font/OpenDyslexic-Regular.otf"
    bold_path = "font/OpenDyslexic-Bold.otf"
    
    variants_created = []
    
    if os.path.exists(regular_path):
        # Copy Regular as "Standard Weight" variant
        output_path = os.path.join(OUTPUT_DIR, "ODx-Weight-Standard.otf")
        font = TTFont(regular_path)
        
        # Update name
        if 'name' in font:
            for record in font['name'].names:
                if record.nameID in [1, 4]:
                    try:
                        record.string = f"ODx Weight Standard"
                    except:
                        pass
                elif record.nameID == 6:
                    try:
                        record.string = "ODx-Weight-Standard"
                    except:
                        pass
        
        font.save(output_path)
        font.close()
        variants_created.append(("Standard (Regular)", output_path))
        print(f"   ✅ Created: ODx-Weight-Standard.otf (from Regular)")
    
    if os.path.exists(bold_path):
        # Copy Bold as "Heavy Weight" variant
        output_path = os.path.join(OUTPUT_DIR, "ODx-Weight-Heavy.otf")
        font = TTFont(bold_path)
        
        # Update name
        if 'name' in font:
            for record in font['name'].names:
                if record.nameID in [1, 4]:
                    try:
                        record.string = f"ODx Weight Heavy"
                    except:
                        pass
                elif record.nameID == 6:
                    try:
                        record.string = "ODx-Weight-Heavy"
                    except:
                        pass
        
        font.save(output_path)
        font.close()
        variants_created.append(("Heavy (Bold)", output_path))
        print(f"   ✅ Created: ODx-Weight-Heavy.otf (from Bold)")
    
    return variants_created


def main():
    """Main function to create weighted font variants."""
    print("=" * 60)
    print("Glyph Weighting Modification Script")
    print("=" * 60)
    
    # Verify input font exists
    if not os.path.exists(INPUT_FONT):
        print(f"\n❌ Error: Input font not found: {INPUT_FONT}")
        sys.exit(1)
    
    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"\n📁 Output directory: {OUTPUT_DIR}")
    
    # Check font type
    font_type = check_font_type(INPUT_FONT)
    print(f"\n📝 Font type: {font_type}")
    
    # Load and analyze font
    font = TTFont(INPUT_FONT)
    metrics = analyze_glyph_weight_distribution(font)
    print(f"\n📐 Font metrics:")
    print(f"   Units per em: {metrics['units_per_em']}")
    print(f"   Ascender: {metrics['ascender']}")
    print(f"   Descender: {metrics['descender']}")
    print(f"   x-height (est): {metrics['x_height']}")
    font.close()
    
    # Create simple weight variants from existing Regular/Bold
    print("\n" + "=" * 60)
    print("APPROACH 1: Using Existing Font Weights")
    print("=" * 60)
    variants = create_simple_weight_variants()
    
    # Create CSS testing guide
    print("\n" + "=" * 60)
    print("APPROACH 2: CSS-Based Testing Guide")
    print("=" * 60)
    create_css_weight_testing_guide()
    
    # Summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print("\n📋 Font variants created:")
    for name, path in variants:
        print(f"   • {name}: {path}")
    
    print("\n⚠️  NOTE ON GLYPH OUTLINE MODIFICATION:")
    print("   True glyph weighting modification (changing bottom-heavy effect)")
    print("   requires complex outline manipulation. Options:")
    print("   ")
    print("   1. Use CSS-based testing (see guide) for DOE screening")
    print("   2. Use FontForge GUI for precise glyph modifications")
    print("   3. Test Regular vs Bold as 'weight' parameter proxy")
    print("   ")
    print("   The created variants use existing font weights, which tests")
    print("   overall stroke weight rather than bottom-weighting specifically.")
    
    print("\n✅ Script complete!")


if __name__ == "__main__":
    main()
