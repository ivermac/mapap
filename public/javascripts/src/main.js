var AppBox = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState({data: data.records});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="row">
                <div className="col-md-12">
                    { <TableBox data={this.state.data}/> }
                </div>
            </div>
        );
    }
});

var getRowsAndHeaders = function(data){
    var rowsAndHeaders = { 'headers': [], 'rows': []}
    if (data.length !== 0) {
        rowsAndHeaders.headers = data[0]
        rowsAndHeaders.rows = data.splice(1)
    }

    return rowsAndHeaders
}

var resizeCellValue = function(value) {
    var maxLength = 10;

    if (value.length > maxLength)
        return value.slice(0, maxLength) + "..."

    return value
}

var arrayFilter = function(value, index) {
    /*
    return a list without the following
    1. IMAGE_URL
    2. GALLERY_URL
    8. PHOTO_CREDIT
    9. PUBLISHER
    */
    return ($.inArray( index, [ 1, 2, 8, 9 ] ) === -1)
}

var TableBox = React.createClass({
    render: function() {
        var data = (this.props.data === undefined) ? [] : this.props.data,
            rowsAndHeaders = getRowsAndHeaders(data),
            headers = rowsAndHeaders.headers.filter(arrayFilter),
            filterStuff = headers,
            rows = rowsAndHeaders.rows;
        return (
            <table className="table">
                {<TableHeaderBox headers={headers}/>}
                { <TableBodyBox rows={rows}/> }
            </table>
        );
    }
})

var TableHeaderBox = React.createClass({
    render: function(){
        var headerRow = this.props.headers.map(function(header, id){
            return <th key={id}>{header}</th>;
        })
        return (
            <thead>
                <tr>{headerRow}</tr>
            </thead>
        )
    }
})

var TableBodyBox = React.createClass({
    render: function(){
        var bodyRow = this.props.rows.map(function(row, id){
            row = row.filter(arrayFilter)
            return <TableRowBox key={id} row={row}/>
        })
        return (
            <tbody>{bodyRow}</tbody>
        )
    }
})

var TableRowBox = React.createClass({
    render: function(){
        var rowCell = this.props.row.map(function(value, id){
            return <td key={id}>{resizeCellValue(value)}</td>;
        })
        return (
            <tr>{rowCell}</tr>
        )
    }
})

ReactDOM.render(
  <AppBox url="/data"/>,
  document.getElementById('container')
);