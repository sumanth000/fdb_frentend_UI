const data = [
    {
        "s_no": 64,
        "user_id": "suresh",
        "clock_in_status": "P",
        "clock_out_status": "P",
        "hours_worked": 1,
        "disable_clock_in": true,
        "disable_clock_out": true,
        "in_time": "2024-03-09T10:04:28.000+00:00",
        "out_time": "2024-03-09T10:04:29.000+00:00",
        "employee_id": "16543"
    },
    {
        "s_no": 65,
        "user_id": "suresh",
        "clock_in_status": "P",
        "clock_out_status": "P",
        "hours_worked": 1,
        "disable_clock_in": true,
        "disable_clock_out": true,
        "in_time": "2024-03-09T10:04:31.000+00:00",
        "out_time": "2024-03-09T10:04:32.000+00:00",
        "employee_id": "16543"
    },
    {
        "s_no": 66,
        "user_id": "suresh",
        "clock_in_status": "P",
        "clock_out_status": "P",
        "hours_worked": 1,
        "disable_clock_in": true,
        "disable_clock_out": true,
        "in_time": "2024-03-09T10:04:35.000+00:00",
        "out_time": "2024-03-09T10:04:36.000+00:00",
        "employee_id": "16543"
    },
    {
        "s_no": 67,
        "user_id": "sumanth",
        "clock_in_status": "P",
        "clock_out_status": "P",
        "hours_worked": 1,
        "disable_clock_in": true,
        "disable_clock_out": true,
        "in_time": "2024-03-09T10:04:51.000+00:00",
        "out_time": "2024-03-09T10:04:52.000+00:00",
        "employee_id": "222"
    }
];

// Group data by user_id and sum hours_worked for each group
const groupedData = data.reduce((groups, entry) => {
    const { user_id, hours_worked } = entry;
    if (!groups[user_id]) {
        groups[user_id] = { user_id, total_hours_worked: 0 };
    }
    groups[user_id].total_hours_worked += hours_worked;
    return groups;
}, {});

console.log(groupedData);

// Convert grouped data object to an array of objects
const result = Object.values(groupedData);

console.log(result);
