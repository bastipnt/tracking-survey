from typing import List, Dict


def create_freq_plot(users: List[Dict[str, str]], plt):
    fig, ax = plt.subplots()

    last_week_ads = ["none", "once", "sometimes", "often"]
    none_counts = sum(1 for user in users if user["numLastWeeksAds1"] == "none")
    once_counts = sum(1 for user in users if user["numLastWeeksAds1"] == "once")
    sometimes_counts = sum(
        1 for user in users if user["numLastWeeksAds1"] == "sometimes"
    )
    often_counts = sum(1 for user in users if user["numLastWeeksAds1"] == "often")

    counts = [none_counts, once_counts, sometimes_counts, often_counts]

    # bar_labels = ["red", "blue", "_red", "orange"]
    # bar_colors = ["tab:red", "tab:blue", "tab:red", "tab:orange"]

    ax.bar(last_week_ads, counts)

    ax.set_ylabel("Count")
    ax.set_xlabel("Frequency")
    ax.set_title("Frequency of Exposure to Trgeted Ads")
    # ax.legend(title="Targeted Ads")
