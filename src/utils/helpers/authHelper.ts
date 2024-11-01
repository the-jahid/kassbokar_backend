export const createAuthData = (authType: string, isAuth: boolean, oauthId:string, ) => {
    if (authType === 'PASSWORD' && isAuth) {
        return {
            create: {
               // it can be add on future
            }
        };
    } else if (authType === 'OAUTH' && isAuth) {
        return {
            create: {
                oauthId: oauthId,
                
            }
        };
    } else {
        return {};
    }
};