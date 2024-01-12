function Submit(props){
    return(
        <div className="grid-item"> 
            <div className="clickable-component">
                <input type="button" value={props.value} onClick={props.onClick}/>
            </div>
        </div>
    );
}

export default Submit;