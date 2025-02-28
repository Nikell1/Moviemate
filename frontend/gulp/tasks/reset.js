import pkg from 'del';

export const reset = () => {
    return pkg(app.path.clean);
};