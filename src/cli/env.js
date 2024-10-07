const parseEnv = () => {
    // get all environment variables
    const variables = process.env;

    // filtering variables with 'RSS_' prefix
    const rss_variables = Object.entries(variables)
        .filter(([key]) => key.startsWith('RSS_'))
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');

    // checking is there variables with 'RSS_'
    if (rss_variables) {
        console.log(rss_variables);
    } else {
        console.log('No RSS_ variables');
    }
};

parseEnv();
