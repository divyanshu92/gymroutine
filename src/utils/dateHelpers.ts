export const getCurrentWeekday = (): string => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { weekday: 'long' });
};

export const formatDateForStorage = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

export const parseDateFromStorage = (dateString: string): Date => {
    return new Date(dateString);
};

export const getLastFiveWeeks = (): Date[] => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 5; i++) {
        const pastDate = new Date();
        pastDate.setDate(today.getDate() - (i * 7));
        dates.push(pastDate);
    }
    return dates;
};