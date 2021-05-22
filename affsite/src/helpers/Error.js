export function Error(props) {
    return(
      <div className="error">
        <i className="fa fa-exclamation-triangle" style={{color: props.color}}></i>
        <span>&nbsp; {props.errorMessage} </span> 
      </div>
    );
}