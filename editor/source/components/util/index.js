import ActionType from '../action'

const apiURL = 'http://localhost:8000'

function toogleTip({
    show = true,
    error = false,
    loading = false,
    content = ''
}) {
    return {
        type: ActionType.UTIL_SHOW_TIP,
        loading,
        show,
        error,
        content
    }
}

let tooltipTimeout = null

export function showTip(type, content) {
    return dispatch => {
        if (type === 'auto') {
            dispatch(toogleTip({
                content
            }))
            clearTimeout(tooltipTimeout)
            tooltipTimeout = setTimeout(function() {
                dispatch(toogleTip({
                    show: false
                }))
            }, 2000)
        } else if (type === 'load') {
            dispatch(toogleTip({
                loading: true,
                content
            }))
        } else if (type === 'hide') {
            dispatch(toogleTip({
                show: false
            }))
        } else if (type === 'error') {
            dispatch(toogleTip({
                error: true,
                content
            }))
            clearTimeout(tooltipTimeout)
            tooltipTimeout = setTimeout(function() {
                dispatch(toogleTip({
                    show: false
                }))
            }, 2000)
        }
    }
}

export function apiRequest(method, url, data) {
    if (!((data instanceof FormData) || typeof(data) == 'string')) {
        data = data ? JSON.stringify(data) : null
    }
    return fetch(`${apiURL}/${url}`, {
        mode: 'cors',
        method: method,
        body: data || undefined
    }).then((response) => {
        return response.json()
    }).catch((error) => {
        showTip('error', error ? error.message : '未知错误')
    })
}
