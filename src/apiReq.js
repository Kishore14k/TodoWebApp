
const apiReq = async (url='',Options=null,errMsg=null) => {
    try{
        const response=await fetch(url,Options)
        if(!response.ok) throw Error("Reload the app")
    }catch(err){
        errMsg=err.message
    }finally{
        return errMsg
    }
}

export default apiReq