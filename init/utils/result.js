class result{
    constructor(code,message,data) {
        this.code = code;
        this.message= message;
        this.data= data;
      }
    toReturn(){
      return {code:this.code,message:this.message,data:this.data}
    }
}
module.exports = result;