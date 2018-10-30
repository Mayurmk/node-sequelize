const express = require('express');
const expressJWT = require('express-jwt');
const config = require('../config/index');
const userRoutes = require('../routes/user.routes');
const authRoutes = require('../components/auth/auth.route');
const brandRoutes = require('../routes/brand.routes');
const categoryRoutes = require('../routes/category.routes');
const productRoutes = require('../routes/product.routes');
const swaggerDocument = require('../swagger/swagger');
const swaggerUI = require('swagger-ui-express');
// All the routes are defined here.

const router = express.Router();

router.use('/auth', authRoutes);

router.use('/api-paths', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Load Product Routes
router.use('/product', productRoutes);

// Validating all the apis with JWT TOKEN except some routes.
router.use(expressJWT({secret: config.jwtSecret}).unless({
    path: [
        'api/product/feature/6'
    ]
}));

// If jwt is valid, storing user data in local session.
router.use((req, res, next) => {
    const authorization = req.header('Authorization');
    if ((authorization === undefined)) {
        next();
    } else {
        res.locals.session = JSON.parse(Buffer.from((authorization.split(' ')[1]).split('.')[1], 'base64').toString()); // eslint-disable-line no-param-reassign
        next();
    }
});

// Load User Routes
router.use('/users', userRoutes);

// Load brand Routes
router.use('/brand', brandRoutes);

// Load Category Routes
router.use('/category', categoryRoutes);

module.exports = router;


