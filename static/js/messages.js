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
        a.map((e) => {e._idx = k++; e.draft = ""});
        return a;
    };

    app.get_messages = function () {
        axios.get(get_messages_url).then(function (response) {
            app.vue.messages = app.enumerate(response.data.messages);
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

    // This contains all the methods.
    app.methods = {
        // Complete as you see fit.
        send: app.send_message,
        select: app.select
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
