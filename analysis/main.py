import asyncio
from survey import get_user_data_frame, get_clean_survey_data
from plot_comfort_level_being_tracked import (
    create_comfort_level_plot,
    create_comfort_level_by_age_plot,
)
from plot_freqTargetedAds import create_freq_plot
from plot_learing_methods import create_learning_methods_plot
from info import print_info


async def main():
    [cleaned_users, unfinished_users] = await get_clean_survey_data()
    users = get_user_data_frame(cleaned_users)

    create_comfort_level_plot(users)
    create_comfort_level_by_age_plot(users)
    create_freq_plot(users)
    create_learning_methods_plot(users)

    print_info(cleaned_users, unfinished_users)


asyncio.run(main())
