function saveOptions(e) {
    e.preventDefault()
    const port = document.getElementById('port').value || 3000

    chrome.storage.sync.set(
        {port}, () => {
            const status = document.getElementById('status')
            status.textContent = 'Options saved'
            setTimeout(() => {
                status.textContent = ''
            }, 690)
        }
    )
}

function restoreOptions(){
    chrome.storage.sync.get(
        {port: 3000},
        (items) => {
            document.getElementById('port').value = items.port
        }
    )
}
document.addEventListener('DOMContentLoaded', restoreOptions)
document.getElementById('save').addEventListener('click', saveOptions)
