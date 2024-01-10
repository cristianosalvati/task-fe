
function Label(props){
    return(
        <div className="grid-item"> 
            <div className="label-component">
                <label htmlFor={props.id}>{props.value}</label>
            </div>
        </div>
    );
}

export default Label;