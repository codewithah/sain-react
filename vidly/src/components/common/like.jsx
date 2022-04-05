import React from "react";

const Like = props => {

    const classes = props.liked === true ? "fa fa-heart" : "fa fa-heart-o";

    return (
        <React.Fragment>
            <i onClick={props.onClick} className={classes} aria-hidden="true"></i>
        </React.Fragment>
    )
}

export default Like;