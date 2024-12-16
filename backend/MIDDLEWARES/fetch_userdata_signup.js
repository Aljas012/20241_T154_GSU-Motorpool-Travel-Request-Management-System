async function getUserData(access_token) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // Timeout after 5 seconds

    try {
        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`, {
            signal: controller.signal,
        });
        clearTimeout(timeout);

        const data = await response.json();
        console.log('Data returned from Google:', data);

        if (!data || !data.sub || !data.email || !data.name) {
            throw new Error('Invalid user data returned from Google');
        }

        return {
            id: data.sub,
            email: data.email,
            name: data.name,
        };
    } catch (error) {
        console.log('Error fetching user data:', error);
        throw new Error('Failed to fetch user data');
    }
}

module.exports = {getUserData}