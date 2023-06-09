// This will be the object that will contain the Vue attributes
// and be used to initialize it.
let app = {};


// Given an empty app object, initializes it filling its attributes,
// creates a Vue instance, and then initializes the Vue instance.
let init = (app) => {
    

    
    // This is the Vue data.
    app.data = {
        is_stringer: false,
        add_phone_number: "",
        add_state: "",
        add_city: "",
        add_about: "",
        add_experience: "",
        add_price: "",
        add_turnover: ""
    };

    app.set_isstringer = function () {
        axios.get(get_isstringer_url).then(function (response) {
            app.vue.is_stringer = response.data.is_stringer;
        });
    };

    app.reset_form = function () {
        app.vue.add_phone_number = "";
        app.vue.add_state = "";
        app.vue.add_city = "";
        app.vue.add_about = "";
        app.vue.add_experience = "";
        add_price = "";
        add_turnover = "";
    };

    app.add_stringer = function () {
        axios.post(add_stringer_url, {
            phone_number: app.vue.add_phone_number,
            state: app.vue.add_state,
            city: app.vue.add_city,
            about: app.vue.add_about,
            experience: app.vue.add_experience,
            price: app.vue.add_price,
            turnover: app.vue.add_turnover
        }).then(function (response) {
            app.set_isstringer();
            app.reset_form();
        }).catch(function (error) {
            console.log(error);
        });
    };

    // This contains all the methods.
    app.methods = {
        // Complete as you see fit.
        add_stringer: app.add_stringer
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
        app.set_isstringer();
    };

    // Call to the initializer.
    app.init();
};

// This takes the (empty) app object, and initializes it,
// putting all the code i
init(app);
