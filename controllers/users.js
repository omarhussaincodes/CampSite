const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to CampSite!');
            res.redirect('/campgrounds');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
};

module.exports.login = (req, res) => {
    req.flash('success', `Welcome back! ${req.body.username}`);
    const redirectToUrl = req.session.returnToUrl || '/campgrounds';
    delete req.session.returnToUrl;
    res.redirect(redirectToUrl);
}

module.exports.logout = (req, res) => {
    req.logOut();
    req.flash('success', 'Goodbye! See you soon.');
    res.redirect('/campgrounds');
}