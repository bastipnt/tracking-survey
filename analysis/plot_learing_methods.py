from typing import List, Dict


def create_learning_methods_plot(users: List[Dict[str, str]], plt):
    fig, ax = plt.subplots(constrained_layout=True)

    learning_methods = [
        "reading technical",
        "reading non technical",
        "video",
        "art",
    ]

    technical_counts = sum(
        1 for user in users if "reading-technical" in user["learningApproaches9"]
    )
    non_technical_counts = sum(
        1 for user in users if "reading-non-technical" in user["learningApproaches9"]
    )
    video_counts = sum(1 for user in users if "video" in user["learningApproaches9"])
    art_counts = sum(1 for user in users if "art" in user["learningApproaches9"])

    counts = [technical_counts, non_technical_counts, video_counts, art_counts]

    # bar_labels = ["red", "blue", "_red", "orange"]
    # bar_colors = ["tab:red", "tab:blue", "tab:red", "tab:orange"]

    ax.bar(learning_methods, counts)

    # plt.xticks(rotation=45)

    ax.set_xticks(range(len(learning_methods)))
    ax.set_xticklabels(learning_methods)
    plt.setp(ax.get_xticklabels(), rotation=0)

    ax.set_ylabel("Count")
    ax.set_xlabel("Learning Method")
    ax.set_title("Preferred Learing Methods")
    # ax.legend(title="Targeted Ads")
