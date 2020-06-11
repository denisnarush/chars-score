export function randomCharWithExcept(chars, except) {
    let result = chars[Math.floor(Math.random() * chars.length)];
    if (result === except) {
        result = randomCharWithExcept(chars, except);
    }
    return result;
}

export function randomWithExcept(to, except) {
    let result = Math.floor(Math.random() * to + 1);
    if (result === except) {
        result = randomWithExcept(to, except);
    }
    return result;
}
