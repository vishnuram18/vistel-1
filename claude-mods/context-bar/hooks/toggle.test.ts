import { expect, test } from 'claude-code/testing'

test('/context-bar off and on persist in the shared store', async ($, on) => {
  const run = (args: string) =>
    $.command.run({ command: 'context-bar', args } as Parameters<typeof $.command.run>[0])
  const store = new Map<string, unknown>()
  on('command.run', () => ({ text: 'engine' }))
  on('store.get', (_$, e) => ({ value: store.get(e.key) }))
  on('store.set', (_$, e) => {
    store.set(e.key, e.value)
    return { value: undefined }
  })

  const off = await run('off')
  expect(off.text).toContain('off')
  expect(store.get('isOn')).toBe(false)
  const status = await run('status')
  expect(status.text).toContain('off')

  const on_ = await run('on')
  expect(on_.text).toContain('on')
  expect(store.get('isOn')).toBe(true)
  const bad = await run('maybe')
  expect(bad.text).toContain('Usage')
})
