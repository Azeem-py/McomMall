import React from 'react';
import { WalletSummary } from './component/WalletSummary';
import { EarningTable } from '../component/Tables';

const Page = () => {
  return (
    <div className="flex flex-col gap-5 overflow-auto">
      <WalletSummary />
      <EarningTable />
    </div>
  );
};

export default Page;
