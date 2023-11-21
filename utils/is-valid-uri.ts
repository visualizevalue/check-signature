export const URI_REGEX = /^(http|https|ipfs|ipns):\/\/(.*)$/

export default (uri: string) => URI_REGEX.test(uri)
