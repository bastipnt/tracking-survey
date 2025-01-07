from datetime import date
from dataclasses import dataclass, asdict
from typing import Dict, List, Union


@dataclass
class SurveyPart:
    data: Dict[str, Union[str, List[str]]]


def merge_survey_data(survey_parts: List[SurveyPart]) -> Dict[str, str]:
    merged_survey: Dict[str, str] = {}

    for part in survey_parts:
        current_part = asdict(part)
        for key, value in current_part.items():
            current_value = (
                "; ".join(value)
                if isinstance(value, list)
                else (value.isoformat() if isinstance(value, date) else value or "")
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
