(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.todayInBucharest = factory().todayInBucharest;
    root.dateRange = factory().dateRange;
  }
}(typeof self !== 'undefined' ? self : this, function() {
  function todayInBucharest() {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Europe/Bucharest',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    return formatter.format(new Date());
  }

  function dateRange(startDate, endDate) {
    const start = new Date(startDate + 'T00:00:00Z');
    const end = new Date(endDate + 'T00:00:00Z');
    const range = [];

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
      return range;
    }

    const current = new Date(start);
    while (current <= end) {
      const year = current.getUTCFullYear();
      const month = String(current.getUTCMonth() + 1).padStart(2, '0');
      const day = String(current.getUTCDate()).padStart(2, '0');
      range.push(`${year}-${month}-${day}`);
      current.setUTCDate(current.getUTCDate() + 1);
    }

    return range;
  }

  return {
    todayInBucharest,
    dateRange
  };
}));
