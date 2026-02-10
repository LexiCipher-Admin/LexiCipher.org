/**
 * Effects Analysis for 2^(7-3) Fractional Factorial Design
 * 
 * Calculates main effects and two-factor interaction (2FI) alias groups
 * for the Resolution IV design with 7 factors and 16 runs.
 * 
 * Alias structure (from generators E=ABC, F=ABD, G=ACD):
 * - AB + CE + DF
 * - AC + BE + DG  
 * - AD + BF + CG
 * - AE + BC + FG
 * - AF + BD + EG
 * - AG + CD + EF
 * - BG + DE + CF
 */

import { DOERow, FontParameters, Rating } from '../types/session';

/**
 * Factor names mapped to single letters for alias group display
 */
const FACTOR_LETTERS: Record<keyof FontParameters, string> = {
    letterSpacing: 'A',
    wordSpacing: 'B',
    lineHeight: 'C',
    fontWeight: 'D',
    fontSize: 'E',
    paragraphWidth: 'F',
    bwgt: 'G',
};

/**
 * Reverse mapping from letters to factor names
 */
const LETTER_TO_FACTOR: Record<string, keyof FontParameters> = {
    A: 'letterSpacing',
    B: 'wordSpacing',
    C: 'lineHeight',
    D: 'fontWeight',
    E: 'fontSize',
    F: 'paragraphWidth',
    G: 'bwgt',
};

/**
 * Two-factor interaction alias groups for 2^(7-3) Resolution IV design
 * Each group contains 2FIs that are aliased together
 */
export const TWO_FACTOR_ALIAS_GROUPS = [
    { name: 'AB+CE+DF', factors: [['A', 'B'], ['C', 'E'], ['D', 'F']] },
    { name: 'AC+BE+DG', factors: [['A', 'C'], ['B', 'E'], ['D', 'G']] },
    { name: 'AD+BF+CG', factors: [['A', 'D'], ['B', 'F'], ['C', 'G']] },
    { name: 'AE+BC+FG', factors: [['A', 'E'], ['B', 'C'], ['F', 'G']] },
    { name: 'AF+BD+EG', factors: [['A', 'F'], ['B', 'D'], ['E', 'G']] },
    { name: 'AG+CD+EF', factors: [['A', 'G'], ['C', 'D'], ['E', 'F']] },
    { name: 'BG+DE+CF', factors: [['B', 'G'], ['D', 'E'], ['C', 'F']] },
];

export interface InteractionEffect {
    /** Alias group name (e.g., "AB+CE+DF") */
    aliasGroup: string;
    /** Combined effect magnitude (absolute value) */
    effect: number;
    /** Human-readable description of the alias group */
    description: string;
}

/**
 * Calculate two-factor interaction effects from DOE responses
 * 
 * For each alias group, calculates the combined effect by averaging
 * the products of factor levels weighted by responses.
 */
export function calculateInteractionEffects(
    doeMatrix: DOERow[],
    ratings: Map<number, Rating>
): InteractionEffect[] {
    const interactions: InteractionEffect[] = [];

    for (const group of TWO_FACTOR_ALIAS_GROUPS) {
        let effectSum = 0;
        let count = 0;

        for (const row of doeMatrix) {
            const rating = ratings.get(row.runNumber);
            if (rating === undefined) continue;

            // Calculate interaction contrast for this run
            // For 2FI, the contrast is the product of the two factor levels
            // Since factors alias, we use the first pair in the group
            const [factor1Letter, factor2Letter] = group.factors[0];
            const factor1 = LETTER_TO_FACTOR[factor1Letter];
            const factor2 = LETTER_TO_FACTOR[factor2Letter];

            const level1 = row.parameters[factor1];
            const level2 = row.parameters[factor2];
            const interactionLevel = level1 * level2;

            effectSum += interactionLevel * rating;
            count++;
        }

        // Effect = 2 * (sum of contrast*response) / n
        const effect = count > 0 ? (2 * effectSum) / count : 0;

        interactions.push({
            aliasGroup: group.name,
            effect,
            description: describeAliasGroup(group.name),
        });
    }

    return interactions;
}

/**
 * Get the top N interaction effects by absolute magnitude
 */
