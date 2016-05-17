import "./style.css";
import React from "react";
import {FlatButton} from "material-ui";
import {saveImage} from "../../redux/actions";
import {map} from "ramda";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
  files: state.files
})

const mapDispatchToProps = {
  saveImage: (image) => saveImage(image)
}

const FileInput = (props) => {
  return (
      <div className="FileInput">
        <FlatButton className="FileInput-filesbutton">
          { props.label }
          <input
              type="file"
              multiple={ props.multiple }
              onChange={ (event) => {
          map((i) => {
          props.saveImage(i).then(({result}) => props.onUpload(result.body))
          }, event.target.files)
          event.target.value = ""
          } }/>
        </FlatButton>
      </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(FileInput)
