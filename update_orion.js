const fs = require('fs');

const rawData = `Apr 2026	+1.61%	+$19,810	$1,250,263
Mar 2026	+2.62%	+$31,415	$1,230,453
Feb 2026	+7.05%	+$78,965	$1,199,038
Jan 2026	+3.97%	+$42,769	$1,120,073
Dec 2025	+2.77%	+$29,037	$1,077,304
Nov 2025	+1.02%	+$10,584	$1,048,267
Oct 2025	+6.27%	+$61,224	$1,037,682
Sep 2025	+9.42%	+$84,064	$976,459
Aug 2025	+0.05%	+$446	$892,395
Jul 2025	+5.07%	+$43,040	$891,949
Jun 2025	+2.7%	+$22,318	$848,909
May 2025	+3.99%	+$31,716	$826,591
Apr 2025	-1.73%	$13,993	$794,876
Mar 2025	-1.47%	$12,068	$808,869
Feb 2025	+3.59%	+$28,450	$820,937
Jan 2025	+5.66%	+$42,452	$792,487
Dec 2024	+1.89%	+$13,913	$750,035
Nov 2024	+6.43%	+$44,473	$736,122
Oct 2024	+5.35%	+$35,124	$691,649
Sep 2024	+6.66%	+$40,994	$656,525
Aug 2024	+3.77%	+$22,362	$615,531
Jul 2024	+6.68%	+$37,143	$593,168
Jun 2024	-2.3%	$13,090	$556,026
May 2024	+1.94%	+$10,831	$569,115
Apr 2024	+6.86%	+$35,840	$558,285
Mar 2024	+3.1%	+$15,709	$522,445
Feb 2024	+6.36%	+$30,301	$506,736
Jan 2024	+11.79%	+$50,247	$476,435
Dec 2023	+2.86%	+$11,850	$426,187
Nov 2023	+2.6%	+$10,500	$414,337
Oct 2023	-1.09%	$4,450	$403,837
Sep 2023	+0.71%	+$2,878	$408,288
Aug 2023	+0.3%	+$1,213	$405,409
Jul 2023	+6.6%	+$25,025	$404,197
Jun 2023	+1.58%	+$5,898	$379,171
May 2023	+1.83%	+$6,708	$373,274
Apr 2023	+0.69%	+$2,512	$366,566
Mar 2023	-0.53%	$1,940	$364,054
Feb 2023	+3.49%	+$12,342	$365,993
Jan 2023	+5.37%	+$18,023	$353,651
Dec 2022	+0.54%	+$1,803	$335,628
Nov 2022	+5.51%	+$17,433	$333,825
Oct 2022	+0.12%	+$379	$316,392
Sep 2022	+0.48%	+$1,510	$316,013
Aug 2022	+4.75%	+$14,261	$314,503
Jul 2022	+2.97%	+$8,660	$300,242
Jun 2022	-0.62%	$1,819	$291,582
May 2022	-2.61%	$7,863	$293,401
Apr 2022	+2.69%	+$7,892	$301,264
Mar 2022	+2.55%	+$7,295	$293,372
Feb 2022	-0.46%	$1,322	$286,077
Jan 2022	+0.05%	+$144	$287,399
Dec 2021	+0.91%	+$2,590	$287,255
Nov 2021	+5.99%	+$16,088	$284,665
Oct 2021	+4.23%	+$10,900	$268,577
Sep 2021	+0.07%	+$180	$257,677
Aug 2021	+3.2%	+$7,984	$257,497
Jul 2021	+5.05%	+$11,995	$249,513
Jun 2021	+10.59%	+$22,745	$237,518
May 2021	-0.27%	$581	$214,774
Apr 2021	+0.1%	+$215	$215,355
Mar 2021	+3.77%	+$7,816	$215,140
Feb 2021	+23.5%	+$39,450	$207,324
Jan 2021	+16.46%	+$23,727	$167,874
Dec 2020	+13.17%	+$16,775	$144,147
Nov 2020	+1.82%	+$2,277	$127,372
Oct 2020	+0.35%	+$436	$125,095
Sep 2020	+4.4%	+$5,254	$124,659
Aug 2020	+4.54%	+$5,186	$119,405
Jul 2020	+6.41%	+$6,880	$114,220
Jun 2020	+7.19%	+$7,200	$107,339
May 2020	+8.95%	+$8,226	$100,139
Apr 2020	-0.4%	$369	$91,913
Mar 2020	-3.41%	$3,258	$92,282
Feb 2020	-4.46%	$4,460	$95,540`;

const lines = rawData.trim().split('\n');
const parsed = lines.map(line => {
    const parts = line.split(/\t+/);
    if(parts.length !== 4) return null;
    let [month, ret, profit, val] = parts;
    
    ret = parseFloat(ret.replace(/[\+\%]/g, '').trim());
    
    profit = parseFloat(profit.replace(/[\+\$\,]/g, '').trim());
    if (ret < 0) profit = -Math.abs(profit);

    val = parseFloat(val.replace(/[\$\,]/g, '').trim());

    return {
        month: month.trim(),
        returnPercent: ret,
        profit: profit,
        value: val
    };
}).filter(Boolean);

const jsonPath = 'c:/Users/Amol/Akash/apexquants/trade-gemalgo/app/pages/dashboard/orionData/data.json';
const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// update primary account history
json.primaryAccount.monthlyHistory = parsed;

// update summary
const firstVal = 100000;
const lastVal = parsed[0].value;
const totalRet = lastVal - firstVal;
const retPct = (totalRet / firstVal) * 100;
const months = parsed.length;
const posMonths = parsed.filter(m => m.returnPercent > 0).length;
const succRate = (posMonths / months) * 100;
const avgMon = parsed.reduce((sum, m) => sum + m.returnPercent, 0) / months;

json.primaryAccount.summary.currentValue = lastVal;
json.primaryAccount.summary.totalReturn = totalRet;
json.primaryAccount.summary.returnPercent = parseFloat(retPct.toFixed(2));
json.primaryAccount.summary.months = months;
json.primaryAccount.summary.positiveMonths = posMonths;
json.primaryAccount.summary.successRate = parseFloat(succRate.toFixed(2));
json.primaryAccount.summary.avgMonthlyPercent = parseFloat(avgMon.toFixed(2));
json.primaryAccount.summary.period = `Feb 2020 - ${parsed[0].month}`;

fs.writeFileSync(jsonPath, JSON.stringify(json, null, 4));
console.log('Successfully updated orionData/data.json');
