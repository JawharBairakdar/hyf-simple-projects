
const mainErrorObject = {
  serverError: {
    ok: false,
    status: 500,
    statusText: 'Server Error',
    description: 'Oops something went wrong!'
  },
  badRequest: {
    ok: false,
    status: 400,
    statusText: 'Bad Request',
    description: 'All main queries has been selected - you can\'t search for two queries from different types.'
  },
  notFound: {
    ok: false,
    status: 404,
    statusText: 'Not Found',
    description: 'The requested content is not found or has been removed!'
  },
  assignError: param => ({
    ok: false,
    status: param.status|| param.code || 500,
    statusText:  param.statusText || param.message || 'Server Error',
    description: param.description || 'Oops something went wrong!',
    errors:  param.data && param.data.error && param.data.error.errors
  })
}



module.exports = (req, res, next) => {
  req.errors = mainErrorObject
  next()
}
