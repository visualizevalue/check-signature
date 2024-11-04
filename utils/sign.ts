import { signTypedData, type SignTypedDataArgs } from '@wagmi/core'
import isValidURI from '~/utils/is-valid-uri'

export type Signature = {
  signer: string,
  signature: string,
  subjects: string[],
  action: string,
  object: string,
}

export const OPTIONS = {
  said: 'said',
  wrote: 'wrote',
  made: 'made',
  bought: 'bought',

  sign: 'sign',
  approve: 'approve',
  disapprove: 'disapprove',
}
export const OPTIONS_GRAMMAR = {
  // KEY            I              HE/SHE          WE/THEY
  sign:           [ 'sign',        'signs',        'sign'          ],
  said:           [ 'said',        'said',         'said'          ],
  wrote:          [ 'wrote',       'wrote',        'wrote'         ],
  made:           [ 'made',        'made',         'made'          ],
  bought:         [ 'bought',      'bought',       'bought'        ],
  approve:        [ 'approve',     'approves',     'approve'       ],
  disapprove:     [ 'disapprove',  'disapproves',  'disapprove'    ],
}

export const TYPES = {
  URI: 'URI',
  TXT: 'TXT',
}

export const getType = (content: string) => isValidURI(content.trim()) ? TYPES.URI : TYPES.TXT
export const isURI = (type: keyof typeof TYPES) => type === TYPES.URI

type TypeDefinition = {
  name: string,
  type: string,
}

export const generateDefinition = (
  name: string,
  version: string,
  type: TypeDefinition[],
  otherTypes?: { [key: string]: TypeDefinition[] }
) => {
  const types = {
    [name]: type,
    ...otherTypes,
  }

  return {
    domain: {
      name,
      version,
    },
    message: null,
    primaryType: name,
    types,
  }
}

export const notabilityCheck712Definition = (subject: string[], action: string, object: string): SignTypedDataArgs => {
  const definition = generateDefinition(
    'Notability Check',
    '1',
    [
      { name: 'Subject', type: 'address[]' },
      { name: 'Action', type: 'string' },
      { name: 'Object', type: 'string' },
    ],
  )

  return {
    ...definition,
    message: {
      Subject: subject,
      Action: action,
      Object: object,
    },
  } as unknown as SignTypedDataArgs
}

export const signNotabilityCheck = async (subject: string[], action: string, object: string) =>
  await signTypedData(notabilityCheck712Definition(subject, action, object))
