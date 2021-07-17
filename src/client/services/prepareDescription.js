import Body from "../components/TableBody/Body"

const discardComments = /<!--([\s\S]*?)-->/gm
const pureUrlRegexp = /(((https?:\/\/)|(www\.))[^\s\)\"\,]+)/gm
const squareBracketsUrl = /\[([^(x|\s)].*)\]\((((https?:\/\/)|(www\.))[^\s\)\"\,]+)[\)]/gm
const squareBracketsText = /\[([^(x|\s)].*)\]/gm
const imgRegexp = /^.*(\.jpg|\.gif|\.png).*$/gm
const headerTitleRegexp = /(?<=##\s).*$/gm 
const headerLineRegexp = /(?=##\s).*$/gm 

const prepareDescription = async (reqs) => {
    reqs.map((req, i) => {
        let formattedHTML = []
        
        let body = req.pr_description
        body = body.replace(discardComments, '').split(/[\s][\r\n]/gm)
        // console.log(body)
        body.map((item, ind) => {
            if (item === "") return;
    
            let imageReg = item.match(imgRegexp)
            let pureUrlReg = item.match(pureUrlRegexp)
            let squareBracketsUrlMatch = item.match(squareBracketsUrl)
            let headerReg = item.match(headerTitleRegexp)
    

            if (headerReg) {

                let headerHTML = `<h3 key=${ind}>${headerReg}</h3>`
                item = item.replace(headerLineRegexp, headerHTML) 
                formattedHTML.push(item)
                
            } else {

                if (pureUrlReg) {
                    // console.log(item, pureUrlReg)
                    if (squareBracketsUrlMatch) {
                        console.log(item, pureUrlReg, squareBracketsUrlMatch, item.match(squareBracketsText))
                    }
                }

            }
        })
        
    })
}

export default prepareDescription