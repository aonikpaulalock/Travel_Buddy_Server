export type TTripFilter= {
  destination?: string;
  startDate?: string;
  endDate?: string;
  budget?: {
    minBudget?: number;
    maxBudget?: number;
  };
  searchTerm?: string;
};


export type TPaginationOption = {
  page?: number;
  limit?: number;
  sortBy?: string | undefined;
  sortOrder?: string | undefined;
};