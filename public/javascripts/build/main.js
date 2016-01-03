var AppBox = React.createClass({
    displayName: "AppBox",

    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: (function (data) {
                this.setState({ data: data.records });
            }).bind(this),
            error: (function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }).bind(this)
        });
    },
    render: function () {
        return React.createElement(
            "div",
            { className: "app-box row" },
            React.createElement(
                "div",
                { className: "col-md-12" },
                React.createElement(TableBox, { data: this.state.data })
            )
        );
    }
});

var getRowsAndHeaders = function (data) {
    var rowsAndHeaders = { 'headers': [], 'rows': [] };
    if (data.length !== 0) {
        rowsAndHeaders.headers = data[0];
        rowsAndHeaders.rows = data.splice(1);
    }

    return rowsAndHeaders;
};

var resizeCellValue = function (value) {
    var maxLength = 10;

    if (value.length > maxLength) return value.slice(0, maxLength) + "...";

    return value;
};

var TableBox = React.createClass({
    displayName: "TableBox",

    render: function () {
        var data = this.props.data === undefined ? [] : this.props.data;
        var rowsAndHeaders = getRowsAndHeaders(data);
        var headers = rowsAndHeaders.headers;
        var rows = rowsAndHeaders.rows;
        return React.createElement(
            "table",
            { className: "table-box table" },
            React.createElement(TableHeaderBox, { headers: headers }),
            React.createElement(TableBodyBox, { rows: rows })
        );
    }
});

var TableHeaderBox = React.createClass({
    displayName: "TableHeaderBox",

    render: function () {
        var headerRow = this.props.headers.map(function (header, id) {
            return React.createElement(
                "th",
                { key: id },
                header
            );
        });
        return React.createElement(
            "thead",
            null,
            React.createElement(
                "tr",
                null,
                headerRow
            )
        );
    }
});

var TableBodyBox = React.createClass({
    displayName: "TableBodyBox",

    render: function () {
        var bodyRow = this.props.rows.map(function (row, id) {
            return React.createElement(TableRowBox, { key: id, row: row });
        });
        return React.createElement(
            "tbody",
            null,
            bodyRow
        );
    }
});

var TableRowBox = React.createClass({
    displayName: "TableRowBox",

    render: function () {
        var rowCell = this.props.row.map(function (value, id) {
            return React.createElement(
                "td",
                { key: id },
                resizeCellValue(value)
            );
        });
        return React.createElement(
            "tr",
            null,
            rowCell
        );
    }
});

ReactDOM.render(React.createElement(AppBox, { url: "/data" }), document.getElementById('container'));