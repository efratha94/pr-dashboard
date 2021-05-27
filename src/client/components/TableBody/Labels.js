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


const Labels = ({ values }) => {
  const classes = useStyles();

  return (

    <div className={classes.root}>
      {values.map(label => {
        let chipColor = label.color

        return (
          <Chip key={label.id} className="Label" label={label.name} color="primary" style={{ backgroundColor: chipColor }} />
        )
      })}
    </ div>
  )
}

export default Labels