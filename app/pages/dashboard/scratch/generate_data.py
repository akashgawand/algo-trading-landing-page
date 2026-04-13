import json
import random
from datetime import datetime, timedelta

def parse_currency(curr_str):
    if not curr_str: return 0
    return float(curr_str.replace('$', '').replace(',', '').replace('+', ''))

def parse_percent(perc_str):
    if not perc_str: return 0
    return float(perc_str.replace('%', '').replace('+', ''))

def generate_monthly_history(start_month_str, initial_value, target_return_pct, months_count):
    try:
        start_date = datetime.strptime(start_month_str, "%B %Y")
    except:
        start_date = datetime.strptime(start_month_str, "%b %Y")
        
    history = []
    temp_value = initial_value
    
    # Target value at the end
    # (1 + target_return_pct/100)
    required_geometric_mean = (1 + target_return_pct / 100) ** (1/months_count) - 1
    
    # Generate returns with some volatility but hitting the target
    for i in range(months_count):
        # Add random walk/volatility
        ret_pct = required_geometric_mean * 100 + random.uniform(-3, 3)
        # Cap logic to avoid crazy swings if needed
        
        # Last month adjustment to hit target exactly
        if i == months_count - 1:
            # This is complex to do perfectly in one pass, but target is roughly hit
            pass
            
        profit = round(temp_value * (ret_pct / 100), 2)
        temp_value = round(temp_value + profit, 2)
        
        date = start_date + timedelta(days=31 * i)
        history.append({
            "month": date.strftime("%b %Y"),
            "returnPercent": round(ret_pct, 2),
            "profit": profit,
            "value": temp_value
        })
    
    return history[::-1]

def process_strategy(strategy_obj):
    name = strategy_obj["name"]
    
    def build_account_data(obj, is_primary=False):
        initial = parse_currency(obj["initialInvestment"])
        ret_pct = parse_percent(obj["returnPercent"])
        months = obj["months"]
        start_date = obj["startDate"]
        
        history = generate_monthly_history(start_date, initial, ret_pct, months)
        
        # Recalculate summary from history for consistency
        current_value = history[0]["value"]
        total_return = round(current_value - initial, 2)
        actual_ret_pct = round((total_return / initial) * 100, 2)
        
        pos_months = sum(1 for h in history if h["returnPercent"] > 0)
        
        return {
            "name": obj.get("name", name),
            "type": obj["type"],
            "summary": {
                "initialInvestment": initial,
                "currentValue": round(current_value),
                "totalReturn": round(total_return),
                "returnPercent": actual_ret_pct,
                "months": months,
                "successRate": round((pos_months / months) * 100, 1),
                "positiveMonths": pos_months,
                "avgMonthlyPercent": parse_percent(obj["avgMonthlyPercent"]),
                "period": f"{start_date} - Apr 2026"
            },
            "metrics": {
                "sharpeRatio": round(random.uniform(2.5, 3.5), 2),
                "maxDrawdown": round(random.uniform(4, 9), 2),
                "totalTrades": random.randint(1000, 5000),
                "tickersTraded": random.randint(50, 200)
            },
            "monthlyHistory": history
        }

    data = {
        "algorithm": name,
        "primaryAccount": build_account_data(strategy_obj, True),
        "subAccounts": [build_account_data(sub) for sub in strategy_obj.get("subStrategies", [])]
    }
    return data

# Load existing strategy data
with open('c:/Users/Amol/Akash/apexquants/trade-gemalgo/app/pages/landing/components/strategydata.json', 'r') as f:
    strategies = json.load(f)

# Process each algorithm
for strat in strategies:
    algorithm_name = strat["name"].strip().lower()
    if "orion" in algorithm_name:
        path = 'c:/Users/Amol/Akash/apexquants/trade-gemalgo/app/pages/dashboard/orionData/data.json'
    elif "apollo" in algorithm_name:
        path = 'c:/Users/Amol/Akash/apexquants/trade-gemalgo/app/pages/dashboard/apolloData/data.json'
    elif "nikolai" in algorithm_name:
        path = 'c:/Users/Amol/Akash/apexquants/trade-gemalgo/app/pages/dashboard/nikolAiData/data.json'
    else:
        continue # Should not happen based on strategydata.json
        
    algo_data = process_strategy(strat)
    
    with open(path, 'w') as f:
        json.dump(algo_data, f, indent=2)

print("Updated all data.json files with multi-account support based on strategydata.json.")
