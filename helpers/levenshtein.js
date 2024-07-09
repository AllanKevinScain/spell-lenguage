export function levenshtein(s, t) {
    if (s === t) {
        return 0;
    }

    const n = s.length;
    const m = t.length;

    if (n === 0 || m === 0) {
        return n + m;
    }

    const d = new Array(n + 1);
    for (let i = 0; i <= n; i++) {
        d[i] = new Array(m + 1).fill(0);
        d[i][0] = i;
    }

    for (let j = 0; j <= m; j++) {
        d[0][j] = j;
    }

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            const cost = s[i - 1] === t[j - 1] ? 0 : 1;
            d[i][j] = Math.min(
                d[i - 1][j] + 1,
                d[i][j - 1] + 1,
                d[i - 1][j - 1] + cost
            );
        }
    }

    return d[n][m];
}
