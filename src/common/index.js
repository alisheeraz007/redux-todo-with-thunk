export const goBack = (props, ev) => {
    props.history.goBack();
}

export const changePath = (name, props) => {
    props.history.push(`/${name}`)
}

export const capitalizeFirstLetters = (str) => {
    return str.toLowerCase().replace(/^\w|\s\w/g, function (letter) {
        return letter.toUpperCase();
    })
}