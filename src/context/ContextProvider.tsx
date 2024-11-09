import React, { createContext, useState } from "react"

type TcontextStates = {
    isLoggedIn: boolean,
    setIsLoggedIn: (state: boolean) => void,
    showNumber: number,
    setShowNumber: (state: number) => void,
    setIsImageModal: (state: boolean) => void,
    isImageModal:boolean
}

export const ContextApi = createContext<TcontextStates | null>(null)

export default function ContextProvider({ children }: { children: React.ReactNode }) {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [showNumber, setShowNumber] = useState<number>(1)
    const [isImageModal, setIsImageModal] = useState<boolean>(false)


    const contextStates: TcontextStates = {
        isLoggedIn,
        setIsLoggedIn,
        showNumber,
        setShowNumber,
        isImageModal,
        setIsImageModal
    }

    return (
        <ContextApi.Provider value={contextStates}>
            {children}
        </ContextApi.Provider>
    )
}
