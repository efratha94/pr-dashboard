import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import { CheckCircleIcon, CheckCircleOutlineIcon } from '@material-ui/icons';

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
    // console.log("body", body)
    const discardComments = /<!--([\s\S]*?)-->/gm
    body = body.replace(discardComments, '').split(/[\s][\r\n]/gm)


    const urlRegexp = /(((https?:\/\/)|(www\.))[^\s\)\"\,]+)/gm
    const imgRegexp = /^.*(\.jpg|\.gif|\.png).*$/gm
    const commentRegexp = /(?<=##\s).*$/gm

    return (
        <div className={classes.root}>


            {body.map((item, i) => {

                let imageReg = item.match(imgRegexp)
                let urlReg = item.match(urlRegexp)
                let commentReg = item.match(commentRegexp)

                if (imageReg !== null) { //image
                    
                    return (
                        <img key={i} src={urlReg} className={classes.media} alt={i} />
                    )

                } else if (urlReg) { //link

                    let splitUrl = item.split(urlRegexp)
                    return splitUrl.map((s, ind) => {
                        if (!s || s === "http://" || s === "https://") return null;
                        return (
                            s.match(urlRegexp) ?
                                <a key={ind} href={s} className={classes.media}>{s}</a> :
                                <span key={ind}>{s}</span>
                        )
                    }).filter(row => row !== null)

                } else { //text
                    // console.log(item)

                    if (commentReg) {
                        return <h3 key={i}>{commentReg}</h3>
                    } else if (item.includes("[x]")) {
                        return (
                            
                                <div>
                                <CheckCircleIcon>check_box</CheckCircleIcon>
                                {item.split("[x]")[1]}
                                </div>
                            
                        )
                    } else {
                        <div key={i}>{item}</div>
                    }

                    // return (
                    //     commentReg ?
                    //     <h3 key={i}>{commentReg}</h3> :

                    //     <div key={i}>{item}</div>
                    // )

                }
            })}

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