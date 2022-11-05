export const getStringVal = (val,isArray) => {
    if(val===undefined){
        return isArray ? '[]' : null;
    }
    else{
        if(val==null){
            return val;
        }
        return isArray ? val : "'" + val + "'";
    }
}