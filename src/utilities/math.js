

const EPSILON = 0.000001; // Adding an epsilon to handle floating point rounding errors

export function roundToDecimal(number, numDecimals) {
    if (numDecimals === 0) {
        return Math.round(number + EPSILON)
    }
    else {
        const factor = Math.pow(10, numDecimals);
        return Math.round((number + EPSILON) * factor) / factor;
    }
}

export function round(number) {
    return roundToDecimal(number, 0);
}

// Rounds a float to 5 decimals. This should be used before any comparisons (e.g. < <= > >=) because of floating point rounding errors
export function roundForComparison(number) {
    return roundToDecimal(number, 5);
}


export function formatDuration(duration) {
    return `${round(duration / 1000.0)}s`;
}