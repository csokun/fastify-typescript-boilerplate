import * as uuid from 'uuid';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const genReqId = (req): string => {
    const correlatonId = req.headers['x-correaltionid']
        || req.headers['x-correlation-id']
        || req.headers['request-id']
        || uuid.v4();

    return correlatonId;
}