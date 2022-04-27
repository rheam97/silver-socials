import React, { createContext, useContext } from "react";
import { useGroupReducer } from './reducers';

const HomeContext = createContext()
const {Provider} = HomeContext

const HomeProvider = ({value=[], ...props})=> {
    const [state, dispatch] = useGroupReducer({
        interests: [],
        groups: [],
        currentInterest: '',
    })
    console.log(state)

   
    return <Provider value={[state, dispatch]} {...props}/>
}
const useStoreContext = ()=> {
    return useContext(HomeContext)
}

export {HomeProvider, useStoreContext}