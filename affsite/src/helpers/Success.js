export function Success(props) {
    return(
      <div className="success">
        <i className="fa fa-check" style={{color: props.color}}></i>
        <span>&nbsp; {props.successMessage} </span> 
      </div>
    );
}