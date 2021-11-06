const router = rootRequire('app/router.js');
const { renderTemplate } = rootRequire('app/utils.js');

router.get('/', (ctx) => (ctx.body = renderTemplate('index')));
