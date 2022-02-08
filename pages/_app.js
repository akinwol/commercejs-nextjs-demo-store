/* global process */
import React, {useEffect, useState} from 'react';
import '../style/scss/style.scss';
import { useStore } from '../store';
import { Provider  } from 'react-redux';
import commerce from '../lib/commerce';
import { loadStripe } from '@stripe/stripe-js';
import { setCustomer } from '../store/actions/authenticateActions';
import 'swiper/components/effect-fade/effect-fade.scss';
import LogRocket from 'logrocket';

const MyApp = ({Component, pageProps}) => {
  LogRocket.init('04kxs2/socan-test');

  const store = useStore(pageProps.initialState);

  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) { // has API key
      setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY));
    }

    store.dispatch(setCustomer());

    commerce.products.list().then((res) => {
      store.dispatch({
        type: 'STORE_PRODUCTS',
        payload: res.data
      })
    });

    commerce.categories.list().then((res) => {
      store.dispatch({
        type: 'STORE_CATEGORIES',
        payload: res.data
      })
    });

  }, [store])

  const state = store.getState()
  if (state && state.customer) {
    LogRocket.identify(state.customer.id, {
      name: `${state.customer.firstname} ${state.customer.lastname}`,
      email: state.customer.email,
    
      // Add your own custom user variables here, ie:
      subscriptionType: 'customer',
      created: state.customer.created,
      phone: state.customer.phone,
      cartId: state.cart ? state.cart.id : null,
      cartItem: state.cart ? state.cart.line_items :null,
      cartCheckout: state.cart ? state.cart.hosted_checkout_url : null,
    });
  }

  console.log({ pageProps, store, state })

  return (
    <Provider store={store}>
      <Component
        {...pageProps}
        stripe={stripePromise}
      />
    </Provider>
  );

}

export default MyApp;
