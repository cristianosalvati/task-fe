function InputText(props){

    const handleInputOnChange = (event) => {  
        if (props.onChange) {  // Chiamare la funzione di callback personalizzata (se è stata fornita)
            const newValue = event.target.value;
            props.onChange(newValue);
          }
    }

    return(
        <div className="grid-item">
            <div className="input-component">
                {props.label && <label htmlFor={props.id}>{props.label}</label>}
                <input 
                    type="text" 
                    id={props.id} 
                    name={props.name} 
                    disabled={props.disabled} 
                    value={props.value}
                    placeholder={props.placeholder} 
                    onChange={handleInputOnChange}
                    /*onChange={props.onChange}*/
                    />
            </div>
        </div>
    );
}

export default InputText;