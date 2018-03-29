export default {
  error (module, message) {
    console.log(`\x1b[35m[${module}] \x1b[31m${message}\x1b[0m`)
  },
  success (module, message) {
    console.log(`\x1b[35m[${module}] \x1b[32m${message}\x1b[0m`)
  },
  info (module, message) {
    console.log(`\x1b[35m[${module}] \x1b[36m${message}\x1b[0m`)
  }
}