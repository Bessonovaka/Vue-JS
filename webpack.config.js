module.exports = {
    entry: 'script',
    output: {
      filename: 'build.js'
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 500,
        poll: 5000 // проверяем измемения раз в 5 секунд
    }
}