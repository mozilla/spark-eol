
# Sharing the Spark

# L10n: In the US, when the # sign precedes a number, it reads as "number". Example: Week #1 means "Week number 1". Just remove the # sign if this is not localizable in your language.
WEEK_NUMBER = _lazy(u'Week #%(num)d')
NUM_SHARES_PER_WEEK = _lazy(u'%(num)d shares')



# Around the Globe

EUROPE = _lazy(u'Europe')
AFRICA = _lazy(u'Africa')
NORTH_AMERICA = _lazy(u'North America')
SOUTH_AMERICA = _lazy(u'South America')
ASIA = _lazy(u'Asia')
# L10n: This refers to the Australian continent, not the country. Translate 'Oceania' instead if this is not applicable to your language.
AUSTRALIA = _lazy(u'Australia')
ANTARCTICA = _lazy(u'Antarctica')

# L10n: In the US, when the # sign precedes a number, it reads as "number". Example: #1 means "number 1". Just remove the # sign if this is not localizable in your language.
COUNTRY_NUMBER = _lazy(u'#%(num)d')



# Hall of Fame

# L10n: This is the content of tooltips when hovering rows of the leaderboard
LEADERBOARD_TOOLTIP = _lazy(u'%(username)s from %(city)s, %(country)s shared %(num_shares)d times and unlocked %(num_badges)d badges')

# L10n: Short description of any player level. Example: "Level 2"
LEVEL = _lazy(u'Level %(num)d')



# Social network messages

TWITTER = _lazy(u"#Spark Winners Announced! Check out the game's results and infographics")
FACEBOOK = _lazy(u"Want to learn more about Firefox for Android and the Spark game? Check out the game's results and infographics!")