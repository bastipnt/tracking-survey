import asyncio
from typing import List, Dict
from dataclasses import asdict
import matplotlib.pyplot as plt
from survey import get_survey_data
from helper import merge_survey_data
from plot_freqTargetedAds import create_freq_plot
from plot_comfort_level_being_tracked import (
    create_comfort_level_plot,
    create_comfort_level_by_age_plot,
)
from plot_learing_methods import create_learning_methods_plot

# asyncio.run(get_survey_data())


async def main():
    survey_data = await get_survey_data()

    # print(asdict(survey_data[0].surveyPart1[0]))

    users: List[Dict[str, str]] = []

    for user in survey_data:
        part1 = merge_survey_data(user.surveyPart1)
        part2 = merge_survey_data(user.surveyPart2)
        has_fingerprint = any(
            asdict(fingerprint).get(id) for fingerprint in user.fingerprint
        )

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
                "26-40" if part2.get("age10") == "25-40" else part2.get("age10") or ""
            ),
            "work11": part2.get("work11") or "",
            "pronouns12": part2.get("pronouns12") or "",
            "allowedFingerprint": "yes" if has_fingerprint else "no",
        }
        users.append(cleaned_user)

    # print(users)
    create_freq_plot(users, plt)
    create_comfort_level_plot(users, plt)
    create_comfort_level_by_age_plot(users, plt)
    create_learning_methods_plot(users, plt)

    plt.show()


asyncio.run(main())
