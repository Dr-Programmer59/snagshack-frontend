import React from 'react';

const page = () => {
  return (
    <div className="bg-white text-gray-800 p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">SnagShack LLC Terms of Service</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
        <p className="text-base leading-relaxed">
          By subscribing to any of SnagShack LLC’s services, you agree to the following Terms of Service.
          These terms apply to all users and are legally binding. Please read these terms carefully before
          using our service. If you do not agree with any part of these terms, you should not subscribe or use the service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. SnagShack LLC is Not Affiliated with FOOD (formerly known as Uber Eats)</h2>
        <p className="text-base leading-relaxed">
          SnagShack LLC is an independent provider of discount services and has no affiliation, endorsement,
          or partnership with FOOD (formerly known as Uber Eats), or any of the companies for which discounts
          are offered. We provide access to promotional codes, account generation services, and savings
          guides for popular services, but we are not associated with these platforms in any capacity.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Independent Operations</h2>
        <p className="text-base leading-relaxed">
          SnagShack LLC operates independently, offering discounts and promotional codes for a variety of services.
          We do not have any direct or indirect partnerships with the companies for which we provide discounts.
          All services provided are operated solely by SnagShack LLC, and no services are in partnership or affiliation
          with other companies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Billing Cycle</h2>
        <p className="text-base leading-relaxed">
          SnagShack LLC operates on a 28-day billing cycle. Your subscription will renew automatically every 28 days 
          unless you cancel before the next billing cycle.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Promotions and Discounts</h2>
        <p className="text-base leading-relaxed">
          From time to time, SnagShack LLC may offer promotional codes, such as 5% off your subscription, 
          which will be valid for as long as you remain subscribed. If you cancel and later choose to re-subscribe, 
          you may not be eligible for the previous promotional offer and may be required to pay the full cost. 
          Promotions may be valid for just one month or until you cancel your subscription.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. No Refund Policy</h2>
        <p className="text-base leading-relaxed">
          All payments made to SnagShack LLC are non-refundable. Once your subscription is active, there will be 
          no refunds issued under any circumstances, including but not limited to dissatisfaction with the service, 
          lack of use, or inability to place orders.
        </p>
        <p className="text-base leading-relaxed">
          If a user disputes a payment or initiates a chargeback, SnagShack LLC will take action to have the chargeback 
          reversed. This may include pursuing legal action or working directly with payment processors to recover the funds.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Service Availability and Future Offerings</h2>
        <p className="text-base leading-relaxed">
          While we strive to provide continuous and reliable access to our services, SnagShack LLC reserves the right to 
          terminate or discontinue account generation or discount offerings at any time for any reason. If for any reason 
          we are no longer able to provide account services, all active subscriptions will be terminated as of the date 
          of discontinuation. No refunds will be issued in this case.
        </p>
      </section>

      {/* Add other sections similarly */}

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Cancellations</h2>
        <p className="text-base leading-relaxed">
          You may cancel your subscription at any time by managing your account settings. To avoid being charged for 
          the next billing cycle, you must cancel before the start of the next billing cycle. Once canceled, your access 
          to SnagShack services will remain active until the end of the current billing period. You will not receive 
          a refund for any unused portion of your subscription after canceling.
        </p>
      </section>

      <footer className="mt-12 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} SnagShack LLC. All rights reserved.
      </footer>
    </div>
  );
};

export default page;
