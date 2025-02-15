from typing import List, Dict
from helper import print_all_counts


def print_info(users: List[Dict[str, str]]):
    num_of_users = len(users)

    print("Num of users:", num_of_users, "\n")
    print_all_counts(users)
