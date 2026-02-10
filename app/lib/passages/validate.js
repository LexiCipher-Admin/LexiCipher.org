/**
 * FK Validation Script
 * Run from app directory: node lib/passages/validate.js
 */

// Syllable counting helper
function countSyllables(word) {
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
}

function calculateFK(text) {
    const words = text.trim().split(/\s+/).length;
    const sentences = (text.match(/[.!?]+/g) || []).length || 1;
    const syllables = text.trim().split(/\s+/).reduce((t, w) => t + countSyllables(w), 0);
    return Math.round((0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59) * 10) / 10;
}

// Sample texts from actual passage files
const tests = [
    { level: "3rd", target: "2.5-3.5", text: "Max is a brown dog who lives on a farm with his family. He likes to run through the fields and chase the chickens around the barn. The chickens cluck and flap their wings, but Max never hurts them. He just wants to have fun and play." },
    { level: "5th", target: "4.5-5.5", text: "The old lighthouse stood on rocky cliffs high above the crashing waves. Its bright light had guided ships past the dangerous rocks for many years. Sarah loved visiting her grandfather who worked there as the keeper. He told her stories about terrible storms and the ships he had helped to save." },
    { level: "8th-01", target: "7.5-8.5", text: "The old observatory on the mountain had been empty for years before Clara's astronomy club got permission to restore it. They spent the fall fixing the telescope and cleaning the dome. On a clear winter night, they gathered to watch Jupiter's moons, just as others had done there before them." },
    { level: "8th-02", target: "7.5-8.5", text: "In the archives of the town museum, Marcus found letters that changed how he saw his hometown. Written in the 1930s by founding families, they told stories of people working together across racial lines. These accounts had been left out of the town history, and Marcus knew he had to write about them." },
    { level: "8th-03", target: "7.5-8.5", text: "When the small aircraft's engine failed over the wilderness, the pilot had only minutes to locate a suitable landing site. Remaining calm, she spotted an opening in the trees and guided the plane down carefully. Her passengers were shaken but unhurt when they touched down in the clearing." },
];

console.log("\n=== FK VALIDATION TEST ===\n");
tests.forEach(t => {
    const fk = calculateFK(t.text);
    console.log(`${t.level} grade (target ${t.target}): FK ${fk}`);
});

console.log("\n✓ Script is working. For full validation, run the Next.js app and check console.");
console.log("  Or use an online FK calculator to spot-check individual passages.");