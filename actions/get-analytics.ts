import {
  eachMonthOfInterval,
  endOfYear,
  format,
  startOfMonth,
  startOfYear,
  subMonths,
} from 'date-fns';

import { db } from '@/lib/db';

export const getAnalytics = async () => {
  try {
    const currentMonthStart = startOfMonth(new Date());
    const previousMonthStart = startOfMonth(subMonths(new Date(), 1));

    const currentMonthPurchases = await db.purchase.findMany({
      where: {
        createdAt: {
          gte: currentMonthStart,
        },
      },
    });

    const previousMonthPurchases = await db.purchase.findMany({
      where: {
        createdAt: {
          gte: previousMonthStart,
          lt: currentMonthStart,
        },
      },
    });

    const currentMonthTotal = currentMonthPurchases.reduce(
      (sum, purchase) => sum + purchase.price,
      0
    );
    const previousMonthTotal = previousMonthPurchases.reduce(
      (sum, purchase) => sum + purchase.price,
      0
    );

    const percentageChange =
      previousMonthTotal === 0
        ? currentMonthTotal === 0
          ? 0
          : 100
        : ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100;

    return {
      currentMonthTotal,
      currentMonthPurchases,
      previousMonthTotal,
      percentageChange,
      totalSales: currentMonthPurchases.length,
    };
  } catch (error) {
    console.log("[GET_ANALYTICS]", error);
    return {
      currentMonthTotal: 0,
      currentMonthPurchases: [],
      previousMonthTotal: 0,
      percentageChange: 0,
      totalSales: 0,
    };
  }
};

export const getMonthlySalesData = async () => {
  try {
    const startOfCurrentYear = startOfYear(new Date());
    const endOfCurrentYear = endOfYear(new Date());

    const purchases = await db.purchase.findMany({
      where: {
        createdAt: {
          gte: startOfCurrentYear,
          lte: endOfCurrentYear,
        },
      },
    });

    const monthlyData = eachMonthOfInterval({
      start: startOfCurrentYear,
      end: endOfCurrentYear,
    }).map((month) => {
      const monthStr = format(month, "MMM");
      const total = purchases.reduce((sum, purchase) => {
        if (format(purchase.createdAt, "MMM") === monthStr) {
          return sum + purchase.price;
        }
        return sum;
      }, 0);

      return { name: monthStr, total };
    });

    return monthlyData;
  } catch (error) {
    console.error("Error fetching monthly sales data:", error);
    return [];
  }
};
