import React from 'react';

const FAQ = () => (
  <>
    <h2>How Much does this cost?</h2>
    <p>
      That&apos;s still a work in progress, but the goal is to cover our
      expenses. The target is $15 a month or less.
    </p>
    <br />
    <br />
    <h2>How do I get paid?</h2>
    <p>
      You handle cash and check like you do today. As part of your account setup
      you can setup a Stripeaccount for credit card payments. You can control
      how often you get a payout within your Stripe account. Within Stripeyou
      You can find more details and up to date fees by checking out Strip&apos;s
      site{' '}
      <a href='https://stripe.com/docs/payouts#payout-schedule'>
        https://stripe.com/docs/payouts#payout-schedule
      </a>
    </p>
    <br />
    <br />
    <h2>What about Credit Card fees?</h2>
    <p>
      My Spa Assistant will take no cut of your credit card receipts. However,
      our payment processing utility Stripedoes have fees. You can find more
      details and up to date fees by checking out Strip&apos;s site{' '}
      <a href='https://stripe.com/pricing#pricing-details'>
        https://stripe.com/pricing#pricing-details
      </a>
    </p>
    <br />
    <br />
    <h2>So that&apos;s all find and dandy but what about my data?</h2>
    <p>
      Great question. My Spa Assistant stores none of your personal data outside
      of your name and email address. All other personal information is kept by
      your login app (Facebook, Google ect).
      <br />
      Careful consideration was given to handling payment information - both
      yours to use the app and your clients. That is why we chose Stripe. With
      Stripe, we never see any of the credit card information. Stripe is also
      used by giants such as Lyft, KickStarter and GoFundMe so you can rest in
      confidence that your data is safe
    </p>
  </>
);

export default FAQ;