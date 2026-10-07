import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register, Timer } from 'claude-code'

import type { Fill } from '../types'

// The on/off switch lives in $.store, which is one file per user shared by
// every session; each session mirrors it into $.state so the band redraws.
const STORE_KEY = 'isOn'
const POLL_MS = 3000
const WIDTH = 20

const isOn = atom({ plugin: 'context-bar', key: 'isOn' } as const, true)
const fill = atom({ plugin: 'context-bar', key: 'fill' } as const, null)

const formatTokens = (n: number) =>
  n >= 1000 ? `${Math.round(n / 1000)}k` : String(n)

const barFor = (percent: number) => {
  const full = Math.round((Math.min(100, Math.max(0, percent)) / 100) * WIDTH)
  return '█'.repeat(full) + '░'.repeat(WIDTH - full)
}

async function syncFromStore($: EngineInterface) {
  const want = (await $.store.get(STORE_KEY)) !== false
  if ((await read($, isOn)) !== want) {
    await update($, isOn, () => want)
  }
}

export const register: Register = on => {
  let poll: Timer | undefined

  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'context-bar',
      description: 'Show or hide the context bar in every session',
      argumentHint: 'on | off | status',
    })
    await syncFromStore($)
    const { context } = await $.session.usage()
    await update($, fill, () => ({ ...context }))

    // Picks up /context-bar on|off typed in another open session.
    poll?.cancel()
    poll = $.clock.every(POLL_MS, () => void syncFromStore($))

    return next(e)
  })

  on('session.measure', async ($, e, next) => {
    if (e.changed.includes('context')) {
      const { tokens, window, percent } = e.context
      await update($, fill, () => ({ tokens, window, percent }))
    }

    return next(e)
  })

  on('command.run', { command: 'context-bar' }, async ($, e) => {
    const arg = e.args.trim().toLowerCase()
    const current = await read($, isOn)

    if (arg === '' || arg === 'status') {
      return { text: `Context bar is ${current ? 'on' : 'off'} (all sessions).` }
    }
    if (arg !== 'on' && arg !== 'off') {
      return { text: 'Usage: /context-bar on | off | status' }
    }

    const want = arg === 'on'
    await $.store.set(STORE_KEY, want)
    await update($, isOn, () => want)

    return { text: `Context bar ${want ? 'on' : 'off'} — applies to all sessions.` }
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey || !(await read($, isOn))) {
      return next(e)
    }

    const current: Fill | null = await read($, fill)
    const { Box, Text } = $.ui.resolve(e)

    if (!current || current.percent === undefined) {
      return (
        <Box>
          <Text dimColor>Context {barFor(0)} waiting for first reply</Text>
        </Box>
      )
    }

    const color =
      current.percent >= 80 ? 'red' : current.percent >= 60 ? 'yellow' : 'green'

    return (
      <Box>
        <Text dimColor>Context </Text>
        <Text color={color}>{barFor(current.percent)}</Text>
        <Text dimColor>
          {' '}
          {current.percent}% · {formatTokens(current.tokens ?? 0)}/
          {formatTokens(current.window)}
        </Text>
      </Box>
    )
  })
}
