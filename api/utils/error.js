export const createError = (status, message) => {
  const err = new Error()
  err.status = status
  err.message = message
  // console.log('status', err.status)
  // console.log('message', err.message)
  return err
}