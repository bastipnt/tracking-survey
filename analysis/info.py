from typing import List, Dict
from helper import get_counts, print_percentages, print_all_counts


def print_info(users: List[Dict[str, str]]):
    num_of_users = len(users)
    # pronouns = {
    #     "She/her": 0,
    #     "He/him": 0,
    #     "They/them": 0,
    #     "Other": 0,
    #     "PreferNotToSay": 0,
    # }

    # occupations = {"student": 0, "working": 0, "school": 0, "other": 0}

    pronouns = get_counts(users, "pronouns12")
    occupations = get_counts(users, "work11")
    num_targeted_ads = get_counts(users, "numLastWeeksAds1")
    knows_being_tracked = get_counts(users, "IAmTrackedKnowledge4")
    comfort_levels = get_counts(users, "okToBeTracked5")

    print("Num of users:", num_of_users)

    print("\n")

    print_all_counts(users)

    # print("Pronouns:")
    # print_percentages(pronouns, num_of_users)

    # print("\n")

    # print("Occupation:")
    # print_percentages(occupations, num_of_users)

    # print("\n")

    # print("Num targeted ads")
    # print_percentages(num_targeted_ads, num_of_users)

    # print("\n")

    # print("Knows being tracked:")
    # print_percentages(knows_being_tracked, num_of_users)

    # print("\n")

    # print("Comfort Levels:")
    # print_percentages(comfort_levels, num_of_users)


# TODO knowledge tracking methods
