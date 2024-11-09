import { useContext } from "react"
import { ContextApi } from "./ContextProvider"

export default function useItems() {
    const context = useContext(ContextApi)
    if (!context) {
        throw new Error("context is not defiend")
    }
    else return context
}
