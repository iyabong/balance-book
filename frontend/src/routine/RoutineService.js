const API_BASE_URL = process.env.REACT_APP_API_BASE_PRIMARY;

function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

export const RoutineService = {
    async getRoutineCheckCalendar(startDate, endDate) {
        try {
            const start = formatDateToYYYYMMDD(startDate);
            const end = formatDateToYYYYMMDD(endDate);
            console.log(`${API_BASE_URL}/api/routine/calendar?startDate=${start}&endDate=${end}`);
            const response = await fetch(
                `${API_BASE_URL}/api/routine/calendar?startDate=${start}&endDate=${end}`
            );
            
            if (!response.ok) {
                throw new Error('Failed to fetch routine data');
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching routine data:', error);
            throw error;
        }
    }
}; 