function removeCycle(obj){
    const seen  = new WeakSet();

    function nestedCycle(current){
        if(curret ===null || typeof current !="object"){
            return ;
        }
        seen.add(current);

        for(const key in current ){
            if(Object.prototype.hasOwnProperty.call(this,key)){
                const value = current[key];
                if(value!=null && typeof value ==="object"){
                    if(seen.has(value)){
                        delete current[key];
                    }
                    nestedCycle(value)
                }
            }
        }
    }
    nestedCycle(obj)
}

//another method 
//we can achieve this same functionality using JSON.strigify and its replacer function

function removeCycleUsingJSONStringify(obj){
    let seen = new WeakSet();
    return JSON.stringify(obj,(key,value)=>{
        if(value!=null && typeof value ==="object"){
            if(seen.has(value)){
                return undefined;
            }
            return seen.add(value);
        }
        return value;
    })
}