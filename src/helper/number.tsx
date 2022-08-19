

export function ParseNumber(str: String, alt: number): number {
    try {
        var a = Number(str);
        if (Number.isNaN(a)) {
            return alt < 0 ? 0 : alt;
        } else {
            return a < 0 ? 0 : a;
        }
    } catch (e) {
        return alt;
    }
}

