import React from 'react'
import postscribe from 'postscribe';
import './App.css';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
class CodeWidget extends React.Component
{

  constructor(props)
  {
    super(props)
    console.log('CodeWidget constructor...')

    this.state =
    {
      Change: props.Change,
      Visible: props.show,
      key: props.id
    }

    this.close = this.close.bind(this)

  }

  SetWindows(props)
  {

      console.log('CodeWidget.SetWindows..')
  }
  componentDidMount()
  {
    console.log('CodeWidget.ComponentDidMount()...')
    if(this.state.Visible)
        {
            // http://gist-it.appspot.com/github/ADI10HERO/Hub/blob/6b69eb6/hub/collections/dataset/core.py?slice=559:565;footer=no
            let src='http://gist-it.appspot.com/'
            let src_x = this.state.Change.link.slice(0,this.state.Change.link.indexOf('#'))
            let endline = parseInt(this.state.Change.total_lines) + parseInt(this.state.Change.line)
            let startline = parseInt(this.state.Change.line)-1
            let slice = '?slice='+startline+':'+(endline)
            let nofoter = 'footer=no'
            src = '<script src='+src+src_x+slice+';'+nofoter+'></script>'
            // console.log(src)
            console.log('key:',this.state.key)
            let id="#Code"+this.state.key
            postscribe(id,src)
        }
    }

    close()
    {
        this.setState({Visible:false})
        console.log("CodeWidget.close")
        // this.componentWillUnmount
    }

  render() {

    let id = ''
        id="Code"+this.state.key

    if(this.state.Visible)
    {
        return (
            <div className="CodeWidget">



                {/* <button onClick={console.log('clicked'), this.close}>Close</button> */}
                <div id={id}></div>
            </div>

            )
    }
    else
    return('')

  }
} export default CodeWidget