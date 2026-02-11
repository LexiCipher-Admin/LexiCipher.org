"""
Font Variant Generator for Dyslexia Readability DOE Study
=========================================================
Creates 5 font variants based on OpenDyslexic with modifications to:
- Letter spacing (tracking)
- Word spacing
- Line height (via ascender/descender/line gap adjustments)

DOE Design (5 fonts):
Font 1: Control (OpenDyslexic baseline) - 0% letter, 0% word, 130% line
Font 2: +25% letter spacing, 0% word, 130% line
Font 3: 0% letter, +40% word spacing, 130% line
Font 4: 0% letter, 0% word, 170% line height
Font 5: +25% letter, +40% word, 170% line (combination)
"""

from fontTools.ttLib import TTFont
from fontTools.otlLib.builder import buildStatTable
import os
import shutil

# Configuration
SOURCE_FONT = "font/OpenDyslexic-Regular.otf"
OUTPUT_DIR = "font/variants"

# DOE Design Matrix
# Format: (name, letter_spacing_pct, word_spacing_pct, line_height_pct)
VARIANTS = [
    ("Font1_Control", 0, 0, 130),           # Control baseline
    ("Font2_LetterSpace", 25, 0, 130),      # Letter spacing +25%
    ("Font3_WordSpace", 0, 40, 130),        # Word spacing +40%
    ("Font4_LineHeight", 0, 0, 170),        # Line height 170%
    ("Font5_Combination", 25, 40, 170),     # All modifications combined
]

def modify_letter_spacing(font, percentage):
    """
    Modify letter spacing by adjusting advance widths of all glyphs.
    Percentage: 0 = no change, 25 = 25% wider spacing
    """
    if percentage == 0:
        return
    
    factor = 1 + (percentage / 100)
    hmtx = font['hmtx']
    
    for glyph_name in hmtx.metrics:
        width, lsb = hmtx.metrics[glyph_name]
        # Add extra space to the right side of each glyph
        extra_space = int(width * (percentage / 100))
        new_width = width + extra_space
        hmtx.metrics[glyph_name] = (new_width, lsb)
    
    print(f"  - Letter spacing modified by +{percentage}%")

def modify_word_spacing(font, percentage):
    """
    Modify word spacing by adjusting the width of the space character.
    Percentage: 0 = no change, 40 = 40% wider space
    """
    if percentage == 0:
        return
    
    hmtx = font['hmtx']
    
    # Find the space glyph (could be 'space' or 'uni0020')
    space_names = ['space', 'uni0020', ' ']
    
    for space_name in space_names:
        if space_name in hmtx.metrics:
            width, lsb = hmtx.metrics[space_name]
            new_width = int(width * (1 + percentage / 100))
            hmtx.metrics[space_name] = (new_width, lsb)
            print(f"  - Word spacing modified by +{percentage}% (space width: {width} -> {new_width})")
            return
    
    print(f"  - Warning: Could not find space glyph to modify word spacing")

