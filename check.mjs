// Usage: node check.mjs <vite | vite7>
import { statSync } from 'node:fs'

const { createServer, version } = await import(process.argv[2] ?? 'vite')
const server = await createServer({ configFile: false, logLevel: 'silent', server: { port: 0 } })
await server.listen()
const { port } = server.httpServer.address()

const source = statSync('src/data.json').size
const client = await (await fetch(`http://localhost:${port}/src/data.json?import`)).text()
const ssr = await server.environments.ssr.transformRequest('/src/data.json')

console.log(
  `vite ${version}: src/data.json is ${source} bytes; ` +
    `client module is ${client.length} bytes, inline source map: ${client.includes('sourceMappingURL')}; ` +
    `SSR mappings: ${ssr?.map?.mappings?.length ?? 0} chars`,
)
await server.close()
