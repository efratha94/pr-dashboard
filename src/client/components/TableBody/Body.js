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

    let imgString
    let bodyExtract
    let githubLink


    const urlRegex = ""// /(((https?:\/\/)|(www\.))[^\s\)]+)/g
    const upToURLRegex = "" // /^.*?(?=(((https?:\/\/)|(www\.))[^\s]+))/gm


    if (isBodyNotEmpty && body.includes("WorkloadNameCorrectionRef")) {
        bodyExtract = body.split("![WorkloadNameCorrectionRef")[0]
        imgString = body.match(urlRegex)
    } else if (isBodyNotEmpty && body.includes("https://github")) {   
        githubLink = body.match(urlRegex)
        bodyExtract = body.match(upToURLRegex)
    }


    return (
        <div className={classes.root}>
            <p>{isBodyNotEmpty ? bodyExtract : null}</p>
            {imgString ? <img src={imgString} className={classes.media} alt="problem"/> : null } {/* change alt */}
            {githubLink ? <a href={githubLink} className={classes.media}>{githubLink}</a> : null}
        </div>

    )
}

export default Body