import React, { useState, useEffect } from 'react';
import { RoutineService } from './RoutineService';
import './RoutineCalendar.css';

const RoutineCalendar = () => {
    const [routineData, setRoutineData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoutineData = async () => {
            try {
                setLoading(true);
                const startDate = new Date();
                startDate.setMonth(startDate.getMonth() - 1);
                const endDate = new Date();
                endDate.setMonth(endDate.getMonth() + 1);

                const data = await RoutineService.getRoutineCheckCalendar(startDate, endDate);
                setRoutineData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRoutineData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="routine-calendar">
            <h2>루틴 체크 달력</h2>
            <div className="calendar-grid">
                {routineData.map((day) => (
                    <div key={day.date} className="calendar-day">
                        <div className="date-header">
                            <span className="date">{new Date(day.date).getDate()}</span>
                            <span className="day-of-week">{day.dayOfWeek}</span>
                        </div>
                        <div className="routine-checks">
                            {day.routineChecks.map((check) => (
                                <div key={check.id} className="routine-check">
                                    <span className={`status ${check.status?.toLowerCase()}`}>
                                        {check.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoutineCalendar; 