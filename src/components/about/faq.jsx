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
    <h2>What features will require a subscription?</h2>
    <p>Feature lists, both free and paid, are still a work in progress.</p>
    <br />
    <br />
    <h2>How do I get paid?</h2>
    <p>
      You handle cash and check like you do today. As part of your account setup
      you can setup a Stripe account for credit card payments. You can control
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
      our payment processing utility Stripe does have fees. You can find more
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
    <br />
    <br />
    <h2>Are you HIPAA Compliant?</h2>
    <p>
      The short answer is not yet. We are working on all of the paperwork and
      processes to make that happen. Our hosting service and database are HIPAA
      compliant and only you have access to the data you enter. What&apos;s left
      is the paperwork.
      <br />
      In the mean time we highly suggest not entering any protected personal
      information into this service. We understand for some users medical
      history is very important and this is getting the highest priority.
    </p>
    <br />
    <br />
    <h2>Where are the apps?</h2>
    <p>
      I get it, apps are nice and your go to for pretty much everything when
      you&apos;re working. Apps are coming, eventually. The focus is to give you
      one solid platform that&apos;ll work for all devices instead of a website
      and 2 apps that only kind of work.
    </p>
    <br />
    <br />
    <h2>How can I help?</h2>
    <p>
      If you&apos;re reading this, then this project is still very much a work
      in progress. There are 2 ways you can assist in making this the best
      platform for you:
      <br />
      Contact us with desired features, and feedback.
      <br />
      Consider <a href='paypal.me/dbednar13'>donating</a> to help cover
      development and hosting costs.
      <br />
      Donations are definitely appreciated to help cover costs between now and
      the project going live. For legal reasons I&apos;m required to say that
      donating won&apos;t gurantee any specificly requested features, nor any
      delivery timeline.
    </p>
  </>
);

export default FAQ;
