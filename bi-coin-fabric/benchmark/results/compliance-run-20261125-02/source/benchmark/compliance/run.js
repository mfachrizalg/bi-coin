'use strict';

const { main } = require('./runner');

main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
});
