import edgedb
import pandas as pd

from typing import List, Dict
from dataclasses import asdict

from helper import merge_survey_data

user_survey_state = ["finished", "only_part_1", "only_user"]

client = edgedb.create_async_client()


async def get_survey_data():
    """Function getting survey Data."""

    survey_data = await client.query(
        """
WITH user_scope := DETACHED default::User
SELECT user_scope {
    id,
    visitorId,
    createdAt,
    multi surveyPart1 := (
        WITH surveyPart1_scope := DETACHED default::SurveyPart1
        SELECT surveyPart1_scope {
            IAmTrackedKnowledge4,
            howDoAdvertisersKnow2,
            knowledgeHowTracking6,
            knowledgeTargetedAds3,
            numLastWeeksAds1,
            okToBeTracked5,
            trackingMethodsFamiliar7,
            createdAt,
            id
        }
        FILTER (user_scope = surveyPart1_scope.user)
    ),
    multi surveyPart2 := (
        WITH surveyPart2_scope := DETACHED default::SurveyPart2
        SELECT surveyPart2_scope {
            age10,
            interestInLearning8,
            learningApproaches9,
            work11,
            createdAt,
            pronouns12,
            id
        }
        FILTER (user_scope = surveyPart2_scope.user)
    ),
    multi fingerprint := (
        WITH fingerprint_scope := DETACHED default::Fingerprint
        SELECT fingerprint_scope {
            components,
            createdAt,
            id
        }
        FILTER (user_scope = fingerprint_scope.user)
  )
}
FILTER (user_scope.createdAt >= <std::datetime>'2024-12-14T00:00:00.000Z')
ORDER BY user_scope.createdAt
    """
    )

    await client.aclose()

    return survey_data


async def get_clean_survey_data():
    survey_data = await get_survey_data()

    users: List[Dict[str, str]] = []
    unfinished_users: List[Dict[str, str]] = []

    for user in survey_data:
        part1 = merge_survey_data(user.surveyPart1)
        part2 = merge_survey_data(user.surveyPart2)
        has_part1 = bool(part1.get("numLastWeeksAds1"))
        has_part2 = bool(part2.get("age10"))
        has_fingerprint = any(
            asdict(fingerprint).get(id) for fingerprint in user.fingerprint
        )

        survey_state = (
            user_survey_state[0]
            if has_part1 and has_part2
            else user_survey_state[1] if has_part1 else user_survey_state[2]
        )

        if survey_state != user_survey_state[0]:
            unfinished_users.append(
                {
                    "id": user.id,
                    "tracking_id": user.visitorId,
                    "created_at": user.createdAt,
                    "surveyState": survey_state,
                }
            )

        else:
            cleaned_user = {
                "id": user.id,
                "tracking_id": user.visitorId,
                "created_at": user.createdAt,
                "numLastWeeksAds1": part1.get("numLastWeeksAds1") or "",
                "howDoAdvertisersKnow2": part1.get("howDoAdvertisersKnow2") or "",
                "knowledgeTargetedAds3": part1.get("knowledgeTargetedAds3") or "",
                "IAmTrackedKnowledge4": part1.get("IAmTrackedKnowledge4") or "",
                "okToBeTracked5": part1.get("okToBeTracked5") or "",
                "knowledgeHowTracking6": part1.get("knowledgeHowTracking6") or "",
                "trackingMethodsFamiliar7": part1.get("trackingMethodsFamiliar7") or "",
                "interestInLearning8": part2.get("interestInLearning8") or "",
                "learningApproaches9": part2.get("learningApproaches9") or "",
                "age10": (
                    "26-40"
                    if part2.get("age10") == "25-40"
                    else part2.get("age10") or ""
                ),
                "work11": part2.get("work11") or "",
                "pronouns12": part2.get("pronouns12") or "",
                "allowedFingerprint": "yes" if has_fingerprint else "no",
                "surveyState": survey_state,
            }
            users.append(cleaned_user)

    return users


async def get_user_data_frame():
    cleaned_users = await get_clean_survey_data()

    df = pd.DataFrame(
        cleaned_users,
        columns=[
            "id",
            "tracking_id",
            "created_at",
            "numLastWeeksAds1",
            "howDoAdvertisersKnow2",
            "knowledgeTargetedAds3",
            "IAmTrackedKnowledge4",
            "okToBeTracked5",
            "knowledgeHowTracking6",
            "trackingMethodsFamiliar7",
            "interestInLearning8",
            "learningApproaches9",
            "age10",
            "work11",
            "pronouns12",
            "allowedFingerprint",
            "surveyState",
        ],
    )

    return df
