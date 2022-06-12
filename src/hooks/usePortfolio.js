import { useAdminPortfolio } from "./useAdminPortfolio";

export const usePortfolio = () => {
  const { loading, portfolio, getPortfolios } = useAdminPortfolio();

  return {
    loading,
    portfolio,
    getPortfolios,
  };
};
