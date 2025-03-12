from datetime import date
from dataclasses import dataclass, asdict
from typing import Dict, List, Union, NewType

Answer = NewType("Answer", Union[str, List[str]])
User = NewType("User", Dict[str, Answer])

Counts = NewType("Counts", Dict[str, Dict[str, int]])


@dataclass
class SurveyPart:
    data: Dict[str, Answer]


def merge_survey_data(survey_parts: List[SurveyPart]) -> Dict[str, str]:
    merged_survey: Dict[str, str] = {}

    for part in survey_parts:
        current_part = asdict(part)
        for key, value in current_part.items():
            current_value = (
                # "; ".join(value)
                value
                if isinstance(value, list)
                else (
                    value.isoformat()
                    if isinstance(value, date)
                    else value or "no answer"
                )
            )

            if key not in merged_survey:
                merged_survey[key] = current_value
            elif (
                isinstance(merged_survey[key], str)
                and len(merged_survey[key]) == 0
                and len(current_value) > 0
            ):
                merged_survey[key] = current_value

    return merged_survey


def get_all_counts(users: List[User]) -> Counts:
    counts: Counts = {}

    for user in users:
        for field, answer in user.items():
            if field not in ["id", "tracking_id", "created_at"]:
                answer = answer.split("; ")
                if field in counts:
                    for val in answer:
                        val = "no answer" if val == "" else val
                        counts[field][val] = (
                            val in counts[field] and counts[field][val] + 1 or 1
                        )
                else:
                    counts[field] = {}
                    for val in answer:
                        val = "no answer" if val == "" else val
                        counts[field][val] = 1

    return counts


def print_all_counts(users: List[User]):
    counts = get_all_counts(users)
    total = len(users)

    for field, answers in counts.items():
        print(f"{field}:")

        for answer, count in answers.items():
            percentage = round(count / total * 100, 2)
            print(f"{answer}: {percentage}")

        print("\n")
