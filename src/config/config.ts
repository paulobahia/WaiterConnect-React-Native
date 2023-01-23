const defaultSettings = {
    DEV: 'http://localhost:3000',
    PRODUCTION: 'https://example.com',
};
const settings = { defaultSettings, ...process.env };
export default settings;