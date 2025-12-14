import { appendFileSync } from "fs"

export class Debug {
    static write(msg: string): void {
        appendFileSync("log.txt", msg + "\n")
    }
}
