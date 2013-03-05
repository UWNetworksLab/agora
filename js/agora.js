// maybe throw away


window.Agora = {
    Models: {},
    Collections: {},
    Views: {},
    Router: {}
};

// Template helper method
// Allows templates to be compiled by simply calling template(id)
window.template = function(id) {
    return _.template( $('#' + id).html() );
};

// Custom PubSub event listener
window.vent = _.extend({}, Backbone.Events);