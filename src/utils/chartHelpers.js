// utils/chartHelpers.js

export const getChartData = (transactions) => {
  const last7Days = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toLocaleDateString();
    
    const dayIncome = transactions
      .filter(t => t.type === 'income' && t.date === dateStr)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const dayExpenses = transactions
      .filter(t => t.type === 'expense' && t.date === dateStr)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const dayProfit = dayIncome - dayExpenses;
    
    last7Days.push({
      date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' }),
      income: dayIncome,
      expenses: dayExpenses,
      profit: dayProfit,
      fullDate: dateStr
    });
  }
  
  return last7Days;
};

export const getCategoryData = (transactions) => {
  const categoryTotals = {};
  
  transactions.forEach(transaction => {
    const key = `${transaction.type}-${transaction.category}`;
    if (!categoryTotals[key]) {
      categoryTotals[key] = {
        category: transaction.category,
        type: transaction.type,
        amount: 0,
        count: 0
      };
    }
    categoryTotals[key].amount += transaction.amount;
    categoryTotals[key].count += 1;
  });
  
  return Object.values(categoryTotals).sort((a, b) => b.amount - a.amount);
};

export const calculateTotals = (transactions) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const profit = totalIncome - totalExpenses;

  return { totalIncome, totalExpenses, profit };
};