from typing import List, Dict


def create_comfort_level_plot(users: List[Dict[str, str]], plt):
    fig, ax = plt.subplots()

    comfort_level = ["1", "2", "3", "4", "5"]

    one_counts = sum(1 for user in users if user["okToBeTracked5"] == "1")
    two_counts = sum(1 for user in users if user["okToBeTracked5"] == "2")
    three_counts = sum(1 for user in users if user["okToBeTracked5"] == "3")
    four_counts = sum(1 for user in users if user["okToBeTracked5"] == "4")
    five_counts = sum(1 for user in users if user["okToBeTracked5"] == "5")

    counts = [one_counts, two_counts, three_counts, four_counts, five_counts]

    # bar_labels = ["red", "blue", "_red", "orange"]
    # bar_colors = ["tab:red", "tab:blue", "tab:red", "tab:orange"]

    ax.bar(comfort_level, counts)

    ax.set_ylabel("Count")
    ax.set_xlabel("Comfort Level from 1 (not comfortable) to 5 (comfortable)")
    ax.set_title("Comfort Level with Being Tracked")
    # ax.legend(title="Targeted Ads")


def get_count(answers: List[str]) -> List[int]:
    one_counts = sum(1 for answer in answers if answer == "1")
    two_counts = sum(1 for answer in answers if answer == "2")
    three_counts = sum(1 for answer in answers if answer == "3")
    four_counts = sum(1 for answer in answers if answer == "4")
    five_counts = sum(1 for answer in answers if answer == "5")

    counts = [one_counts, two_counts, three_counts, four_counts, five_counts]
    return counts


def create_comfort_level_by_age_plot(users: List[Dict[str, str]], plt):
    fig, ax = plt.subplots()

    age_groups = ["less-than-18", "18-25", "26-40", "more-than-40"]
    age_groups_labels = ["Less than 18", "18-25", "26-40", "More than 40"]
    comfort_levels = ["1", "2", "3", "4", "5"]

    for comfort_level in comfort_levels:
        counts = list(
            map(
                lambda age_group: sum(
                    1
                    for user in users
                    if user["age10"] == age_group
                    and user["okToBeTracked5"] == comfort_level
                ),
                age_groups,
            )
        )

        label = (
            "1 (not comfortable)"
            if comfort_level == "1"
            else "5 (comfortable)" if comfort_level == "5" else comfort_level
        )

        ax.bar(age_groups_labels, counts, label=label)

    ax.set_ylabel("Count")
    ax.set_xlabel("Age Groups")
    ax.set_title("Comfort Level with Being Tracked across Age Groups")
    ax.legend(title="Comfort Level")
