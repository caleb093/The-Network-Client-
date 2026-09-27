import { globalState } from '../features/api/apiSlice'

export default function useCheckUserObj() {
    const {currentUser} = globalState

    const isObjectEmpty = Object.keys(currentUser).length === 0
    
    return [isObjectEmpty]
}