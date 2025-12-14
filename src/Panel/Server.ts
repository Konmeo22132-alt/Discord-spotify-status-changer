import http from "http"

export function startServer(): void {
    http.createServer((req, res) => {
        res.writeHead(200)
        res.end("OK")
    }).listen(8888)
}
