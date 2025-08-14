'use client';
import React from 'react';
import ToggleMenu from './PricingMenu';

export const PricingContainer = () => {
  const [billingPeriod, setBillingPeriod] = React.useState('Monthly');
  return (
    <div className="bg-white w-full mt-5">
      <header className="text-center">
        <h2 className="text-3xl font-medium">
          Select the plan that works for you
        </h2>
        <p className="text-lg">Enjoy the benefits that comes with it.</p>
      </header>

      <main>
        <ToggleMenu
          options={['PAYG', 'Co-Branded']}
          defaultIndex={1}
          onChange={val => console.log('Selected:', val)}
        />
      </main>
    </div>
  );
};
