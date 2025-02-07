/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useUser } from '@clerk/nextjs';
import Loader from '@/components/Loader';
import { useEffect, useState } from 'react';
import { tokenProvider } from '@/actions/streams.action';
import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export const StreamVideoProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [videoClient, setVideoClient] = useState<StreamVideoClient>();

    const { user, isLoaded } = useUser() as any;

    useEffect(() => {
        if (!user || !isLoaded) return;
        if (!apiKey) throw new Error('Stream API key is required');

        const client = new StreamVideoClient({
            apiKey,
            user: {
                id: user?.id,
                name: user?.username || user?.id,
                image: user?.imageUrl,
            },
            tokenProvider,
        });
        setVideoClient(client);
    }, [user, isLoaded]);

    if (!videoClient) return <Loader />;

    return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
