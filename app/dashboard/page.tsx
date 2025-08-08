import React from 'react';
import { DashboardSummary } from './component/DashboardSummary';
import { ListingPackageTable, RecentActivityTable } from './component/Tables';

const Page = () => {
  return (
    <div>
      <DashboardSummary />
      <section className="flex gap-5 flex-wrap">
        <RecentActivityTable />
        <ListingPackageTable />
      </section>
    </div>
  );
};

export default Page;
