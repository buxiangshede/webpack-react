export const courseMarketAbi = [
  "function purchaseCourse(uint256 courseId)",
  "function stakeRevenue(uint256 amount)",
  "function withdrawRevenue(uint256 amount)",
  "function yieldVault() view returns (address)",
  "function authorBalances(address author) view returns (uint256)",
  "function hasAccess(uint256 courseId, address student) view returns (bool)",
];

export const ydTokenAbi = [
  "function approve(address spender, uint256 value) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

export const yieldVaultAbi = [
  "function depositFromCourseMarket(address author, uint256 amount)",
  "function withdraw(uint256 amount) returns (uint256)",
  "function withdrawAll() returns (uint256)",
  "function stakedBalance(address author) view returns (uint256)",
];
