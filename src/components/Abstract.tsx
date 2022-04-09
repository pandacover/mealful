import Customer from "./Customer";
import React, { useEffect, useState, useRef } from "react";

interface CustomerInterface {
    schedule_time: string,
    slot: string,
    item_date: string
}

const Abstract: React.FC = () => {
    const formRef = useRef<HTMLFormElement | any>();
    const [scheduleData, setScheduleData] = useState<any[]>([]);
    const [countScheduleData, setCountScheduleData] = useState<any[]>([]);
    const [countTimeSchedule, setCountTimeSchedule] = useState({});

    useEffect(() => {
        if (scheduleData.length === 0) return;

        let count: any = {};
        scheduleData.forEach((item) => {
            let key = item["schedule_time"].split(" ")[0];
            count[key] !== undefined ? count[key].push(item) : (count[key] = [item]);
        });
        setCountScheduleData(count);
    }, [scheduleData]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const time = formRef.current[0].value;
        setScheduleData(Customer.filter((item) => item["item_date"] === time));
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | any) => {
        e.preventDefault();
        let count = {
            "0-3": 0,
            "3-6": 0,
            "6-9": 0,
            "9-12": 0,
            "12-15": 0,
            "15-18": 0,
            "18-21": 0,
            "21-0": 0
        };

        countScheduleData[e.target.innerText].forEach((schedule: CustomerInterface) => {
            const time = schedule["schedule_time"].split(" ")[1];
            if (
                time.localeCompare("09:00:00") >= 0 &&
                time.localeCompare("12:00:00") <= 0
            ) {
                count["9-12"] += 1;
            } else if (
                time.localeCompare("12:00:00") >= 0 &&
                time.localeCompare("15:00:00") <= 0
            ) {
                count["12-15"] += 1;
            } else if (
                time.localeCompare("15:00:00") >= 0 &&
                time.localeCompare("18:00:00") <= 0
            ) {
                count["15-18"] += 1;
            } else if (
                time.localeCompare("18:00:00") >= 0 &&
                time.localeCompare("21:00:00") <= 0
            ) {
                count["18-21"] += 1;
            } else if (
                time.localeCompare("21:00:00") >= 0 &&
                time.localeCompare("00:00:00") <= 0
            ) {
                count["21-0"] += 1;
            } else if (
                time.localeCompare("00:00:00") >= 0 &&
                time.localeCompare("03:00:00") <= 0
            ) {
                count["0-3"] += 1;
            } else if (
                time.localeCompare("03:00:00") >= 0 &&
                time.localeCompare("06:00:00") <= 0
            ) {
                count["3-6"] += 1;
            } else if (
                time.localeCompare("06:00:00") >= 0 &&
                time.localeCompare("09:00:00") <= 0
            ) {
                count["6-9"] += 1;
            }
        });
        setCountTimeSchedule(count);
    };

    console.table(countTimeSchedule);
    console.table(countScheduleData);

    return (
        <form onSubmit={handleSubmit} ref={formRef}>
            <input type="date" />
            <button type="submit">Submit</button>
            <ul>
                {countScheduleData &&
                    Object.keys(countScheduleData).map((item, index) => (
                        <li key={index}>
                            <button onClick={handleClick}>{item}</button>
                        </li>
                    ))}
            </ul>
        </form>
    );
}

export default Abstract;