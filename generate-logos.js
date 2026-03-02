const fs = require('fs');

const src = fs.readFileSync('C:/Users/ajevi/Downloads/AJ_LexiCipher.svg', 'utf8');

// Extract the defs block
const defsMatch = src.match(/<defs>[\s\S]*?<\/defs>/);
const defs = defsMatch ? defsMatch[0] : '';

// ─── Helper: extract balanced <g>...</g> blocks ───────────────────────────────
function extractGroups(text) {
  const groups = [];
  let depth = 0;
  let start = -1;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '<') {
      if (text.slice(i, i + 2) === '<g') {
        if (depth === 0) start = i;
        depth++;
      } else if (text.slice(i, i + 4) === '</g>') {
        depth--;
        if (depth === 0 && start !== -1) {
          groups.push(text.slice(start, i + 4));
          start = -1;
        }
      }
    }
  }
  return groups;
}

// Find the content after </defs> and before </svg>
const afterDefs = src.slice(src.indexOf('</defs>') + 7);

// Extract top-level groups from the SVG body
// The SVG structure is:
//   <svg>
//     <defs>...</defs>
//     <g>  ← owl illustration group
//       <g>...</g>
//       <g id="nDI47z">...</g>
//     </g>
//     <g>  ← left text paths group
//       <path .../>  (many paths for LexiCipher.org text)
//     </g>
//     <g>  ← bottom tagline group
//       <path .../>
//     </g>
//     <rect .../>  ← left red rule
//     <text .../>  ← right side text
//     <text .../>  ← right side tagline
//     <rect .../>  ← right red rule
//   </svg>

const topGroups = extractGroups(afterDefs);
console.log('Top-level groups found:', topGroups.length);
topGroups.forEach((g, i) => {
  const opens = (g.match(/<g[\s>]/g) || []).length;
  const closes = (g.match(/<\/g>/g) || []).length;
  console.log(`  Group ${i}: ${opens} opens, ${closes} closes, length ${g.length}`);
});

const owlGroup = topGroups[0] || '';
const textGroup1 = topGroups[1] || ''; // LexiCipher.org letter paths
const textGroup2 = topGroups[2] || ''; // tagline paths

// Extract the left red rule rect (x=200.48)
const leftRuleMatch = src.match(/<rect class="cls-18" x="200\.48"[^>]*\/>/);
const leftRule = leftRuleMatch ? leftRuleMatch[0] : '';
console.log('Left rule found:', !!leftRule);

// ─── 1. logo-icon.svg (owl only) ─────────────────────────────────────────────
const iconViewBox = '245 20 215 293';

const iconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${iconViewBox}">
  ${defs}
  ${owlGroup}
</svg>`;

fs.writeFileSync('app/public/logo-icon.svg', iconSvg, 'utf8');
const iconOpens = (iconSvg.match(/<g[\s>]/g) || []).length;
const iconCloses = (iconSvg.match(/<\/g>/g) || []).length;
console.log(`✓ logo-icon.svg: <g> opens=${iconOpens} closes=${iconCloses} ${iconOpens === iconCloses ? '✓' : '✗ MISMATCH'}`);

// ─── 2. logo-stacked.svg (owl + text + rule) ─────────────────────────────────
const stackedViewBox = '195 20 345 378';

const stackedSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${stackedViewBox}">
  ${defs}
  ${owlGroup}
  ${textGroup1}
  ${textGroup2}
  ${leftRule}
</svg>`;

fs.writeFileSync('app/public/logo-stacked.svg', stackedSvg, 'utf8');
const sOpens = (stackedSvg.match(/<g[\s>]/g) || []).length;
const sCloses = (stackedSvg.match(/<\/g>/g) || []).length;
console.log(`✓ logo-stacked.svg: <g> opens=${sOpens} closes=${sCloses} ${sOpens === sCloses ? '✓' : '✗ MISMATCH'}`);

// ─── 3. Root icon SVGs ────────────────────────────────────────────────────────
const sizes = [
  { name: 'icon16.svg', size: 16 },
  { name: 'icon48.svg', size: 48 },
  { name: 'icon128.svg', size: 128 },
];

for (const { name, size } of sizes) {
  const iconSized = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${iconViewBox}">
  ${defs}
  ${owlGroup}
</svg>`;
  fs.writeFileSync(name, iconSized, 'utf8');
  console.log(`✓ ${name} written`);
}

console.log('\nAll SVG files generated successfully!');
