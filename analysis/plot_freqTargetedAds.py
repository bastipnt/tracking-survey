# from typing import List, Dict
import plotly.express as px


def create_freq_plot(users):
    order = ["none", "once", "sometimes", "often"]

    counts = users.groupby(["numLastWeeksAds1"]).size().reset_index(name="count")

    counts["numLastWeeksAds1"] = counts["numLastWeeksAds1"].replace(
        {
            "none": "None",
            "once": "Once",
            "sometimes": "Sometimes",
            "often": "Often",
        }
    )

    fig = px.bar(
        counts,
        x="numLastWeeksAds1",
        y="count",
        category_orders={"numLastWeeksAds1": order},
        labels={
            "numLastWeeksAds1": "Frequency",
            "count": "Count",
        },
        # title="Frequency of Exposure to Targeted Ads",
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
