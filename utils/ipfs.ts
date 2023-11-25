import { createHelia } from 'helia'
import type { Helia } from '@helia/interface'
import { json, type JSON } from '@helia/json'
import type { Signature } from './sign'
import { getAddress } from 'viem'

class IPFS {
  public _setup: boolean = false
  public helia: Helia|null = null
  public json: JSON|null = null

  async setup () {
    if (this._setup) return this

    try {
      this.helia = await createHelia()
      this.json = json(this.helia)
      this._setup = true
    } catch (e) {
      console.error(e)
    }

    return this
  }

  async addSignature (signature: Signature) {
    return this.generateCID({
      signer: getAddress(signature.signer),
      signature: signature.signature,
      subjects: signature.subjects.map(s => getAddress(s)),
      action: signature.action,
      object: signature.object,
    })
  }

  async generateCID (data: any) {
    await this.setup()

    const cid = await this.json?.add(data)

    if (! cid) throw new Error(`Couldn't derive CID`)

    return cid
  }
}

export default new IPFS()
