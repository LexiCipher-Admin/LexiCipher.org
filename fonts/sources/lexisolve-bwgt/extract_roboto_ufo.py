#!/usr/bin/env python3
"""
Extract Roboto Regular from variable font and convert to UFO format.
This creates the base master for BWGT axis development.
"""

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.ufoLib import UFOWriter
from fontTools.pens.t2CharStringPen import T2CharStringPen
from fontTools.pens.qu2cuPen import Qu2CuPen
import os
import shutil

def extract_static_instance(var_font_path, output_ttf_path, wght=400, wdth=100):
    """Extract a static instance from Roboto variable font."""
    print(f"Loading variable font: {var_font_path}")
    font = TTFont(var_font_path)
    
    print(f"Instantiating at wght={wght}, wdth={wdth}")
    instance = instantiateVariableFont(font, {"wght": wght, "wdth": wdth})
    
    print(f"Saving static instance: {output_ttf_path}")
    instance.save(output_ttf_path)
    return instance

def ttf_to_ufo(ttf_path, ufo_path):
    """Convert TTF to UFO format using fontTools."""
    from fontTools.ufoLib import UFOWriter
    from fontTools.pens.pointPen import SegmentToPointPen
    import xml.etree.ElementTree as ET
    
    print(f"Converting {ttf_path} to UFO format...")
    
    # Load the TTF
    font = TTFont(ttf_path)
    
    # Create UFO directory structure
    if os.path.exists(ufo_path):
        shutil.rmtree(ufo_path)
    os.makedirs(ufo_path)
    os.makedirs(os.path.join(ufo_path, "glyphs"))
    
    # Write metainfo.plist
    metainfo = '''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>creator</key>
    <string>Lexisolve BWGT Builder</string>
    <key>formatVersion</key>
    <integer>3</integer>
</dict>
</plist>'''
    with open(os.path.join(ufo_path, "metainfo.plist"), "w") as f:
        f.write(metainfo)
    
    # Extract font info
    name_table = font.get("name")
    head_table = font.get("head")
    os2_table = font.get("OS/2")
    
    family_name = "Lexisolve"
    style_name = "Regular"
    
    # Get units per em
    units_per_em = head_table.unitsPerEm
    
    # Write fontinfo.plist
    fontinfo = f'''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>familyName</key>
    <string>{family_name}</string>
    <key>styleName</key>
    <string>{style_name}</string>
    <key>unitsPerEm</key>
    <integer>{units_per_em}</integer>
    <key>ascender</key>
    <integer>{os2_table.sTypoAscender}</integer>
    <key>descender</key>
    <integer>{os2_table.sTypoDescender}</integer>
    <key>xHeight</key>
    <integer>{os2_table.sxHeight}</integer>
    <key>capHeight</key>
    <integer>{os2_table.sCapHeight}</integer>
</dict>
</plist>'''
    with open(os.path.join(ufo_path, "fontinfo.plist"), "w") as f:
        f.write(fontinfo)
    
    # Get glyph set
    glyph_set = font.getGlyphSet()
    glyph_order = font.getGlyphOrder()
    
    # Write lib.plist with glyph order
    glyph_order_xml = "\n".join([f"        <string>{g}</string>" for g in glyph_order])
    lib_plist = f'''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>public.glyphOrder</key>
    <array>
{glyph_order_xml}
    </array>
</dict>
</plist>'''
    with open(os.path.join(ufo_path, "lib.plist"), "w") as f:
        f.write(lib_plist)
    
    # Extract glyphs
    contents = []
    cmap = font.getBestCmap()
    
    # Create reverse cmap for unicode values
    unicode_map = {}
    for codepoint, glyph_name in cmap.items():
        if glyph_name not in unicode_map:
            unicode_map[glyph_name] = []
        unicode_map[glyph_name].append(codepoint)
    
    print(f"Extracting {len(glyph_order)} glyphs...")
    
    for glyph_name in glyph_order:
        # Create safe filename using UFO3 naming convention
        # Handle case-insensitivity on Windows by using underscore prefix for uppercase
        safe_name = glyph_name.replace("/", "_")
        if glyph_name == ".notdef":
            filename = "_notdef.glif"
        elif glyph_name.startswith("."):
            filename = "_" + glyph_name[1:] + ".glif"
        elif glyph_name[0:1].isupper():
            # Uppercase letters get underscore prefix to avoid case collision
            filename = safe_name + "_.glif"
        else:
            filename = safe_name + ".glif"
        
        contents.append((glyph_name, filename))
        
        # Get glyph
        glyph = glyph_set[glyph_name]
        
        # Get advance width
        width = glyph.width
        
        # Get unicode values
        unicodes = unicode_map.get(glyph_name, [])
        
        # Build GLIF XML
        unicode_elements = "\n".join([f'  <unicode hex="{hex(u)[2:].upper().zfill(4)}"/>' for u in unicodes])
        
        # Extract outline using a recording pen
        from fontTools.pens.recordingPen import RecordingPen
        rec_pen = RecordingPen()
        glyph.draw(rec_pen)
        
        # Convert to GLIF outline format
        outline_xml = ""
        if rec_pen.value:
            outline_parts = []
            current_contour = []
            
            for op, args in rec_pen.value:
                if op == "moveTo":
                    if current_contour:
                        outline_parts.append(current_contour)
                    current_contour = [("move", args[0])]
                elif op == "lineTo":
                    current_contour.append(("line", args[0]))
                elif op == "qCurveTo":
                    # Quadratic curves - mark off-curve points
                    for pt in args[:-1]:
                        current_contour.append(("offcurve", pt))
                    current_contour.append(("qcurve", args[-1]))
                elif op == "curveTo":
                    # Cubic curves
                    for pt in args[:-1]:
                        current_contour.append(("offcurve", pt))
                    current_contour.append(("curve", args[-1]))
                elif op == "closePath":
                    if current_contour:
                        outline_parts.append(current_contour)
                    current_contour = []
                elif op == "endPath":
                    if current_contour:
                        outline_parts.append(current_contour)
                    current_contour = []
            
            if current_contour:
                outline_parts.append(current_contour)
            
            if outline_parts:
                outline_xml = "  <outline>\n"
                for contour in outline_parts:
                    outline_xml += "    <contour>\n"
                    for pt_type, pt in contour:
                        x, y = pt
                        if pt_type == "move":
                            outline_xml += f'      <point x="{int(x)}" y="{int(y)}" type="move"/>\n'
                        elif pt_type == "line":
                            outline_xml += f'      <point x="{int(x)}" y="{int(y)}" type="line"/>\n'
                        elif pt_type == "qcurve":
                            outline_xml += f'      <point x="{int(x)}" y="{int(y)}" type="qcurve"/>\n'
                        elif pt_type == "curve":
                            outline_xml += f'      <point x="{int(x)}" y="{int(y)}" type="curve"/>\n'
                        elif pt_type == "offcurve":
                            outline_xml += f'      <point x="{int(x)}" y="{int(y)}"/>\n'
                    outline_xml += "    </contour>\n"
                outline_xml += "  </outline>\n"
        
        glif_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<glyph name="{glyph_name}" format="2">
  <advance width="{int(width)}"/>
{unicode_elements}
{outline_xml}</glyph>
'''
        
        glif_path = os.path.join(ufo_path, "glyphs", filename)
        with open(glif_path, "w", encoding="utf-8") as f:
            f.write(glif_content)
    
    # Write contents.plist
    contents_items = "\n".join([f'    <key>{g}</key>\n    <string>{f}</string>' for g, f in contents])
    contents_plist = f'''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
{contents_items}
</dict>
</plist>'''
    with open(os.path.join(ufo_path, "glyphs", "contents.plist"), "w") as f:
        f.write(contents_plist)
    
    print(f"UFO created at: {ufo_path}")
    return ufo_path

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Paths
    var_font = os.path.join(script_dir, "..", "roboto-original", "Roboto-Regular.ttf")
    static_ttf = os.path.join(script_dir, "Roboto-Regular-Static.ttf")
    ufo_path = os.path.join(script_dir, "Lexisolve-BWGT0.ufo")
    
    # Extract and convert
    extract_static_instance(var_font, static_ttf)
    ttf_to_ufo(static_ttf, ufo_path)
    
    print("\n✓ Base master (BWGT 0) created successfully!")
    print(f"  UFO location: {ufo_path}")