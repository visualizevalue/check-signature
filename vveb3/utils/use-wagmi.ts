import {
  type FetchEnsNameResult,
  fetchEnsAvatar,
  fetchEnsName,
} from '@wagmi/core'
import { type GetEnsAvatarReturnType } from 'viem/ens'

export const useEnsName = (address: Ref) => {
  const name = ref<FetchEnsNameResult>('')

  const update = async () => {
    if (! address.value) return
    name.value = await fetchEnsName({ address: address.value })
  }

  if (address.value) update()
  watch([address, /*chainId*/], () => update())

  return name
}

export const useEnsAvatar = (name: Ref) => {
  const avatar = ref<GetEnsAvatarReturnType>('')

  const update = async () => {
    if (! name.value) return
    avatar.value = await fetchEnsAvatar({ name: name.value })
  }

  if (name.value) update()
  watch([name, /*chainId*/], () => update())

  return avatar
}
