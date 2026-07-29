(() => {
  const source = window.VDS_DATA;
  const periodFilter = document.getElementById('periodFilter');
  const districtSearch = document.getElementById('districtSearch');
  const body = document.getElementById('summaryBody');
  const foot = document.getElementById('summaryFoot');

  const labels = {
    'Till Date': 'Till Date',
    'Dec-2025': 'December 2025',
    'Jan-2026': 'January 2026',
    'Mar-2026': 'March 2026',
    'Apr-2026': 'April 2026',
    'May-2026': 'May 2026',
    'Jun-2026': 'June 2026',
    'Jul-2026': 'July 2026'
  };

  source.periods.forEach(period => {
    const option = document.createElement('option');
    option.value = period;
    option.textContent = labels[period] || period;
    periodFilter.appendChild(option);
  });

  const number = value => Number(value || 0).toLocaleString('en-US');
  const sum = (rows, field) => rows.reduce((total, row) => total + Number(row[field] || 0), 0);
  const cell = value => `<td class="${value === 0 ? 'zero' : ''}">${number(value)}</td>`;

  function render() {
    const period = periodFilter.value || 'Till Date';
    const query = districtSearch.value.trim().toLowerCase();
    const allRows = source.data[period] || [];
    const visibleRows = query ? allRows.filter(r => r.district.toLowerCase().includes(query)) : allRows;

    const totals = {
      forwardedTotal: sum(allRows, 'forwardedTotal'),
      forwardedRoad: sum(allRows, 'forwardedRoad'),
      forwardedOthers: sum(allRows, 'forwardedOthers'),
      respondedTotal: sum(allRows, 'respondedTotal'),
      respondedRoad: sum(allRows, 'respondedRoad'),
      respondedOthers: sum(allRows, 'respondedOthers'),
      pendingTotal: sum(allRows, 'pendingTotal'),
      pendingRoad: sum(allRows, 'pendingRoad'),
      pendingOthers: sum(allRows, 'pendingOthers')
    };

    const rate = totals.forwardedTotal ? (totals.respondedTotal / totals.forwardedTotal) * 100 : 0;
    document.getElementById('forwardedKpi').textContent = number(totals.forwardedTotal);
    document.getElementById('forwardedSplit').textContent = `Road ${number(totals.forwardedRoad)} · Others ${number(totals.forwardedOthers)}`;
    document.getElementById('respondedKpi').textContent = number(totals.respondedTotal);
    document.getElementById('respondedSplit').textContent = `Road ${number(totals.respondedRoad)} · Others ${number(totals.respondedOthers)}`;
    document.getElementById('pendingKpi').textContent = number(totals.pendingTotal);
    document.getElementById('pendingSplit').textContent = `Road ${number(totals.pendingRoad)} · Others ${number(totals.pendingOthers)}`;
    document.getElementById('responseRateKpi').textContent = `${rate.toFixed(1)}%`;
    document.getElementById('rateBar').style.width = `${Math.min(rate, 100)}%`;
    document.getElementById('periodCaption').textContent = labels[period] || period;

    body.innerHTML = visibleRows.map(row => `
      <tr>
        <td>${row.sr}</td>
        <td>${row.district}</td>
        ${cell(row.forwardedTotal)}${cell(row.forwardedRoad)}${cell(row.forwardedOthers)}
        ${cell(row.respondedTotal)}${cell(row.respondedRoad)}${cell(row.respondedOthers)}
        <td class="${row.pendingTotal === 0 ? 'zero' : row.pendingTotal >= 20 ? 'high-pending' : ''}">${number(row.pendingTotal)}</td>
        ${cell(row.pendingRoad)}${cell(row.pendingOthers)}
      </tr>`).join('');

    foot.innerHTML = `<tr>
      <td colspan="2">Overall Total</td>
      <td>${number(totals.forwardedTotal)}</td><td>${number(totals.forwardedRoad)}</td><td>${number(totals.forwardedOthers)}</td>
      <td>${number(totals.respondedTotal)}</td><td>${number(totals.respondedRoad)}</td><td>${number(totals.respondedOthers)}</td>
      <td>${number(totals.pendingTotal)}</td><td>${number(totals.pendingRoad)}</td><td>${number(totals.pendingOthers)}</td>
    </tr>`;
  }

  periodFilter.addEventListener('change', render);
  districtSearch.addEventListener('input', render);
  render();
})();
