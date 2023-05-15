// This will be the object that will contain the Vue attributes
// and be used to initialize it.
let app = {};


// Given an empty app object, initializes it filling its attributes,
// creates a Vue instance, and then initializes the Vue instance.
let init = (app) => {
    

    
    // This is the Vue data.
    app.data = {
        is_coach: false,
        add_phone_number: "",
        add_state: "",
        add_city: "",
        add_about: ""
    };

    app.set_iscoach = function () {
        axios.get(get_iscoach_url).then(function (response) {
            app.vue.is_coach = response.data.is_coach;
        });
    }

    app.reset_form = function () {
        app.vue.add_phone_number = "";
        app.vue.add_state = "";
        app.vue.add_city = "";
        app.vue.add_about = "";
    }
    
    app.add_coach = function () {
        // This function takes the inputs from the from in html and adds them to the database
        axios.post(add_coach_url,
            {
                phone_number: app.vue.add_phone_number,
                state: app.vue.add_state,
                city: app.vue.add_city,
                about: app.vue.add_about
            }).then(function (response) {
                app.set_iscoach();
            });
        app.reset_form();
    }

    // This contains all the methods.
    app.methods = {
        // Complete as you see fit.
        add_coach: app.add_coach
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
        app.set_iscoach();
    };

    // Call to the initializer.
    app.init();
};

// This takes the (empty) app object, and initializes it,
// putting all the code i
init(app);
