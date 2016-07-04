exports.index = function(req, res) {
    res.render('pages/index.ejs');
};

exports.private = function(req, res) {
    res.render('pages/private.ejs');
};