import { signTypedData } from '@wagmi/core'
import { isValidURI } from 'vveb3/lib/helpers/uri'

export const OPTIONS = {
  SAID: 'said',
  MADE: 'made',
  APPROVE: 'approve',
  DISAPPROVE: 'disapprove',
}
export const TYPES = {
  URI: 'URI',
  TXT: 'TXT',
}

export const getType = (content: string) => isValidURI(content.trim()) ? TYPES.URI : TYPES.TXT
export const isURI = (type: keyof typeof TYPES) => type === TYPES.URI

export const signNotabilityCheck = async (
  data: { action: string, content: string, peers: string[] } = { action: OPTIONS.SAID, content: '', peers: [] }
) => {
  const hasPeers = data.peers.length

  const version = hasPeers ? 'peers@1' : 'single@1'
  const name = 'Notability Check'
  const domain = {
    name,
    version,
  }

  const types = {
    'Object': [
      { name: 'content', type: 'string' },
      { name: 'type', type: 'string' },
    ],
    [name]: [
      { name: 'action', type: 'string' },
      { name: 'object', type: 'Object' },
    ],
  }

  const message: {
    action: string,
    object: {
      content: string,
      type: string,
    },
    peers?: string[],
  } = {
    action: data.action,
    object: {
      content: data.content,
      type: getType(data.content),
    },
  }

  if (hasPeers) {
    types[name].push({ name: 'peers', type: 'address[]' })
    message.peers = data.peers
  }

  return await signTypedData({
    primaryType: name,
    message,
    domain,
    types,
  })
}
