import edgedb

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
