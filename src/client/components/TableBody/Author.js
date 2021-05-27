import React from "react"
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    justifyItems: 'center',
    alignItems: 'center'
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Author = ({ user }) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Avatar alt={user.username + "_avatar"} src={user.avatar} className={classes.large} />
            <span className="username">{user.username}</span>
        </div>
    )


}

export default Author

