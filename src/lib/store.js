import { writable } from 'svelte/store'

export const expandedPost = writable(null)
export const showPreview = writable(false)
export const showHeader = writable(true)

export const activeImage = writable(null)

// export const screen = { w: 900}