import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';

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

    },
});


const Body = ({ body }) => {
    const classes = useStyles();
    const discardComments = /<!--([\s\S]*?)-->/gm
    body = body.replace(discardComments, '').split(/[\s][\r\n]/gm)
    // console.log(body)

    const urlRegexp = /(((https?:\/\/)|(www\.))[^\s\)\"\,]+)/gm
    const imgRegexp = /^.*(\.jpg|\.gif|\.png).*$/gm
    const headerRegexp = /(?<=##\s).*$/gm

    // console.log(body)

    return (
        <div className={classes.root}>

            {/* {body.map((item, i) => {
                if (item === "") return;

                let imageReg = item.match(imgRegexp)
                let urlReg = item.match(urlRegexp)
                let headerReg = item.match(headerRegexp)

                
                // if (imageReg !== null) { //image

                //     return (
                //         <img key={i} src={urlReg} className={classes.media} alt={i} />
                //     )

                // }

                // if (urlReg) { //link
                //     console.log(item)
                //     let splitUrl = item.split(urlRegexp)
                    
                //     return splitUrl.map((s, ind) => {
                //         if (!s || s === "http://" || s === "https://") return null;
                        
                //         if (s.match(urlRegexp)){   
                //             return  <a key={ind} href={s} className={classes.media}>{s}</a>
                //         } else {

                //             if (s[0] === ")") {
                //                 s = s.slice(1)
                //             } else if (s[s.length-1] === "("){
                //                 s = s.slice(0, -1)
                //             }
                            
                //             if (s.includes("[x]")){
                //                 return (
                //                     <span key={ind}>
                //                         <CheckBox />
                //                         {s.split("[x]")[1]}
                //                     </span>
                //                 )
                //             } else if (s.includes("[ ]")){
                //                 return (
                //                     <span key={ind}>
                //                         <CheckBoxOutlineBlank />
                //                         {s.split("[ ]")[1]}
                //                     </span>
                //                 )                                
                //             } else {
                //                 return <span key={ind}>{s}</span>
                //             }
                //         }
                //     }).filter(row => row !== null)

                // }

                // if (headerReg) {  //text
                //     return <h3 key={i}>{headerReg}</h3>
                // }

                // if (item.includes("[x]")) {
                //     // console.log(item)
                //     return (

                //         <div key={i}>
                //             <CheckBox />
                //             {item.split("[x]")[1]}
                //         </div>

                //     )
                // }

                // if (item.includes("[ ]")) {
                //     return (
                //         <div key={i}>
                //             <CheckBoxOutlineBlank />
                //             {item.split("[ ]")[1]}
                //         </div>

                //     )
                // } else {
                //     return (
                //         <div key={i}>{item}</div>
                //     )
                // }
                // -------
                // if (headerReg){
                //     return <h3 key={i}>{headerReg}</h3>
                // }

                // if (item.includes("[x]") || item.includes("[ ]")) {
                //     // console.log(item)
                //     let checkbox = item.includes("[x]") ? "[x]" : "[ ]"
                //     let splitByCheck = item.split(checkbox)[1]
                    
                //     console.log("item", item)

                //     if (splitByCheck.match(urlRegexp)){
                //         let splitUrl = splitByCheck.split(urlRegexp)
                        
                //         // {checkbox === '[x]' ? <CheckBox /> : <CheckBoxOutlineBlank />}
                //         return splitUrl.map((s, ind) => {
                //             if (!s || s === "http://" || s === "https://") return null;
                //             return (
                                
                //                 s.match(urlRegexp) ?
                //                     <a key={ind} href={s} className={classes.media}>{s}</a> :
                //                     <span key={ind}>{s}</span>
                                
                //             )

                            
                //         }).filter(row => row !== null)
                //     } else {

                //     }
                // ------
                //     let splitUrl = item.split(urlRegexp)
                    
                //     return splitUrl.map((s, ind) => {
                //         if (!s || s === "http://" || s === "https://") return null;
                        
                //         if (s.match(urlRegexp)){   
                //             return  <a key={ind} href={s} className={classes.media}>{s}</a>
                // return <span key={ind}>{s}</span>

                //     return (

                //         <div key={i}>
                //             <CheckBox />
                //             {item.split("[x]")[1]}
                //         </div>

                //     )
                }

            })} */}

        </div>

    )
}

export default Body


