
var express = require('express');
module.exports = function(app, api){

var router = express.Router();
    router.post('/', function (req, res) {
        return api.searchTracks(req.body.stringToSearch)
        .then(function(data) {
            console.log('I got ' + data.body.tracks.total + ' results!');
            // Go through the first page of results
            var firstPage = data.body.tracks.items;
            var it=[];
                firstPage.forEach(function(track, index) {
                    console.log(index + ': ' + track.name + ' (' + track.popularity + ')');
                    it.push(track.name);
                })
            res.render('search.pug',{items:firstPage})
        })
        .catch(function(err) {
            console.log('Something went wrong:', err.message);
        });
    })

        
    router.get('/', function (req, res) {
        res.render('search.pug',{});
    })
return router;
};
