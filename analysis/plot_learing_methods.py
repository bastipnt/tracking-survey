# from typing import List, Dict
import plotly.express as px


def create_learning_methods_plot(users):
    exploded_df = users.explode("learningApproaches9")
    name_counts = exploded_df["learningApproaches9"].value_counts().reset_index()
    name_counts.columns = ["learningApproaches9", "count"]

    name_counts["learningApproaches9"] = name_counts["learningApproaches9"].replace(
        {
            "reading-technical": "Reading Technical",
            "reading-non-technical": "Reading Non-Technical",
            "video": "Video",
            "art": "Art",
        }
    )

    fig = px.bar(
        name_counts,
        x="learningApproaches9",
        y="count",
        labels={
            "learningApproaches9": "Learning Method",
            "count": "Count",
        },
        # title="Preferred Learning Methods",
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
