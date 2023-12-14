import { createClient } from 'redis';

export const insertSuccessfulTransaction = async (req) => { 
    console.log(`inserting success into redis for ${req.walletAddress}...`);

    const client = createClient({
        url: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD
    });

    const key = `success-${Math.floor(new Date().getTime() / 1000)}`;
    const value = {
        browserInfo: req.browserInfo,
        walletAddress: req.walletAddress,
        txHash: req.txHash,
        tigerId: req.tigerId,
        is3DTo2DTransformation: req.is3DTo2DTransformation,
    }

    await client.connect();
    try { 
        await client.set(key, JSON.stringify(value));
    } catch (ex) { 
        console.error(`error inserting success msg into redis: ${ex}`);
    }
    await client.disconnect();

    console.log(`success insert completed!`);
};


export const insertErrorTransaction = async (req) => { 
    console.log(`inserting error into redis for ${req.walletAddress}...`);

    const client = createClient({
        url: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD
    });

    const key = `error-${Math.floor(new Date().getTime() / 1000)}`;
    const value = {
        walletAddress: req.walletAddress,
        txHash: req.txHash,
        tigerId: req.tigerId,
        is3DTo2DTransformation: req.is3DTo2DTransformation,
        error: req.error,
    }

    await client.connect();
    try { 
        await client.set(key, JSON.stringify(value));
    } catch (ex) { 
        console.error(`error inserting error msg into redis: ${ex}`);
    }
    await client.disconnect();

    console.log(`error insert completed!`);
};