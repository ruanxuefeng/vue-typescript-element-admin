/**
 * Check if an element has a class
 * @param ele HTMLElement
 * @param {string} cls cls
 * @returns {boolean}
 */
export function hasClass(ele: HTMLElement, cls: string) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

/**
 * Add class to element
 * @param ele
 * @param {string} cls
 */
export function addClass(ele: HTMLElement, cls: string) {
    if (!hasClass(ele, cls)) {
        ele.className += ' ' + cls;
    }
}

/**
 * Remove class from element
 * @param ele
 * @param {string} cls
 */
export function removeClass(ele: HTMLElement, cls: string) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}
