# from typing import List, Dict
import plotly.express as px


# def create_freq_plot_old(users: List[Dict[str, str]], plt, color_map):
#     fig, ax = plt.subplots()

#     last_week_ads = ["none", "once", "sometimes", "often"]
#     none_counts = sum(1 for user in users if user["numLastWeeksAds1"] == "none")
#     once_counts = sum(1 for user in users if user["numLastWeeksAds1"] == "once")
#     sometimes_counts = sum(
#         1 for user in users if user["numLastWeeksAds1"] == "sometimes"
#     )
#     often_counts = sum(1 for user in users if user["numLastWeeksAds1"] == "often")

#     counts = [none_counts, once_counts, sometimes_counts, often_counts]

#     # bar_labels = ["red", "blue", "_red", "orange"]
#     # bar_colors = ["tab:red", "tab:blue", "tab:red", "tab:orange"]

#     ax.bar(last_week_ads, counts, color=color_map[0])

#     ax.set_ylabel("Count")
#     ax.set_xlabel("Frequency")
#     ax.set_title("Frequency of Exposure to Targeted Ads")
#     # ax.legend(title="Targeted Ads")


def create_freq_plot(users):
    order = ["none", "once", "sometimes", "often"]
    data = users

    data["numLastWeeksAds1"] = data["numLastWeeksAds1"].replace(
        {
            "none": "None",
            "once": "Once",
            "sometimes": "Sometimes",
            "often": "Often",
        }
    )

    fig = px.bar(
        users,
        x="numLastWeeksAds1",
        category_orders={"numLastWeeksAds1": order},
        labels={
            "numLastWeeksAds1": "Frequency",
            "count": "Count",
        },
        title="Frequency of Exposure to Targeted Ads",
    )

    fig.update_layout(
        title_font_size=34,
        xaxis_title_font_size=30,
        yaxis_title_font_size=30,
        legend_font_size=24,
    )

    fig.update_xaxes(tickfont_size=20)
    fig.update_yaxes(tickfont_size=20)

    fig.show()
