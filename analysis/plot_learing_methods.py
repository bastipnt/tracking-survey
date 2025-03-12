# from typing import List, Dict
import plotly.express as px


# def create_learning_methods_plot_old(users: List[Dict[str, str]], plt, color_map):
#     fig, ax = plt.subplots(constrained_layout=True)

#     learning_methods = [
#         "reading technical",
#         "reading non technical",
#         "video",
#         "art",
#     ]

#     technical_counts = sum(
#         1 for user in users if "reading-technical" in user["learningApproaches9"]
#     )
#     non_technical_counts = sum(
#         1 for user in users if "reading-non-technical" in user["learningApproaches9"]
#     )
#     video_counts = sum(1 for user in users if "video" in user["learningApproaches9"])
#     art_counts = sum(1 for user in users if "art" in user["learningApproaches9"])

#     counts = [technical_counts, non_technical_counts, video_counts, art_counts]

#     # bar_labels = ["red", "blue", "_red", "orange"]
#     # bar_colors = ["tab:red", "tab:blue", "tab:red", "tab:orange"]

#     ax.bar(learning_methods, counts, color=color_map[0])

#     # plt.xticks(rotation=45)

#     ax.set_xticks(range(len(learning_methods)))
#     ax.set_xticklabels(learning_methods)
#     plt.setp(ax.get_xticklabels(), rotation=0)

#     ax.set_ylabel("Count")
#     ax.set_xlabel("Learning Method")
#     ax.set_title("Preferred Learning Methods")
#     # ax.legend(title="Targeted Ads")


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
        title="Preferred Learning Methods",
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
