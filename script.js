const cols = document.querySelectorAll('.column');

document.addEventListener('keydown', e => {
    if (e.code === 'Space') {
        e.preventDefault()
        setColors()
    }
})

document.addEventListener('click', e => {
    const type = e.target.dataset.type

    if (type === 'lock') {
        const node = e.target.tagName.toLowerCase() === 'i'
            ? e.target
            : e.target.children[0]
        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copy(e.target.textContent)
    }

})

function copy(text) {
    return navigator.clipboard.writeText(text)
}

function setColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : []

    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const btn = col.querySelector('button')

        if (isLocked) {
            colors.push(text.textContent)
            return
        }

        const color = isInitial
            ? colors[index]
                ? colors[index]
                : chroma.random()
            : chroma.random()

        if (!isInitial) {
            colors.push(color)
        }

        col.style.background = color
        text.textContent = color

        setTextColor(text, color)
        setTextColor(btn, color)
    })

    updateHash(colors)
}

function setTextColor (text, color) {
   const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateHash(colors = []) {
    document.location.hash = colors.map(col => { return col.toString().substring(1) }).join('-')
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        document.location.hash.substring(1).split('-').map(color => '#' + color)
    }
    return []
}

setColors(true)