def modify_line_height(font, percentage):
    """
    Modify line height by adjusting OS/2 and hhea table values.
    Percentage: 100 = normal, 170 = 70% taller line height
    """
    if percentage == 100:
        return
    
    factor = percentage / 100
    
    # Modify hhea table (horizontal header)
    if 'hhea' in font:
        hhea = font['hhea']
        original_ascent = hhea.ascent
        original_descent = hhea.descent
        original_lineGap = hhea.lineGap
        
        # Calculate how much extra space to add
        total_height = original_ascent - original_descent + original_lineGap
        target_height = int(total_height * factor)
        extra_space = target_height - total_height
        
        # Add extra space to line gap
        hhea.lineGap = original_lineGap + extra_space
        
        print(f"  - Line height: {percentage}% (lineGap: {original_lineGap} -> {hhea.lineGap})")
    
    # Modify OS/2 table for consistency
    if 'OS/2' in font:
        os2 = font['OS/2']
        original_typoLineGap = os2.sTypoLineGap
        
        # Calculate similar adjustment
        typo_height = os2.sTypoAscender - os2.sTypoDescender + os2.sTypoLineGap
        target_typo = int(typo_height * factor)
        extra_typo = target_typo - typo_height
        
        os2.sTypoLineGap = original_typoLineGap + extra_typo
        
        # Also adjust win metrics if they're used
        win_height = os2.usWinAscent + os2.usWinDescent
        target_win = int(win_height * factor)
        extra_win = target_win - win_height
        
        os2.usWinAscent = os2.usWinAscent + (extra_win // 2)
        os2.usWinDescent = os2.usWinDescent + (extra_win // 2)

def update_font_name(font, variant_name):
    """
    Update the font's name table to reflect the variant.
    """
    name_table = font['name']
    
    for record in name_table.names:
        if record.nameID in [1, 4, 6]:  # Family, Full Name, PostScript Name
            try:
                current_name = record.toUnicode()
                if record.nameID == 1:  # Family name
                    new_name = f"ODx-{variant_name}"
                elif record.nameID == 4:  # Full name
                    new_name = f"ODx-{variant_name} Regular"
                elif record.nameID == 6:  # PostScript name
                    new_name = f"ODx-{variant_name}-Regular"
                
                record.string = new_name.encode(record.getEncoding())
            except:
                pass

def create_variant(source_path, variant_name, letter_pct, word_pct, line_pct, output_dir):
    """
    Create a font variant with specified modifications.
    """
    print(f"\nCreating variant: {variant_name}")
    print(f"  Parameters: letter={letter_pct}%, word={word_pct}%, line={line_pct}%")
    
    # Load the source font
    font = TTFont(source_path)
    
    # Apply modifications
    modify_letter_spacing(font, letter_pct)
    modify_word_spacing(font, word_pct)
    modify_line_height(font, line_pct)
    
    # Update font name
    update_font_name(font, variant_name)
    
    # Save the modified font
    output_path = os.path.join(output_dir, f"ODx-{variant_name}.otf")
    font.save(output_path)
    font.close()
    
    print(f"  Saved: {output_path}")
    return output_path

def main():
    """
    Main function to create all font variants.
    """
    print("=" * 60)
    print("Dyslexia Font Variant Generator")
    print("DOE Study: Readability Optimization")
    print("=" * 60)
    
    # Check source font exists
    if not os.path.exists(SOURCE_FONT):
        print(f"Error: Source font not found: {SOURCE_FONT}")
        return
    
    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Also copy the original OpenDyslexic as reference
    shutil.copy(SOURCE_FONT, os.path.join(OUTPUT_DIR, "OpenDyslexic-Original.otf"))
    print(f"\nCopied original font to: {OUTPUT_DIR}/OpenDyslexic-Original.otf")
    
    # Create each variant
    created_fonts = []
    for variant_name, letter_pct, word_pct, line_pct in VARIANTS:
        output_path = create_variant(
            SOURCE_FONT, 
            variant_name, 
            letter_pct, 
            word_pct, 
            line_pct, 
            OUTPUT_DIR
        )
        created_fonts.append((variant_name, output_path))
    
    # Summary
    print("\n" + "=" * 60)
    print("SUMMARY: Created Font Variants")
    print("=" * 60)
    print("\nDOE Design Matrix:")
    print("-" * 60)
    print(f"{'Font':<25} {'Letter%':<10} {'Word%':<10} {'Line%':<10}")
    print("-" * 60)
    for variant_name, letter_pct, word_pct, line_pct in VARIANTS:
        print(f"{variant_name:<25} {letter_pct:<10} {word_pct:<10} {line_pct:<10}")
    print("-" * 60)
    
    print(f"\nAll variants saved to: {OUTPUT_DIR}/")
    print("\nNext steps:")
    print("1. Install fonts on your system (optional for printing)")
    print("2. Use these fonts in the test document")
    print("3. Print test pages for John to evaluate")

if __name__ == "__main__":
    main()
