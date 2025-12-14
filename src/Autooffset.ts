export class Autooffset {
    private values: number[] = []
    private limit = 10

    public addValue(v: number): void {
        if (!Number.isFinite(v)) return
        this.values.push(v)
        if (this.values.length > this.limit) {
            this.values.shift()
        }
    }

    public setLimit(limit: number): void {
        if (limit > 0) this.limit = limit
        if (this.values.length > this.limit) {
            this.values = this.values.slice(-this.limit)
        }
    }

    public getAverageValue(): number {
        if (this.values.length === 0) return 0
        const sum = this.values.reduce((a, b) => a + b, 0)
        return Math.round(sum / this.values.length)
    }

    public reset(): void {
        this.values = []
    }
}
