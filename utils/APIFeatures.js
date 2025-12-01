class APIFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }
    search(){
        const keyword = this.queryStr.keyword?
            {name:{
                $regex:this.queryStr.keyword,
                $options : 'i'
            }
        }:{};
        this.query = this.query.find({...keyword});
        return this;
    }
    filter(){
        const queryCopy = {...this.queryStr};

        const removeFeilds = [ 'keyword' , 'limit' , 'page' , 'sort'];
        removeFeilds.forEach(ele => delete queryCopy[ele]);

        let queryStr = JSON.stringify(queryCopy)

        queryStr = queryStr.replace (/\b(gt|gte|lt|lte)\b/g , match =>`$${match}`);
        let finalFilter = JSON.parse(queryStr);
        this.query = this.query.find(finalFilter);
        return this;
    }
    pagination(resultPerPage){
        const Currentpage = Number(this.queryStr.page)||1;
        const skip = resultPerPage*(Currentpage -1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;

    }
}
module.exports = APIFeatures;