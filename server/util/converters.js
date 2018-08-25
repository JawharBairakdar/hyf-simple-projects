
exports.JSONParse = param => {
  try { return JSON.parse(param) } catch (error) { return false }
}
exports.JSONString = param => {
  try { return JSON.stringify(param) } catch (error) { return false }
}