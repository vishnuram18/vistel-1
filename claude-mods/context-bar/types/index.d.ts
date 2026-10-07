export type Fill = { tokens?: number; window: number; percent?: number }

declare module 'claude-code' {
  interface PluginState {
    'context-bar': { isOn: boolean; fill: Fill | null }
  }
}
