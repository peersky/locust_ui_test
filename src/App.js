import data from './locust.json'
import './Content.js'

import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge'
import './App.css';
import CodeWidget from './Codewidget.js'
import LocustSummaryTable from './Content.js'
import SplitPane, { Pane } from 'react-split-pane';
import './resizer.css'


function PullHeader(props)
{
  return (
    <div className="SummaryTable">
      <Table striped bordered hover>
      <tbody>
        <tr>
          <td>Initial</td>
          <td>{props.initial}</td>
        </tr>
        <tr>
          <td>Terminal</td>
          <td>{props.terminal}</td>
        </tr>
        <tr>
          <td>Total changed lines</td>
          <td>{props.lines_changed}</td>
        </tr>
        <tr>
          <td>Files changed</td>
          <td>{props.files_changed}</td>
        </tr>
      </tbody>

    </Table>

  </div>
  )
}

class App extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      Changes: [],
      RowsSelected: [],
      RowxSelected: []
    }
    this.SetSelectedRows = this.SetSelectedRows.bind(this)
    this.renderControls = this.renderControls.bind(this)
    this.renderCodeWindow = this.renderCodeWindow.bind(this)
    this.removeSelection = this.removeSelection.bind(this)


    data.locust.map((entry, idx) => {
      let file = entry.file
      entry.changes.map((change,idx) => {
          this.getchange({change,file})
      })

    })

  }

  getchange(props)
  {

      let file = props.file
          if(props.change.children.length>0)
          {
              props.change.children.map((change,idx) => {
                  this.getchange({change,file})
              })
          }

      let ratio = parseInt(props.change.changed_lines) / parseInt(props.change.total_lines)
      let obj = {File: props.file, ...props.change, Ratio: ratio.toFixed(2)}
      this.state.Changes.push(obj);
  }


  removeSelection(index) {
    console.log('removeselection...',index)

    let idx_to_remove
    this.state.RowsSelected.map((ActiveRow,idx) => {
      if (ActiveRow.dataIndex==index)
      {
        idx_to_remove = idx
      }
    })

    const RowsSelected = this.state.RowsSelected;

    RowsSelected.splice(idx_to_remove, 1);
    this.setState({ RowsSelected:RowsSelected });

  }


  //Callback from table row selection change
  SetSelectedRows(props)
  {
    console.log("App.GetSelectedRows...")
    {
      this.setState({

        RowsSelected: props.RowsSelected
      })
    }

  }

  renderControls(props)
  {
    console.log('renderControls')

    let RowsSelectedIdxs = ['0']
    this.state.RowsSelected.map((RowSelected,idx) => {
      RowsSelectedIdxs.push(RowSelected.dataIndex)
    })
    console.log('RowsSelectedIdxs:',RowsSelectedIdxs)
    return (
      <div className="Controls">
        <Card>
          <Card.Header>
            <PullHeader files_changed={data.locust.length}
                              initial={data.refs.initial}
                              terminal={data.refs.terminal}
                              lines_changed='ToDo'/>
          </Card.Header>


             <LocustSummaryTable  Changes={this.state.Changes}
              SelectionChangesCallback={this.SetSelectedRows}
              RowsSelected={this.state.RowsSelected}
              RowsSelectedIdxs={this.state.RowsSelectedIdxs}
              />

        </Card>

      </div>
    )
  }


  renderCodeWindow(props)
  {
    console.log('App.renderCodeWindow...')

    let x = ''
    x = this.state.RowsSelected.map((RowSelected, idx) => {
    {
      return (
        <Card key={RowSelected.dataIndex} > <Card.Header>
            {this.state.Changes[RowSelected.dataIndex].name}
            {' @ '}
            {this.state.Changes[RowSelected.dataIndex].File}
            {'   '}
            <Button onClick={() => this.removeSelection({idx})} size="sm" color="black">X</Button>
        <CodeWidget key={RowSelected.dataIndex}
        Change={this.state.Changes[RowSelected.dataIndex]} show={true} id={idx}/>
        </Card.Header>
        </Card>)
    }

    })

    if(x!='')
    {
      return (
        <div className="Code">
           {x}
        </div>
      )
    }
    else
    {
      return (
        <div className="Code">
          &lt;-- Drag this line to resize
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          &lt;-- Select rows at overview section to see code here <br/>
        </div>
      )

    }


  }
  render() {


    console.log(".................App.Render()......................")
  return (
    <div id="App" className="#App">

  <SplitPane split="vertical" minSize={"50vw"}>
          <Pane className='Pane' initialSize="500px"> <this.renderControls/></Pane>
          <Pane className='Pane' initialSize="500px"> <this.renderCodeWindow/></Pane>

    </SplitPane>




   </div>

   );
  }
} export default App




