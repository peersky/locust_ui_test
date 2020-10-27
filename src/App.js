import data from './locust.json'

import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge'
import './App.css';

// class PullRequest extends React.Component
// {
//   constructor(props)
//   {
//     super(props)
//     this.state = {
//       refs: '',
//       Locust

//     }
//   }
// }

function ChangeChildren(props)
{
  return (
    <div className="ChangeChild">
x
    </div>
  )
}

function Change(props)
{
  var Childrens
  var AccCollapse
    if (props.change.children.length > 0)
    {
      Childrens = () => (
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
        Children: {props.change.children.length} {' '}
        </Accordion.Toggle>
      )
      AccCollapse = () => (
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            {
              props.change.children.map((children, idx) => {
                return (
                    <Change key={idx} change={children}/>
                )})
            }
          </Card.Body>
        </Accordion.Collapse>
      )
    }
    else
    {
      Childrens = () => "Children: None"
      AccCollapse = () => ""
    }


    console.log(Childrens)

    var type

  return (
    <div className="Change">
      <Accordion>
<Card>
  <Card.Header>
       <Badge variant="primary">{props.change.type}</Badge> {" "}
       <Badge variant="secondary">{props.change.name}</Badge>{" "}
       <Badge variant="info">#{props.change.line} {" "}</Badge>{" "}
       <Button href={props.change.link} size="sm" color="black">Show</Button> <br/>
      Changed Lines: {props.change.changed_lines} {" "}
      Total Lines: {props.change.total_lines} <br/>
      <Childrens/>
  </Card.Header>
      <AccCollapse/>
      </Card>
    </Accordion>
      {/* <Accordion><Card><Card.Header>

      <Accordion.Toggle as={Button} variant="link" eventKey="0">
      type: {props.change.type} name: {props.change.name} {">"} #{props.change.line} <br/>
      Changed Lines: {props.change.changed_lines} {" "}
      Total Lines: {props.change.total_lines}
      </Accordion.Toggle></Card.Header></Card>
      <Accordion.Collapse eventKey="0">
        {/* <Change key={idx} change={change}/>
      </Accordion.Collapse>

      </Accordion> */}
    </div>
  )
}

// function Changes(props)
// {
//   return (
//     <div className="Changes">
//       {props.changes.map((change, idx) => {
//           return (
//               <Change key={idx} change={change}/>
//           )})}
//     </div>
//   )
// }

// function File(props)
// {
//     return (
//       <div className="File">

//         {props.file.map((changes, idx) => {
//           return (
//               <Changes key={idx} changes={changes}/>
//           )})}
//       </div>
//     )
// }

function Locust_entry(props)
{
    return (
      <div className="File">

          File: {' '} {props.entry.file} {' '}
          <Button href={props.entry.file_url} size="sm">Open File</Button> <br/>
          {' '}


        {props.entry.changes.map((change, idx) => {
          return (
              <Change key={idx} change={change}/>
          )})}
      </div>
    )
}

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

function App() {

  return (
    <div className="App">


<Accordion>
<Card>
  <Card.Header>
    <PullHeader files_changed={data.locust.length}
                      initial={data.refs.initial}
                      terminal={data.refs.terminal}
                      lines_changed='ToDo'/>
    <Accordion.Toggle as={Button} variant="link" eventKey="0">
      Detail
    </Accordion.Toggle>
  </Card.Header>
  <Accordion.Collapse eventKey="0">
    <Card.Body>
    {
               data.locust.map((entry, idx) => {
                return (
                    <Locust_entry key={idx} entry={entry}/>
                )})
            }
    </Card.Body>
        </Accordion.Collapse>
      </Card>

    </Accordion>





    </div>
  );
}

export default App;
{/* <Accordion>
<Card>
  <Card.Header>
    <Accordion.Toggle as={Button} variant="link" eventKey="0">
      Press to expand
    </Accordion.Toggle>
  </Card.Header>
  <Accordion.Collapse eventKey="0">
    <Card.Body>
    </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="1">
            Click me!
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>Hello! I'm another body</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion> */}