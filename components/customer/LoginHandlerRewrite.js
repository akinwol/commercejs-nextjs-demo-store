import React, { Component } from 'react';
import Head from 'next/head';
import Router, { withRouter } from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setCustomer } from '../../store/actions/authenticateActions';
import commerce from '../../lib/commerce';
import Root from '../common/Root';
import Footer from '../common/Footer';
import LoginAnimation from './LoginAnimation';
import { resolveHref } from 'next/dist/shared/lib/router/router';

function LoginHandler({ router }) {
  const [state, setState] = React.useState({
    loading: false,
    isError: false,
    message: null,
    email: '',
  })
  const { token } = router.query;
  console.log({ token })
  

const handleChangeEmail = (event) => {
  setState({
    ...state,
    email: event.target.value
  })

}

const loginCustomer = async (e) => {
  e.preventDefault();
  const { email } = state;
  setState({
    ...state,
    loading: true,
    isError: false,
    message: null,
  })
  try {
    const baseUrl = `${window.location.origin}/login?token={token}`
    const customerToken = await commerce.customer.login(email, baseUrl)
    console.log({ customerToken })
  
    //    const result = await fetch('/api/auth', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    // },
    //   body: JSON.stringify({
    //     email,
    //     baseUrl: `${window.location.origin}/login?token={token}`,
    //   })
    // })
    // console.log({ result })
    // const data = await result.json();
    // console.log({ data })




    // const result = await fetch('/api/auth', {
    //   method: 'POST',
    //   headers: {
    //     'X-Authorization': '{token}',
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    // },
    //   body: JSON.stringify({
    //     email,
    //     baseUrl: `${window.location.origin}/login?token={token}`,
    //   })
    // })
    // console.log({ result })
    // const data = await result.json();
    // console.log({ data })
    
  } catch (error) {
    console.log({ error })
    
  }
}

  const getCustomertoken = async () => {
    try {
      setState({
        ...state,
        loading: true,
        isError: false,
        message: null,
      })
      const customer = await commerce.customer.getToken(token);
      console.log({ customer })
      await setCustomer();
      Router.push('/account');
    } catch (error) {
      setState({
        ...state,
      loading: false,
      isError: true,
      message: ['The login link has expired. Please try again.'],
      })
      
    }

  }

  React.useEffect(() => {
    console.log({ token })
    if (token) {
      getCustomertoken();
    }


  }, [token])


  return (
    <>
     <Root>
        <Head>
          <title>Login</title>
        </Head>
        <div className="login-container pt-1 pb-0 px-3 pt-sm-0 px-sm-0 mx-auto my-0 mw-1600">
          <div className="row mt-5 pt-5">
            <div className="col-12 col-md-6 col-lg-6 offset-lg-3 offset-md-3  row-content text-center">
              <div className="py-5 px-4 px-sm-5">
                <h2 className="font-size-header mb-4">
                  Login
                </h2>
                {/* { this.renderAlert() }
                { this.renderForm() } */}
                <form>
                  <label className="w-100 mb-4">
                    <p className="mb-1 font-size-caption font-color-light text-left">
                      Email address
                    </p>
                    <input
                      name="email"
                      type="email"
                      onChange={handleChangeEmail}
                      value={state.email}
                      className="rounded-0 w-100"
                      required
                    />
                  </label>
                  <button
                    className="bg-black font-color-white w-100 border-none h-56 font-weight-semibold"
                    type="submit"
                    onClick={loginCustomer}
                  >
                    Get magic link
                  </button>
              </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Root>
    
    </>
  )
}

export default compose(
  withRouter,
  connect(null, { setCustomer }) // function that returns wrapper
)(LoginHandler);