export function getTopInteractions(
    interactions: InteractionEffect[],
    topN: number = 3
): InteractionEffect[] {
    return [...interactions]
        .sort((a, b) => Math.abs(b.effect) - Math.abs(a.effect))
        .slice(0, topN);
}

/**
 * Convert alias group name to human-readable description
 */
function describeAliasGroup(aliasGroup: string): string {
    const parts = aliasGroup.split('+');
    const descriptions = parts.map((pair) => {
        const [letter1, letter2] = pair.split('');
        const factor1 = LETTER_TO_FACTOR[letter1];
        const factor2 = LETTER_TO_FACTOR[letter2];
        return `${factorToHumanName(factor1)} × ${factorToHumanName(factor2)}`;
    });
    return descriptions.join(' or ');
}

/**
 * Convert factor key to human-readable name
 */
function factorToHumanName(factor: keyof FontParameters): string {
    const names: Record<keyof FontParameters, string> = {
        letterSpacing: 'Letter Spacing',
        wordSpacing: 'Word Spacing',
        lineHeight: 'Line Height',
        fontWeight: 'Font Weight',
        fontSize: 'Font Size',
        paragraphWidth: 'Line Width',
        bwgt: 'Bottom Weight',
    };
    return names[factor];
}

/**
 * Get factor letter from factor name
 */
export function getFactorLetter(factor: keyof FontParameters): string {
    return FACTOR_LETTERS[factor];
}

/**
 * Get factor name from letter
 */
export function getFactorFromLetter(letter: string): keyof FontParameters | undefined {
    return LETTER_TO_FACTOR[letter];
}

/**
 * Format interaction effects for display
 * Returns an array of strings describing the top interactions
 */
export function formatTopInteractionsForDisplay(
    interactions: InteractionEffect[],
    topN: number = 3
): string[] {
    const top = getTopInteractions(interactions, topN);

    return top.map((interaction, index) => {
        const direction = interaction.effect > 0 ? 'positive' : 'negative';
        const magnitude = Math.abs(interaction.effect).toFixed(3);
        return `${index + 1}. ${interaction.aliasGroup} (${direction}, |effect| = ${magnitude})`;
    });
}

/**
 * Calculate full DOE analysis including main effects and interactions
 */
export function calculateFullDOEAnalysis(
    doeMatrix: DOERow[],
    ratings: Map<number, Rating>
): {
    mainEffects: Record<keyof FontParameters, number>;
    interactions: InteractionEffect[];
    topInteractions: InteractionEffect[];
} {
    // Import calculateMainEffects from designMatrix to avoid circular dependency
    // We'll calculate main effects inline here
    const effectAccumulators: Record<keyof FontParameters, { sum: number; count: number }> = {
        letterSpacing: { sum: 0, count: 0 },
        wordSpacing: { sum: 0, count: 0 },
        lineHeight: { sum: 0, count: 0 },
        fontWeight: { sum: 0, count: 0 },
        fontSize: { sum: 0, count: 0 },
        paragraphWidth: { sum: 0, count: 0 },
        bwgt: { sum: 0, count: 0 },
    };

    for (const row of doeMatrix) {
        const rating = ratings.get(row.runNumber);
        if (rating === undefined) continue;

        const factors = Object.keys(effectAccumulators) as (keyof FontParameters)[];
        for (const factor of factors) {
            const level = row.parameters[factor];
            effectAccumulators[factor].sum += level * rating;
            effectAccumulators[factor].count += 1;
        }
    }

    const mainEffects: Record<keyof FontParameters, number> = {
        letterSpacing: 0,
        wordSpacing: 0,
        lineHeight: 0,
        fontWeight: 0,
        fontSize: 0,
        paragraphWidth: 0,
        bwgt: 0,
    };

    const factors = Object.keys(effectAccumulators) as (keyof FontParameters)[];
    for (const factor of factors) {
        const { sum, count } = effectAccumulators[factor];
        mainEffects[factor] = count > 0 ? (2 * sum) / count : 0;
    }

    const interactions = calculateInteractionEffects(doeMatrix, ratings);
    const topInteractions = getTopInteractions(interactions, 3);

    return {
        mainEffects,
        interactions,
        topInteractions,
    };
}