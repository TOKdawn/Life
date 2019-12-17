const baseImg = []

require.context('./', true, /\.png|jpg$/).keys().forEach((r) => {
    let info = {
        name: r,
        url: require(`${r}`)
    }
    baseImg.push(info)
});

export default baseImg;