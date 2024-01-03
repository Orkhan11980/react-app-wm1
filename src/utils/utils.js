

function formatDate(date) {
    const d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = '' + d.getHours(),
        minute = '' + d.getMinutes();

    return [month.padStart(2, '0'), day.padStart(2, '0'), year].join('/') + ', ' + [hour.padStart(2, '0'), minute.padStart(2, '0')].join(':');
}

export { formatDate };

