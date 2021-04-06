/**
 * Random char from @chars list with skiping @except
 * @param {string[]} chars
 * @param {string} except
 * @author Denis Narush <child.denis@gmail.com>
 */
export function randomCharWithExcept(chars, except) {
    let result = chars[Math.floor(Math.random() * chars.length)];
    if (result === except) {
        result = randomCharWithExcept(chars, except);
    }
    return result;
}
/**
 * Random from `0` to `@to - 1` with skiping @except
 * @param {number} to Limit of the range
 * @param {number} except Number that need to be skiped
 * @author Denis Narush <child.denis@gmail.com>
 */
export function randomWithExcept(to, except) {
    let result = Math.floor(Math.random() * (to - 1));
    if (result === except) {
        result = randomWithExcept(to, except);
    }
    return result;
}
