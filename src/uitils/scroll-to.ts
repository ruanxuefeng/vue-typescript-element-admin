const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) {
        return c / 2 * t * t + b;
    }
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
const requestAnimFrame = (() => {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame
        || ((callback) => {
            window.setTimeout(callback, 1000 / 60);
        });
})();


/**
 * Because it's so fucking difficult to detect the scrolling element, just move them all
 * @param {number} amount
 */
function move(amount: number) {
    document.documentElement.scrollTop = amount;
    /*if (document.body.parentNode && document.body.parentNode.scrollTop) {
        document.body.parentNode.scrollTop = amount;
    }*/
    document.body.scrollTop = amount;
}

function position() {
    return document.documentElement.scrollTop ||  document.body.scrollTop;
}

/**
 * @param {number} to
 * @param {number} duration
 * @param {Function} callback
 */
export function scrollTo(to: number, duration?: number, callback?: () => void) {
    const start = position();
    const change = to - start;
    const increment = 20;
    let currentTime = 0;
    const d = (duration === undefined ? 500 : duration);
    const animateScroll = (() => {
        // increment the time
        currentTime += increment;
        // find the value with the quadratic in-out easing function
        const val = easeInOutQuad(currentTime, start, change, d);
        // move the document.body
        move(val);
        // do the animation unless its over
        if (currentTime < d) {
            requestAnimFrame(animateScroll);
        } else {
            if (callback && typeof (callback) === 'function') {
                // the animation is done so lets callback
                callback();
            }
        }
    });
    animateScroll();
}
