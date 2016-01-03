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
            <div className="app-box row">
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

var TableBox = React.createClass({
    render: function() {
        var data = (this.props.data === undefined) ? [] : this.props.data;
        var rowsAndHeaders = getRowsAndHeaders(data)
        var headers = rowsAndHeaders.headers
        var rows = rowsAndHeaders.rows
        return (
            <table className="table-box table">
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