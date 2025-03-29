/**
 * 计算时间戳距离现在过去了多少小时
 * @param timestamp 时间戳
 * @returns 过去的小时数
 */
export const getHoursPassed = (timestamp: number): number => {
  const now = new Date().getTime();
  return (now - timestamp) / (1000 * 60 * 60);
};

/**
 * 将时间戳转换为日期分组
 * @param timestamp 时间戳
 * @returns 分组名称
 */
export const getDateGroup = (timestamp: number): string => {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  console.log(
    date.toDateString(),
    today.toDateString(),
    yesterday.toDateString(),
  );

  if (date.toDateString() === today.toDateString()) {
    return "today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "yesterday";
  } else if (date.getFullYear() === today.getFullYear()) {
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  } else {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }
};

/**
 * 对日期分组进行排序
 * @param a 第一个分组
 * @param b 第二个分组
 * @returns 排序结果
 */
export const sortDateGroups = (a: string, b: string): number => {
  if (a === b) return 0;
  if (a === "today") return -1;
  if (b === "today") return 1;
  if (a === "yesterday") return -1;
  if (b === "yesterday") return 1;
  return -a.localeCompare(b);
};
