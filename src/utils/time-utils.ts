export const calculateTimeDisappeared = (dateString: string): string => {
  const disappearanceDate = new Date(dateString);
  const currentDate = new Date();
  const diffTime = currentDate.getTime() - disappearanceDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Hoje";
  } else if (diffDays === 1) {
    return "1 dia";
  } else if (diffDays < 30) {
    return `${diffDays} dias`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return months === 1 ? "1 mês" : `${months} meses`;
  } else {
    const years = Math.floor(diffDays / 365);
    const remainingMonths = Math.floor((diffDays % 365) / 30);
    if (years === 1) {
      return remainingMonths > 0
        ? `1 ano e ${remainingMonths} ${
            remainingMonths === 1 ? "mês" : "meses"
          }`
        : "1 ano";
    } else {
      return remainingMonths > 0
        ? `${years} anos e ${remainingMonths} ${
            remainingMonths === 1 ? "mês" : "meses"
          }`
        : `${years} anos`;
    }
  }
};
