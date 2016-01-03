var AppBox = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    getPopup: function(point) {
        // TODO: set the size of the popup container
        var popup = '<div class="popup">';
        if (point.image) {
            popup += '<img src="' + point.image + '" /><br><p>' + point.name + '</p>'
        } else {
            popup += point.name;
        }
        popup += '</div>'
        return popup;
    },
    renderMap: function(points) {
        var map = L.map('map').setView([10.3058, 19.82082], 3),
            mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>',
            marker, popup, point;

        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
        }).addTo(map);

        for (var i = 0; i < points.length; i++) {
            point = {
                latitude: points[i][5],
                longitude: points[i][6],
                name: points[i][0],
                image: points[i][1],
            }
            if (i === 0 || isNaN(parseFloat(point.latitude)) || isNaN(parseFloat(point.longitude))) {
                continue;
            } else {
                popup = this.getPopup(point);
                marker = new L.marker([point.latitude,point.longitude])
                    .bindPopup(popup)
                    .addTo(map);
            }

        }
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data.records});
                this.renderMap(this.state.data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div id="map"></div>
        );
    }
});

ReactDOM.render(
  <AppBox url="/data"/>,
  document.getElementById('map-container')
);