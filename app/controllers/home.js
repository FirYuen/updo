var express = require('express'),
  router = express.Router(),
  fs = require('fs'),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

var file_info = [];
var file_ary = [];
var file_count = 0;
var file_path = "freedom/upload/";

function get_fileinfo(file_path) {
	// body...
	file_info = [];
	file_ary = fs.readdirSync(file_path);
	file_count = file_ary.length;
	for (var i = 0; i < file_count; i++) {
		ele_info = fs.statSync(file_path+file_ary[i]);
		file_info[i] = {
			file_name: file_ary[i],
			file_size: ele_info.size,
			file_latest_ch: ele_info.ctime.toString()
		};
	}
}

router.get('/',function (req, res, next) {
	// body...
	res.redirect('/index.html');

});

router.get('/index',function (req, res, next) {
	// body...
	res.redirect('/index.html');
});


router.get('/index.html', function (req, res, next) {
	get_fileinfo(file_path);
	res.render('pages/index', {
		file_info: file_info
	});
});
