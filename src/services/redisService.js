import { createClient } from 'redis';

export const insertFeedback = async (req) => { 
    console.log(`inserting feedback to redis for ${req.walletAddress}...`);

    const client = createClient({
        url: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD
    });

    const key = `${req.walletAddress}-${Math.floor(new Date().getTime() / 1000)}`;
    const value = {
        walletAddress: req.walletAddress,
        txHash: req.txHash,
        tigerId: req.tigerId,
        is3DTo2DTransformation: req.is3DTo2DTransformation,
        exception: req.exception,
    }

    await client.connect();
    try { 
        await client.set(key, JSON.stringify(value));
    } catch (ex) { 
        console.error(`error inserting feedback into redis: ${ex}`);
    }
    await client.disconnect();

    console.log(`feedback insert completed!`);
};