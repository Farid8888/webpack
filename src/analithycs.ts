const createAnalitycs =():object=>{
    let counter = 0
    let isdestroyed = false
   const listener=():number=>counter ++
document.addEventListener('click',listener)
return{
     destroy (){
        document.removeEventListener('click',listener)
        isdestroyed = true
    },
    getClicks(){
        if(isdestroyed){
            return `analythics is destroyen counter is ${counter}`
        }
        return counter
    }
}
}

window['analithycs'] = createAnalitycs()