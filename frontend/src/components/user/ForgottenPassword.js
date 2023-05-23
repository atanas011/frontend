import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import MetaData from '../layout/MetaData'

import { forgottenPassword, clearErrors } from '../../actions/user'

const ForgottenPassword = () => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')

    const { error, message, loading } = useSelector(state => state.forgottenPassword)

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (message) {
            alert.success(message)
        }

    }, [dispatch, message, error, alert])

    const submitHandler = e => {
        e.preventDefault()

        const formData = new FormData()
        formData.set('email', email)

        dispatch(forgottenPassword(formData))
    }

    return (
        <Fragment>
            <MetaData title={'Forgotten Password'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Forgotten Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}>
                            Send Email
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default ForgottenPassword
