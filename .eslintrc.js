module.exports = {
    root: true,
    env: {
        node: true
    },
    rules: {
        //强制使用单引号
        quotes: ['error', 'single'],
        //强制不使用分号结尾
        semi: ['error', 'always'],
        'indent': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
        warnOnUnsupportedTypeScriptVersion: false
    }
};
