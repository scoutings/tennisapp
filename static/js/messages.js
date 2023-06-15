// and be used to initialize it.
let app = {};


// Given an empty app object, initializes it filling its attributes,
// creates a Vue instance, and then initializes the Vue instance.
let init = (app) => {
    
    // This is the Vue data.
    app.data = {
        sugar: Sugar,
        messages: [],
        selected: 0
    };

    app.enumerate = (a) => {
        // This adds an _idx field to each element of the array.
        let k = 0;
        a.map((e) => {e._idx = k++; e.draft = ""; e.num_stars = 0; e.num_stars_display = 0;});
        return a;
    };

    app.get_messages = function () {
        axios.get(get_messages_url).then(function (response) {
            app.vue.messages = app.enumerate(response.data.messages);
        }).then(function () {
            for (let m of app.vue.messages) {
                axios.get(get_rating_url, { params: {receiver: m.uid} })
                    .then(function (result) {
                        m.num_stars = result.data.rating;
                        m.num_stars_display = result.data.rating;
                    });
            };
        });
    };

    app.send_message = function() {
        axios.post(send_message_url, {
            to: app.vue.messages[app.vue.selected].uid,
            message: app.vue.messages[app.vue.selected].draft
        }).then(function () {
            app.vue.messages[app.vue.selected].draft = "";
            app.get_messages();
            app.vue.selected = 0;
        });
    };

    app.select = function (row_id) {
        app.vue.selected = row_id;
    };

    app.stars_over = function (num_stars) {
        app.vue.messages[app.vue.selected].num_stars_display = num_stars;
    };

    app.stars_out = function () {
        app.vue.messages[app.vue.selected].num_stars_display = app.vue.messages[app.vue.selected].num_stars;
    };

    app.set_stars = function (num_stars) {
        app.vue.messages[app.vue.selected].num_stars = num_stars;
        axios.post(set_rating_url, {receiver: app.vue.messages[app.vue.selected].uid, rating: num_stars});
    };

    // This contains all the methods.
    app.methods = {
        // Complete as you see fit.
        send: app.send_message,
        select: app.select,
        stars_over: app.stars_over,
        stars_out: app.stars_out,
        set_stars: app.set_stars
    };

    // This creates the Vue instance.
    app.vue = new Vue({
        el: '#vue-target',
        data: app.data,
        methods: app.methods
    });

    // And this initializes it.
    app.init = () => {
        // Put here any initialization code.
        // Typically this is a server GET call to load the data.
        app.get_messages();
    };

    // Call to the initializer.
    app.init();
};

// This takes the (empty) app object, and initializes it,
// putting all the code i
init(app);
