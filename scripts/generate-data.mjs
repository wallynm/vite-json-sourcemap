// Writes src/data.json, about 2 MB.
import { writeFileSync } from 'node:fs'

const words = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor'.split(' ')
const sentence = (seed, n) => Array.from({ length: n }, (_, i) => words[(seed * 7 + i * 3) % words.length]).join(' ')
const items = Array.from({ length: 2000 }, (_, id) => ({
  id,
  title: sentence(id, 30),
  options: ['A', 'B', 'C', 'D'].map((letter, i) => ({ letter, text: sentence(id + i, 12) })),
  explanation: sentence(id + 5, 40),
}))
writeFileSync(new URL('../src/data.json', import.meta.url), JSON.stringify(items, null, 2))
