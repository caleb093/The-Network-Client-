import loadingBarStyles from './loadingBar.module.css'

export default function LoadingBar() {
    return (
        <div class={loadingBarStyles.load_bar}>
            <div class={loadingBarStyles.bar}></div>
            <div class={loadingBarStyles.bar}></div>
            <div class={loadingBarStyles.bar}></div>
        </div>
    )
}