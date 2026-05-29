import { clipboard } from 'electron'

export function copyToClipboard(text: string) {
  try {
    clipboard.writeText(text)
  } catch (error) {
    console.log(error)
    return false
  }
  return true
}