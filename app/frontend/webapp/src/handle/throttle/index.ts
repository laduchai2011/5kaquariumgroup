function throttle<T extends (...args: unknown[]) => unknown>(func: T, limit: number): T {
    let lastFunc: ReturnType<typeof setTimeout> | null;
    let lastRan: number;

    return function (this: unknown, ...args: unknown[]) {
        if (!lastRan) {
            func.apply(this, args);
            lastRan = Date.now();
        } else {
            if (lastFunc) clearTimeout(lastFunc);
            lastFunc = setTimeout(
                () => {
                    if (Date.now() - lastRan >= limit) {
                        func.apply(this, args);
                        lastRan = Date.now();
                    }
                },
                limit - (Date.now() - lastRan)
            );
        }
    } as T;
}

export default throttle;
