import React from 'react'
import MUIDataTable, { TableFilterList } from "mui-datatables";

// const handleRowClick = (rowData, rowMeta) => {
//     console.log(rowData, rowMeta);
// };

const columns = [
    {
        name: "name",
        label: "Name",
        options:
        {
         filter: true,
         sort: true,
         filterType: 'multiselect'
        }
    },
    {
        name: "File",
        label: "File",
        options:
        {
         filter: true,
         sort: true,
         filterType: 'multiselect'
        }
    },
    {
        name: "type",
        label: "type",
        options:
        {
         filter: true,
         sort: true,
         filterType: 'checkbox'
        }
    },
    {
        name: "line",
        label: "#",
        options:
        {
         filter: false,
         sort: true,
        }
    },
    {
        name: "changed_lines",
        label: "changed",
        options:
        {
         filter: true,
         sort: true,
        }
    },
    {
        name: "total_lines",
        label: "total",
        options:
        {
         filter: false,
         sort: true,
        }
    },
    {
        name: "Ratio",
        label: "Ratio",
        options:
        {
         filter: false,
         sort: true,
        }
    }

    ];


    var tableOptions = {

        // selectableRows: 'multiple',
        selectableRowsOnClick: true,
        selectableRowsHideCheckboxes: true,
        denseTable: true,
        rowsPerPage: 50,
        rowsPerPageOptions: [50, 500, 1000],
        fixedHeader: {
          xAxis: true,
          yAxis: true
        },
        selectToolbarPlacement:"none",
        rowHover : true,

        setTableProps: () => (
            {
            padding: 'none',
              size:'small'
            }
          ),

    }


class DataEntry extends React.Component {
    constructor(props)
    {
        super(props)
        this.state=
        {
            FileName: props.FileName,
            Type: props.Type,
            LinesTotal: props.LinesTotal
        }
    }
}
class LocustSummaryTable extends React.Component
{
    constructor(props)
    {
    super(props)


    // console.log(props.data)
    }


    SelectionChangedCallback(props)
    {
        console.log('SelectionChangedCallback..',props)

        let arr = []
        if ( props.allRowsSelected.length > 0)
        {
            props.allRowsSelected.map((RowSelected, idx) => {
                arr.push(RowSelected.dataIndex)
            })
        }
        else
        {

            arr = []
        }

        this.setState(
            {
                CurrentRow: props.currentRowsSelected,
                RowsSelected: props.allRowsSelected
            })
        // console.log('SelectionChangedCallback:',arr)
        if(arr)
        {

        }

        // let ChangeList = this.state.changes
        // this.props.SelectionChanges({arr,ChangeList})

        let RowsSelected = props.allRowsSelected
        this.props.SelectionChangesCallback({RowsSelected})



    }


    render()
    {

        console.log('LocustSummaryTable.render()...')


        return (
            <div className="SummaryTable">
                <MUIDataTable
            key={"MUIDataTable"}
            title={"Changes"}
            data={this.props.Changes}
            columns={columns}
            options={{...tableOptions,
                onRowSelectionChange:(currentRowsSelected, allRowsSelected) =>
                {
                    this.SelectionChangedCallback({currentRowsSelected,allRowsSelected})
                },
                
            }}

            />
            </div>
        )
    }

} export default LocustSummaryTable