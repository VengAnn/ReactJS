import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
//import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }

    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
        //console.log(event.target.value)
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })

        // console.log('username: ' + this.state.username, 'password: ' + this.state.password)
        // console.log('all state', this.state) //2.way to connect 2 string string a to string b; 

        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errcode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errcode === 0) {
                //to do
                this.props.userLoginSuccess(data.user)
                console.log('login successfuly')
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            //console.log(e)
            // console.log('ann', e.response)
        }
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
        //alert('click me!')
    }
    render() {
        //JSX
        return (
            <div className="login-background">
                <div className='login-container'>
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form group login-input">
                            <label >Username</label>
                            <input type="text"
                                className='form-control'
                                placeholder="Enter your username"
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)}
                            />
                        </div>
                        <div className="col-12 form group login-input">
                            <label >Password:</label>
                            <div className="custom-input-password">
                                <input
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className="form-control"
                                    placeholder="Enter you password"
                                    onChange={(event) => { this.handleOnChangePassword(event) }}
                                />
                                <span
                                    onClick={() => { this.handleShowHidePassword() }}

                                ><i className={this.state.isShowPassword ? 'far fa-eye' : 'fas fa-eye-slash'}> </i></span>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button className="btn-login" onClick={() => { this.handleLogin() }}>Login</button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">Forgot your password</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className="text-other-login">Or Login with</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
