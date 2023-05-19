export class APIFeatures {

    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find(keyword)
        return this
    }

    filter() {
        let qStrCopy = { ...this.queryStr }

        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(field => delete qStrCopy[field])

        qStrCopy = JSON.stringify(qStrCopy)
            .replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        this.query = this.query.find(JSON.parse(qStrCopy))
        return this
    }

    paginate(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1
        const skip = resPerPage * (currentPage - 1)
        this.query = this.query.limit(resPerPage).skip(skip)
        return this
    }
}
