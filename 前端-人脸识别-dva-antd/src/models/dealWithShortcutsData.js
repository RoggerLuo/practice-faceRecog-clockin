export const dealWithShortcutsData = (list)=>{
    if(!list) return {part1:[],part2:[],part3:[],part4:[]}
    let benchmark = 26 / (list[0] && list[0].value || 1)
    let noisy = Math.round(Math.random()*35)+'px'
    let noisy2 = Math.round(Math.random()*45)+'px'
    let max = {ind:0,minus:'-'} 
    let max2 = {ind:1,minus:'+'} 
    let first
    let fouth
    if(Math.random()>0.5){
        first = {ind:0,minus:'-',noisy} 
        fouth = {ind:1,minus:'+',noisy:noisy2} 
    }else{
        first = {ind:1,minus:'+',noisy:noisy2} 
        fouth = {ind:0,minus:'-',noisy} 
    }
    list = list.map((el,ind)=>{
        let fontSize =  benchmark*el.value
        fontSize = fontSize<12?12:fontSize
        fontSize = fontSize + 'px'
        el.style = {fontSize}
        el.text = el.file.fileName
        if(ind%4 == 0){//最大的那个窗口
            let num = ind/4
            if(num%2 == 0){
                el.style.position = 'relative'
                el.style.left =  first.minus+first.noisy             
            }
        }
        if(ind%4 == 2){
            let num = Math.floor(ind/4)
            if(num%2 == 0){
                el.style.position = 'relative'
                el.style.left = '-'+noisy           
            }
        }
        if(ind%4 == 3){//
            let num = Math.floor(ind/4)
            if(num%2 == 0){
                el.style.position = 'relative'
                el.style.left =  noisy2             
            }
        }
        if(ind%4 == 1){//第二大的那个窗口
            let num = Math.floor(ind/4)
            if(num%2 == 0){
                el.style.position = 'relative'
                el.style.left = fouth.minus+fouth.noisy          
            }
        }
        return el
    })
    let part1 = list.filter((el,ind)=>ind%4==first.ind)
    part1.reverse()
    let part2 = list.filter((el,ind)=>ind%4==2)
    part2.reverse()
    let part3 = list.filter((el,ind)=>ind%4==3)
    let part4 = list.filter((el,ind)=>ind%4==fouth.ind)
    return {part1,part2,part3,part4}
}
