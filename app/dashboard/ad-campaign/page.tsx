'use client';
import React, { useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { CampaignFilters } from './components/CampaignFilters';
import { CampaignsTable } from './components/CampaignsTable';
import { PageHeader } from './components/PageHeader';
import { mockCampaigns } from './data';

const CampaignsPage = () => {
  // Original data source
  const [allCampaigns] = useState(mockCampaigns);

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setTypeFilter('all');
    setDateRange(undefined);
  };

  // Memoized filtering logic for performance
  const filteredCampaigns = useMemo(() => {
    return allCampaigns.filter(campaign => {
      // Search term filter (case-insensitive)
      const matchesSearch = campaign.listingName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus =
        statusFilter === 'all' || campaign.status === statusFilter;

      // Type filter
      const matchesType = typeFilter === 'all' || campaign.type === typeFilter;

      // Date range filter
      const matchesDate =
        !dateRange?.from ||
        (campaign.startDate >= dateRange.from &&
          (!dateRange.to || campaign.startDate <= dateRange.to));

      return matchesSearch && matchesStatus && matchesType && matchesDate;
    });
  }, [allCampaigns, searchTerm, statusFilter, typeFilter, dateRange]);

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Campaigns"
          breadcrumb="Home > Dashboard > Campaigns"
        />

        <CampaignFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          dateRange={dateRange}
          setDateRange={setDateRange}
          resetFilters={resetFilters}
        />

        <CampaignsTable campaigns={filteredCampaigns} />
      </div>
    </div>
  );
};

export default CampaignsPage;
