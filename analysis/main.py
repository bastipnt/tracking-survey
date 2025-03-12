import asyncio
from survey import get_user_data_frame
from plot_comfort_level_being_tracked import (
    create_comfort_level_plot,
    create_comfort_level_by_age_plot,
)
from plot_freqTargetedAds import create_freq_plot
from plot_learing_methods import create_learning_methods_plot


async def main():
    users = await get_user_data_frame()

    create_comfort_level_plot(users)
    create_comfort_level_by_age_plot(users)
    create_freq_plot(users)
    create_learning_methods_plot(users)

    # print_info(users, unfinished_users)

    # plt.show()


asyncio.run(main())
