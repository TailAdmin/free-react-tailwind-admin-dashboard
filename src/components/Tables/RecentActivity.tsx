const RecentActivity = () => {
    const activities = [
        { text: 'Audit on Cyber Products completed by John Doe', time: '2 hours ago' },
        { text: 'Critical Issue identified in Network Infrastructure', time: '5 hours ago' },
        { text: 'New auditor assigned: Jane Doe', time: '1 day ago' },
        { text: 'Audit deadline approaching for Organization C', time: '2 days ago' },
    ];

    return (
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
            <h4 className="mb-4 text-lg font-semibold text-black dark:text-white">
                Recent Activity
            </h4>
            <ul className="space-y-2">
                {activities.map((activity, index) => (
                    <li key={index} className="flex justify-between">
                        <p className="text-sm text-black dark:text-white">{activity.text}</p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentActivity;
