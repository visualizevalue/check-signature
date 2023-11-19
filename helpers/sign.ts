import { signTypedData, type SignTypedDataArgs } from '@wagmi/core'
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

export const notabilityCheck712Definition = (subject: string[], action: string, object: string): SignTypedDataArgs => {
  const name = 'Notability Check'
  const domain = {
    name,
    version: '1',
  }

  const types = {
    [name]: [
      { name: 'Subject', type: 'address[]' },
      { name: 'Action', type: 'string' },
      { name: 'Object', type: 'string' },
    ],
  }

  return {
    primaryType: name,
    message: {
      Subject: subject,
      Action: action,
      Object: object,
    },
    domain,
    types,
  }
}

export const signNotabilityCheck = async (subject: string[], action: string, object: string) =>
  await signTypedData(notabilityCheck712Definition(subject, action, object))
