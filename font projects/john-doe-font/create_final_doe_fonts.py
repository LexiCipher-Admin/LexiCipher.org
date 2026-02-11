"""
Create Final DOE Font Variants for Phase 1 Testing
===================================================

This script creates the remaining font variants needed for the DOE test:
- ODx-Font4_GlyphWeight.otf (Heavy weight alone)
- ODx-Font5_Combination.otf (Heavy weight + Letter spacing +25% + Word spacing +40%)

Run AFTER create_weighted_font_variants.py has been executed.

Author: DOE Font Project
Date: January 11, 2026
"""

import os
import sys
from fontTools.ttLib import TTFont

# Configuration
HEAVY_BASE = "font/variants/weighted/ODx-Weight-Heavy.otf"
OUTPUT_DIR = "font/variants"

# Spacing parameters (same as in create_font_variants.py)
LETTER_SPACING_PERCENT = 25  # +25%
WORD_SPACING_PERCENT = 40    # +40%


def copy_font_with_new_name(input_path, output_path, new_family_name, new_full_name, new_ps_name):
    """Copy a font and update its naming."""
    print(f"Creating: {os.path.basename(output_path)}")
    
    font = TTFont(input_path)
    
    # Update name table
    if 'name' in font:
        name_table = font['name']
        for record in name_table.names:
            if record.nameID == 1:  # Family Name
                record.string = new_family_name
            elif record.nameID == 4:  # Full Name
                record.string = new_full_name
            elif record.nameID == 6:  # PostScript Name
                record.string = new_ps_name
    
    font.save(output_path)
    font.close()
    print(f"  ✅ Saved: {output_path}")
    return True


def apply_spacing_to_font(input_path, output_path, letter_spacing_pct, word_spacing_pct):
    """Apply letter and word spacing modifications to a font."""
    print(f"Creating: {os.path.basename(output_path)}")
    print(f"  Letter spacing: +{letter_spacing_pct}%")
    print(f"  Word spacing: +{word_spacing_pct}%")
    
    font = TTFont(input_path)
    
    # Get hmtx table (horizontal metrics)
    if 'hmtx' not in font:
        print("  ❌ Error: Font has no hmtx table")
        return False
    
    hmtx = font['hmtx']
    
    # Calculate spacing multipliers
    letter_multiplier = 1 + (letter_spacing_pct / 100)
    word_multiplier = 1 + (word_spacing_pct / 100)
    
    # Apply letter spacing to all glyphs EXCEPT space
    for glyph_name in hmtx.metrics:
        width, lsb = hmtx.metrics[glyph_name]
        
        if glyph_name == 'space':
            # Apply word spacing to space character
            new_width = int(width * word_multiplier)
        else:
            # Apply letter spacing to all other characters
            new_width = int(width * letter_multiplier)
        
        hmtx.metrics[glyph_name] = (new_width, lsb)
    
    # Update name table
    new_family_name = "ODx Font5 Combination"
    new_full_name = "ODx-Font5_Combination"
    new_ps_name = "ODx-Font5_Combination"
    
    if 'name' in font:
        name_table = font['name']
        for record in name_table.names:
            if record.nameID == 1:  # Family Name
                record.string = new_family_name
            elif record.nameID == 4:  # Full Name
                record.string = new_full_name
            elif record.nameID == 6:  # PostScript Name
                record.string = new_ps_name
    
    font.save(output_path)
    font.close()
    print(f"  ✅ Saved: {output_path}")
    return True


def main():
    print("=" * 60)
    print("Create Final DOE Font Variants")
    print("=" * 60)
    
    # Check if heavy weight base exists
    if not os.path.exists(HEAVY_BASE):
        print(f"\n❌ Error: Heavy weight base not found: {HEAVY_BASE}")
        print("   Run create_weighted_font_variants.py first!")
        sys.exit(1)
    
    # Ensure output directory exists
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    print(f"\n📁 Output directory: {OUTPUT_DIR}")
    print(f"📥 Using heavy weight base: {HEAVY_BASE}")
    
    # Create Font 4: Glyph Weight (Heavy) - just a copy with new name
    print("\n" + "-" * 40)
    print("FONT 4: Glyph Weight (Heavy)")
    print("-" * 40)
    
    font4_output = os.path.join(OUTPUT_DIR, "ODx-Font4_GlyphWeight.otf")
    copy_font_with_new_name(
        HEAVY_BASE,
        font4_output,
        "ODx Font4 GlyphWeight",
        "ODx-Font4_GlyphWeight",
        "ODx-Font4_GlyphWeight"
    )
    
    # Create Font 5: Combination (Heavy + Letter +25% + Word +40%)
    print("\n" + "-" * 40)
    print("FONT 5: Combination (Heavy + Spacing)")
    print("-" * 40)
    
    font5_output = os.path.join(OUTPUT_DIR, "ODx-Font5_Combination.otf")
    apply_spacing_to_font(
        HEAVY_BASE,
        font5_output,
        LETTER_SPACING_PERCENT,
        WORD_SPACING_PERCENT
    )
    
    # Summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    
    print("\n✅ All DOE fonts for Phase 1 are now ready:")
    print("   • ODx-Font1_Control.otf        (Baseline - Standard weight)")
    print("   • ODx-Font2_LetterSpace.otf    (+25% letter spacing)")
    print("   • ODx-Font3_WordSpace.otf      (+40% word spacing)")
    print("   • ODx-Font4_GlyphWeight.otf    (Heavy weight)")
    print("   • ODx-Font5_Combination.otf    (Heavy + Letter +25% + Word +40%)")
    
    print("\n📝 Sample to Font Mapping:")
    print("   Sample A → ODx-Font3_WordSpace.otf")
    print("   Sample B → ODx-Font1_Control.otf (BASELINE)")
    print("   Sample C → ODx-Font5_Combination.otf")
    print("   Sample D → ODx-Font2_LetterSpace.otf")
    print("   Sample E → ODx-Font4_GlyphWeight.otf")
    
    print("\n✅ Script complete!")


if __name__ == "__main__":
    main()
