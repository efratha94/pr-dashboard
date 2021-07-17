import React from "react"
import DOMPurify from 'dompurify'
import { makeStyles } from '@material-ui/core/styles';
// import { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        maxWidth: "inherit",
        maxHeight: "inherit",
        overflowWrap: "break-word"
    },
    backticks: {
        backgroundColor: "grey"
    },
});


const Body = ({ body }) => {
    const classes = useStyles();

    return (
        <div className={classes.root} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(body)}}/>
    )
}

export default Body

/**
 * Need to alter this and save the body as an array of objects, with keys and values. e.g
 * [{
 *  "body": "this is an example of a section [with a link](http....)"
 *  "tag": "a"
 *  "classname": "classes.link"
 * }]
 * 
 */


