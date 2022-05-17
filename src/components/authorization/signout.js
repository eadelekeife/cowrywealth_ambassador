import React, { useEffect } from 'react';

import { signOutProp } from '../../common_files/reducers/auth';
import { connect } from 'react-redux';

const SignOut = props => {
    useEffect(() => {
        props.signOutProp();
    }, [])

    return (
        window.location.href = "/"
    )
}
// props.signOutProp();
const mapStateToProps = store => {
    return { auth: store.auth };
}

export default connect(mapStateToProps, { signOutProp })(SignOut);