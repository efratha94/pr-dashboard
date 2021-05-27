import React from "react"
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        fontWeight: "500",
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.7),
        },
    },
}));


const Status = ({ status }) => {
    const classes = useStyles();
    let chipColor = status.color

    return (
        <div className={classes.root}>
           <Chip className={classes.root} label={status.name} color="primary" style={{ backgroundColor: chipColor }} />
        </ div>
    )
}

export default Status