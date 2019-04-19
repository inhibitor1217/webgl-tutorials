export default (
    () => {
        const st: {[key: string]: string} = window.localStorage || {};
        return {
            set: (key: string, object: any): void => {
                st[key] = (typeof object) === 'string' ? object : JSON.stringify(object);
            },
            get: (key: string): any => {
                const value = st[key];
                if (!value)
                    return null;
                try {
                    const object = JSON.parse(value);
                    return object;
                } catch(e) {
                    return value;
                }
            },
            remove: (key: string): void => {
                if (window.localStorage)
                    window.localStorage.removeItem(key);
                else
                    delete st[key];
            }
        }
    }
)();