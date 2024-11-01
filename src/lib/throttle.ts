// Based on https://stackoverflow.com/questions/27078285/simple-throttle-in-js
export default (callback: (...args: any[]) => void, limit: number) => {
  let timeoutHandler: number | undefined

  return (...args: any[]) => {
    if (timeoutHandler === undefined) {
      timeoutHandler = window.setTimeout(() => {
        callback(...args)
        timeoutHandler = undefined
      }, limit)
    }
  }
}
