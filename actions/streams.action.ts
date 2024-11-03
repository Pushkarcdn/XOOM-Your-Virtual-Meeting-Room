'use server';

import { currentUser } from '@clerk/nextjs/server';
import { StreamClient } from '@stream-io/node-sdk';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
    const user = await currentUser();

    if (!user) throw new Error('User not logged in');
    if (!apiKey) throw new Error('Stream API key is required');
    if (!apiSecret) throw new Error('Stream secret key is required');

    const client = new StreamClient(apiKey, apiSecret);

    // const exp = Math.round(new Date().getTime() / 1000) + 3600;
    // const issued = Math.floor(Date.now() / 1000) - 60;

    const token = client.generateUserToken({
        user_id: user.id,
        validity_in_seconds: 3600,
    });

    return token;
};
