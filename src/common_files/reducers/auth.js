import axios from '../axiosurl';

export const loginUser = (e) => async dispatch => {
    let { emailAddress, password } = e
    try {
        let submitData = await axios.post('/ambassador/signinambassador', {
            emailAddress,
            password
        });
        if(submitData.data.statusMessage === 'success') {
            dispatch({type: 'LOGIN_SUCCESS', payload: submitData.data.message});
        } else {
            dispatch({type: 'LOGIN_FAILURE', payload: submitData.data.summary})
        }
    } catch (err) {
        console.log(err);
    }
};

export const signOutProp = () => {
    return {
        type: 'LOGOUT_SUCCESS'
    }
}

export const updateUser = user => {
    return {
        type: "UPDATE_USER",
        payload: user
    }
}

export const cartDetails = cartData => {
    return {
        type: "UPDATE_CART_DATA",
        payload: cartData
    }
}