#!/usr/bin/env python3
"""
BWGT (Bottom Weight) Master Generator for Lexisolve

This script transforms Roboto glyphs to create bottom-weighted variants.
The BWGT axis shifts stroke weight distribution from uniform to bottom-heavy.

BWGT 0   = Uniform stroke weight (standard Roboto)
BWGT 50  = Moderate bottom heaviness  
BWGT 100 = Maximum bottom heaviness (thicker at bottom, thinner at top)

The transformation applies vertical scaling that increases stroke thickness
at the baseline while reducing it at the cap height.
"""

import os
import shutil
import re
from pathlib import Path

# Font metrics (from Roboto)
UNITS_PER_EM = 2048
ASCENDER = 1900
DESCENDER = -500
X_HEIGHT = 1082
CAP_HEIGHT = 1456
BASELINE = 0

def calculate_bwgt_transform(y, bwgt_value):
    """
    Calculate the Y transformation for a given BWGT value.
    
    The transform applies a graduated scaling:
    - Points at baseline (y=0) get slight downward shift + expansion
    - Points at x-height/cap-height get slight upward shift + compression
    - Creates bottom-heavy appearance
    
    Args:
        y: Original Y coordinate
        bwgt_value: BWGT axis value (0-100)
        
    Returns:
        Transformed Y coordinate
    """
    if bwgt_value == 0:
        return y
    
    # Normalize BWGT to 0-1 range
    intensity = bwgt_value / 100.0
    
    # Define the transformation zones
    # Zone 1: Below baseline (descenders) - minimal change
    # Zone 2: Baseline to x-height - main transformation area
    # Zone 3: Above x-height - compression zone
    
    # AMPLIFIED TRANSFORM: 5x stronger for visible effect
    # Original values were too subtle (~0.7px at 32px screen size)
    
    if y < BASELINE:
        # Descenders: significant expansion downward (make descenders heavier)
        expansion = intensity * 0.25  # 25% max expansion at BWGT 100
        return y * (1 + expansion)
    
    elif y <= X_HEIGHT:
        # Main body: graduated transformation
        # Bottom points expand/shift down, top points compress/shift down
        t = y / X_HEIGHT  # 0 at baseline, 1 at x-height
        
        # Linear interpolation for clearer visual effect
        # At bottom (t=0): expand by up to 15%
        # At top (t=1): compress by up to 20%
        transform_factor = intensity * (0.15 - 0.35 * t)
        return y * (1 + transform_factor)
    
    else:
        # Above x-height (ascenders, caps): stronger compression
        # This creates the "bottom heavy" visual effect
        overshoot = (y - X_HEIGHT) / (ASCENDER - X_HEIGHT)
        compression = intensity * 0.25 * (1 + overshoot * 0.3)
        return y * (1 - compression)

def calculate_stroke_weight_adjustment(y, bwgt_value, is_horizontal=True):
    """
    Calculate stroke weight adjustment based on vertical position.
    
    For bottom-weight effect, we:
    - Thicken horizontal strokes near baseline
    - Thin horizontal strokes near cap height
    - Adjust vertical strokes based on their Y range
    
    Args:
        y: Y coordinate of the point
        bwgt_value: BWGT value (0-100)
        is_horizontal: Whether this affects a horizontal stroke
        
    Returns:
        Scale factor for stroke weight (1.0 = no change)
    """
    if bwgt_value == 0:
        return 1.0
    
    intensity = bwgt_value / 100.0
    
    # Normalize Y to 0-1 range (baseline to cap height)
    normalized_y = max(0, min(1, (y - BASELINE) / CAP_HEIGHT))
    
    # Bottom-heavy curve: thicker at bottom, thinner at top
    # Using cosine for smooth transition
    import math
    weight_factor = 1.0 + intensity * 0.15 * math.cos(normalized_y * math.pi / 2)
    
    return weight_factor

def transform_glyph(glif_content, bwgt_value):
    """
    Transform a GLIF file's coordinates for the specified BWGT value.
    
    Args:
        glif_content: String content of the .glif file
        bwgt_value: Target BWGT value (50 or 100)
        
    Returns:
        Transformed GLIF content
    """
    def transform_point(match):
        x = int(match.group(1))
        y = int(match.group(2))
        rest = match.group(3)
        
        # Apply Y transformation
        new_y = calculate_bwgt_transform(y, bwgt_value)
        
        return f'<point x="{x}" y="{int(round(new_y))}"{rest}/>'
    
    # Transform all point coordinates - capture everything between quotes and before />
    pattern = r'<point x="(-?\d+)" y="(-?\d+)"(.*?)/>'
    transformed = re.sub(pattern, transform_point, glif_content)
    
    return transformed

def copy_and_transform_ufo(source_ufo, dest_ufo, bwgt_value):
    """
    Copy a UFO and transform all glyphs to the target BWGT value.
    
    Args:
        source_ufo: Path to source UFO (BWGT 0)
        dest_ufo: Path to destination UFO
        bwgt_value: Target BWGT value
    """
    source = Path(source_ufo)
    dest = Path(dest_ufo)
    
    # Remove destination if exists
    if dest.exists():
        shutil.rmtree(dest)
    
    # Copy UFO structure
    shutil.copytree(source, dest)
    
    # Update fontinfo.plist with new style name
    fontinfo_path = dest / "fontinfo.plist"
    if fontinfo_path.exists():
        content = fontinfo_path.read_text()
        content = content.replace(
            "<string>Regular</string>",
            f"<string>BWGT{bwgt_value}</string>"
        )
        fontinfo_path.write_text(content)
    
    # Transform all glyphs
    glyphs_dir = dest / "glyphs"
    glif_files = list(glyphs_dir.glob("*.glif"))
    
    print(f"Transforming {len(glif_files)} glyphs to BWGT {bwgt_value}...")
    
    for glif_path in glif_files:
        try:
            content = glif_path.read_text(encoding='utf-8')
            transformed = transform_glyph(content, bwgt_value)
            glif_path.write_text(transformed, encoding='utf-8')
        except Exception as e:
            print(f"  Warning: Could not transform {glif_path.name}: {e}")
    
    print(f"Created: {dest_ufo}")

def main():
    script_dir = Path(__file__).parent
    
    # Source master (BWGT 0 = baseline Roboto)
    source_ufo = script_dir / "Lexisolve-BWGT0.ufo"
    
    if not source_ufo.exists():
        print(f"Error: Source UFO not found: {source_ufo}")
        print("Run extract_roboto_ufo.py first to create the base master.")
        return 1
    
    # Create BWGT 50 master (moderate bottom weight)
    bwgt50_ufo = script_dir / "Lexisolve-BWGT50.ufo"
    print("\n--- Creating BWGT 50 Master (Moderate Bottom Weight) ---")
    copy_and_transform_ufo(source_ufo, bwgt50_ufo, 50)
    
    # Create BWGT 100 master (maximum bottom weight)
    bwgt100_ufo = script_dir / "Lexisolve-BWGT100.ufo"
    print("\n--- Creating BWGT 100 Master (Maximum Bottom Weight) ---")
    copy_and_transform_ufo(source_ufo, bwgt100_ufo, 100)
    
    print("\n--- BWGT Masters Created Successfully ---")
    print(f"  BWGT 0:   {source_ufo}")
    print(f"  BWGT 50:  {bwgt50_ufo}")
    print(f"  BWGT 100: {bwgt100_ufo}")
    
    return 0

if __name__ == "__main__":
    exit(main())