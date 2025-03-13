# from typing import List, Dict
import plotly.express as px


def create_comfort_level_plot(users):
    order = [1, 2, 3, 4, 5]

    counts = users.groupby(["okToBeTracked5"]).size().reset_index(name="count")

    fig = px.bar(
        counts,
        x="okToBeTracked5",
        y="count",
        category_orders={"okToBeTracked5": order},
        labels={
            "okToBeTracked5": "Comfort Level from 1 (not comfortable) to 5 (comfortable)",
            "count": "Count",
        },
        # title="Comfort Level with Being Tracked",
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


def create_comfort_level_by_age_plot(users):
    order = ["< 18", "18-25", "26-40", "40+"]

    counts = users.groupby(["age10", "okToBeTracked5"]).size().reset_index(name="count")

    counts["age10"] = counts["age10"].replace(
        {"less-than-18": "< 18", "more-than-40": "40+"}
    )

    counts["okToBeTracked5"] = counts["okToBeTracked5"].replace(
        {
            "1": "1 (not comfortable)",
            "2": "2 (rather not comfortable)",
            "3": "3 (ok)",
            "4": "4 (somewhat comfortable)",
            "5": "5 (comfortable)",
        }
    )

    fig = px.bar(
        counts,
        x="age10",
        y="count",
        color="okToBeTracked5",
        category_orders={"age10": order},
        labels={
            "age10": "Age Groups",
            "okToBeTracked5": "Comfort Levels with Being Tracked",
            "count": "Count of Comfort Levels",
        },
        # title="Comfort Level with Being Tracked across Age Groups",
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
