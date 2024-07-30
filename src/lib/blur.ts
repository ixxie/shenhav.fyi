export function blur(node: HTMLElement, { from = 35, to = 0, duration = 600, delay = 0}) {
    return {
        delay,
        duration,
        css: (t: number) => `filter: blur(${from*(1 - t) + to*t}px)`
    };
}