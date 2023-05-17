export default func => (req, res, next) =>
    Promise.resolve(func(req, res, next)).catch(next)
 // e.g. handles sent create req w/o required param in body json
 