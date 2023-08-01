export const firstLetterCapitalize = (str: string) => {
    if (!str) return
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return str2
} 