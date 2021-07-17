const discardComments = /<!--([\s\S]*?)-->/gm
const pureUrlRegexp = /(((https?:\/\/)|(www\.))[^\s\)\"\,]+)/gm
const squareBracketsUrl = /\[([^(x|\s)].*)\]\((((https?:\/\/)|(www\.))[^\s\)\"\,]+)[\)]/gm
const squareBracketsText =  /(?<=\[)([^(x|\s)].*)(?=\])/gm ///\[([^(x|\s)].*)\]/gm
const imgRegexp = /^.*(\.jpg|\.gif|\.png).*$/gm
const headerTitleRegexp = /(?<=##\s).*$/gm 
const headerLineRegexp = /(?=##\s).*$/gm 
const backTicksRegexp = /\`(.*?)\`/gm

const prepareDescription = async (reqs) => {
    
    reqs.map((req, i) => {

        // console.log(req)
        let formattedHTML = []
        
        let body = req.pr_description
        body = body.replace(discardComments, '').split(/[\s][\r\n]/gm)
        // console.log(body)
        body.map((item, ind) => {
            if (item === "") return;
    
            const imageRegMatch = item.match(imgRegexp)
            const pureUrlRegMatch = item.match(pureUrlRegexp)
            const squareBracketsUrlMatch = item.match(squareBracketsUrl)
            const headerRegMatch = item.match(headerTitleRegexp)
            const backTicksRegMatch = item.match(backTicksRegexp)
            // console.log(item)

            if (backTicksRegMatch) {
                const backTicksHTML = `<span style={{backgroundColor: grey}}>${backTicksRegMatch[0].replace(/`/gm, "")}</span>`
                item = item.replace(backTicksRegexp, backTicksHTML)
                // formattedHTML.push(item)
                console.log(item)
            }

            if (headerRegMatch) {
                let headerHTML = `<h3 key=${ind}>${headerRegMatch}</h3>`
                item = item.replace(headerLineRegexp, headerHTML) 
                formattedHTML.push(item)
                
            } else {

                if (pureUrlRegMatch) {

                    if (squareBracketsUrlMatch) { // a link inside square brackets: [this is a link] (https://....)
                        let linkHTML = `<a key=${ind} href=${pureUrlRegMatch}>${item.match(squareBracketsText)}</a>`
                        item = `<div>${item.replace(squareBracketsUrlMatch, linkHTML)}</div>`
                        formattedHTML.push(item)

                    } else { // just a link
                        let linkHTML = `<a key=${ind} href=${pureUrlRegMatch}>${pureUrlRegMatch}</a>`
                        item = `<div>${item.replace(pureUrlRegMatch, linkHTML)}</div>`
                        formattedHTML.push(item)
                    }

                } else if (imageRegMatch) { //image

                } else { //text
                    item = `<div key=${ind}>${item}</div>`
                    formattedHTML.push(item)
                }
            }
        })
        // console.log()
        req.pr_description = formattedHTML.join(" ")
        return req
    })
    return reqs
}

export default prepareDescription