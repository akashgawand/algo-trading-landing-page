const fs = require('fs');

const rawData = `Jan 2024	+5.6%	$31,680	+$1,680
Feb 2024	+3.1%	$32,662	+$2,662
Mar 2024	+4.5%	$34,132	+$4,132
Apr 2024	+2.7%	$35,053	+$5,053
May 2024	+9.5%	$38,384	+$8,384
Jun 2024	-2.0%	$37,616	+$7,616
Jul 2024	+8.3%	$40,738	+$10,738
Aug 2024	+2.4%	$41,716	+$11,716
Sep 2024	+4.8%	$43,718	+$13,718
Oct 2024	-1.3%	$43,150	+$13,150
Nov 2024	+7.4%	$46,343	+$16,343
Dec 2024	-2.1%	$45,370	+$15,370
Jan 2025	+8.1%	$49,044	+$19,044
Feb 2025	+3.7%	$50,859	+$20,859
Mar 2025	+4.3%	$53,046	+$23,046
Apr 2025	+8.7%	$57,661	+$27,661
May 2025	+2.5%	$59,103	+$29,103
Jun 2025	+6.6%	$63,003	+$33,003
Jul 2025	+4.3%	$65,713	+$35,713
Aug 2025	-0.2%	$65,581	+$35,581
Sep 2025	+10.3%	$72,336	+$42,336
Oct 2025	-1.8%	$71,034	+$41,034
Nov 2025	+5.1%	$74,657	+$44,657
Dec 2025	+3.7%	$77,419	+$47,419`;

const lines = rawData.trim().split('\n');

// Since data is Jan 2024 to Dec 2025 (oldest to newest), we will reverse it later so it's latest-first in JSON.
const chronological = lines.map(line => {
    const parts = line.split(/\t+/);
    if(parts.length !== 4) return null;
    let [month, ret, val, cumProfit] = parts;
    
    ret = parseFloat(ret.replace(/[\+\%]/g, '').trim());
    val = parseFloat(val.replace(/[\$\,]/g, '').trim());

    return {
        month: month.trim(),
        returnPercent: ret,
        value: val
    };
}).filter(Boolean);

let initialInvestment = 30000;
const parsed = chronological.map((item, i) => {
    const prevValue = i === 0 ? initialInvestment : chronological[i-1].value;
    const monthlyProfit = item.value - prevValue;
    return {
        ...item,
        profit: monthlyProfit
    };
}).reverse(); // Reverse so it's latest to oldest

const jsonPath = 'c:/Users/Amol/Akash/apexquants/trade-gemalgo/app/pages/dashboard/nikolAiData/data.json';
const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

json.primaryAccount.monthlyHistory = parsed;

// update summary
const firstVal = initialInvestment;
const lastVal = parsed[0].value;
const totalRet = lastVal - firstVal;
const retPct = (totalRet / firstVal) * 100;
const months = parsed.length;
const posMonths = parsed.filter(m => m.returnPercent > 0).length;
const succRate = (posMonths / months) * 100;

// The user calculation for average monthly: "total return percent / months"
// So 158.06% / 24 months = 6.585...
const avgMon = retPct / months;

json.primaryAccount.summary.initialInvestment = firstVal;
json.primaryAccount.summary.currentValue = lastVal;
json.primaryAccount.summary.totalReturn = totalRet;
json.primaryAccount.summary.returnPercent = parseFloat(retPct.toFixed(2));
json.primaryAccount.summary.months = months;
json.primaryAccount.summary.positiveMonths = posMonths;
json.primaryAccount.summary.successRate = parseFloat(succRate.toFixed(2));
json.primaryAccount.summary.avgMonthlyPercent = parseFloat(avgMon.toFixed(2));
json.primaryAccount.summary.period = `${chronological[0].month} - ${parsed[0].month}`;

fs.writeFileSync(jsonPath, JSON.stringify(json, null, 4));
console.log('Successfully updated nikolAiData/data.json');
