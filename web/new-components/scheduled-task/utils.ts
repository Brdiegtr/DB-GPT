/**
 * 定时任务相关的共享工具函数
 */

/** 将 cron 表达式转为友好中文描述 */
export function cronToLabel(cron: string): string {
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) return cron;
  const [minute, hour, dayOfMonth, , dayOfWeek] = parts;
  const weekMap: Record<string, string> = {
    '0': 'Dom',
    '1': 'Lun',
    '2': 'Mar',
    '3': 'Mié',
    '4': 'Jue',
    '5': 'Vie',
    '6': 'Sáb',
    '7': 'Dom',
  };
  if (hour === '*' && dayOfMonth === '*' && dayOfWeek === '*') {
    return `Cada hora en el ${minute} min`;
  }
  if (dayOfMonth === '*' && dayOfWeek === '*') {
    return `Cada día ${hour}:${String(minute).padStart(2, '0')}`;
  }
  if (dayOfMonth === '*' && dayOfWeek !== '*') {
    return `Cada ${weekMap[dayOfWeek] ?? `día ${dayOfWeek}`} ${hour}:${String(minute).padStart(2, '0')}`;
  }
  if (dayOfWeek === '*' && dayOfMonth !== '*') {
    return `Cada mes ${dayOfMonth}  ${hour}:${String(minute).padStart(2, '0')}`;
  }
  return cron;
}
