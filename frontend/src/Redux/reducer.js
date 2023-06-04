let initial={
    quickQuestions:null
}

export const reducer=(state=initial,{type,payload})=>{
    switch(type){
        case 'insertAll':return {...state,quickQuestions:payload}
        default:return state
    }
}