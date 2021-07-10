import React from "react"
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        maxWidth: "inherit",
        maxHeight: "inherit",
        overflowWrap: "break-word"
    },
});

const Body = ({ body }) => {
    const classes = useStyles();

    let isBodyNotEmpty = (body !== undefined && body !== "\r\n")

    // let imgString
    // let bodyExtract
    // let githubLink


    const discardComments = /<!--([\s\S]*?)-->/gm
    body = body.replace(discardComments, '').split(/[\s][\r\n]/gm)
    // body = body.

    //(?<=##\s).*$
    // const upToURLRegex = /^.*?(?=(((https?://\/\/)|(www\.))[^\s]+))/gm
    // const urlBetweenParentheses = /(?<=\()([^\)]*).(?=\))/gm
    // const getImages = /<img([\s\S]*?)>/gm


    const urlRegexp = /(((https?:\/\/)|(www\.))[^\s\)\"\,]+)/gm
    let imgRegexp = /^.*(\.jpg|\.gif|\.png).*$/gm

    // console.log(body)
    // if (isBodyNotEmpty) {

    //     let toHeaders = body.match(/(?<=##\s).*$/gm)
    //     // if (toHeaders !== null) {
    //     //     console.log("toHeaders", toHeaders)
    //     //     toHeaders.forEach(header => {
    //     //         body = body.replace(/##.*$/gm, header)
    //     //     })
    //     //     // body = body.replace(/##.*$/gm, `<h3>/(?<=##\s).*$/gm</h3>`)
    //     // }
    //     // console.log("body", body)
    //     let urlMatches = body.match(urlRegexp)

    //     // console.log(urlMatches)
    // }
    // if (isBodyNotEmpty && body.includes("<img")) {
    //     bodyExtract = body.split("<img")[0]
    //     // console.log("bodyExtract", bodyExtract)
    //     imgString = body.match(urlRegex)

    // } 
    // else if (isBodyNotEmpty && body.includes("https://github")) {   
    //     githubLink = body.match(urlRegex)
    //     bodyExtract = body.match(upToURLRegex)
    //     console.log("githubLink", githubLink, bodyExtract)
    // } else if (isBodyNotEmpty) {
    //     bodyExtract = body
    // }

    // console.log("body", body)

    return (
        <div className={classes.root}>


            {body.map((item, i) => {
                if (item.match(imgRegexp) !== null) { //image
                    return (
                        <img key={i} src={item.match(urlRegexp)} className={classes.media} alt={i}/>
                    )
                } else if (item.match(urlRegexp)) {
                    let splitUrl = item.split(urlRegexp)
                    return splitUrl.map((s, ind) => {
                        if (!s || s === "http://" || s === "https://") return null;
                        // console.log("s", s)
                        return (
                            s.match(urlRegexp) ?
                            <a key={ind} href={s} className={classes.media}>{s}</a> :
                            <span key={ind}>{s}</span>
                        )
                    }).filter(row => row !== null)
                } else {
                    return (
                        <div key={i}>{item}</div>
                    )
                }
            })}

            {
                // (detectImages !== null ? detectImages.map(image => {
                //     console.log("image", image)
                //     return (
                //         <img src={image.match(urlRegex)} className={classes.media} />
                //     )
                // }) : null)


            }

            {/* <p>{isBodyNotEmpty ? body : null}</p> */}

            {/* {imgString ? <img src={imgString} className={classes.media} alt="problem-aaaa"/> : null }
            {githubLink ? <a href={githubLink} className={classes.media}>{githubLink}</a> : null} */}
        </div>

    )
}

export default Body



/**
 * Perhaps search for:
 * <!--
  Thanks for submitting a pull request!
  We appreciate you spending the time to work on these changes. Please provide enough information so that others can review your pull request. The three fields below are mandatory.

  Before submitting a pull request, please make sure the following is done:
 *

  (?<=\#)\d{1,} for digits #12345
 */