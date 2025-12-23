export function formatINR(amount) {
  // amount expected in INR (number). Use en-IN formatting and no fraction digits
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}
