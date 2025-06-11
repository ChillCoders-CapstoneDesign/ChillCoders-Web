// utils/postposition.ts
export const getParticle = (word: string, particle: [string, string]) => {
    if (!word) return particle[0];
    const lastChar = word[word.length - 1];
    const code = lastChar.charCodeAt(0) - 44032;
    const hasFinalConsonant = code % 28 !== 0;
    return hasFinalConsonant ? particle[0] : particle[1];
};