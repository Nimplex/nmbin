const submit = document.getElementById('submit')

submit.addEventListener('click', async () => {
    const lang = document.getElementById('language').value
    const title = document.getElementById('title').value
    const code = document.getElementById('code').value

    if (title.replace(/[\n ]/gm, '').length < 1) return alert('Too short title.')
    if (code.replace(/[\n ]/gm, '').length < 1) return alert('Too short title.')

    fetch('/create', 
        { 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                { language: lang, title: title, data: code } 
            )
        }
    ).then(res => res.json()).then(json => {
        location.href = `/${json._id}`
    }).catch(err, (err) => alert(`Error: ${err}`))
})