
class ConversionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Stay put..."
    }
  }
  
  componentDidMount() {

    let u_amount = this.props.inputAmount;
    let u_in_units = this.props.startUnits;
    let u_out_units = this.props.endUnits;

    $.ajax({
      url: "/api/convert",
      type: "get",
      data: `amount=${u_amount}&in_unit=${u_in_units}&out_unit=${u_out_units}`,
      success: data => this.setState({message: data})
    })
  }

  render() {
    return (
      <div className="outcome">
        <p className="success">{this.state.message}</p>
      </div>
    )
  }
}


class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	units: {
      	Length: ",km,mi,ft,m,cm,in,yd,",
        Area: ",ac,sqm,",
        Volume: ",pt,gal,l,",
        Weight: ",oz,lb,kg,g,"
      },
      user_unit: "",
      available_units: [],
      amount : "",
      conv_unit: "",
      request_made: false,
      heading: "Convert common distance, area and volume units",
      message: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserUnits = this.handleUserUnits.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange() {
    this.setState({
      request_made: false
    })    
  }
  
  handleUserUnits(e) {
  let msg, input_unit, output_units;
    
    for (let key in this.state.units) {
    	let regexp = new RegExp(`,${e.target.value},`);
			if (regexp.test(this.state.units[key])) {
      	let arr = this.state.units[key].split(",");
        arr.shift();
        arr.pop();
        output_units = arr;
        input_unit = e.target.value;
        msg = `${key} units conversion`;
        break;
      }
    }
    this.setState({
    	user_unit: input_unit || "",
      available_units: output_units || [],
      heading: msg || ""
    })
  }
             
  handleSubmit() {
  	let user_input = $("#input").val();
    let message;
    let req_ready = false;
    let end_unit = this.state.conv_unit;
    let amount = this.state.amount;

    function setmessage(data) {
      return data
    }
    
    if ((/^\d*[.]?\d+$/).test(user_input)) {      
    	let user_amount = user_input.replace(/^0+/, "");
      let conv_units = $("#desired_output").val();
      if (conv_units) {
        req_ready = true;
        end_unit = conv_units;
        amount = user_amount;

      } else {
      message = "Select conversion units";

      }
    } else {
    	message = "Enter a valid amount";
    }
      this.setState({
        	message: message,
          request_made: req_ready,
          conv_unit: end_unit,
          amount: amount          
      });
    
  }
  
  render() {
    let req_reply = "";
    if (this.state.request_made) {
      req_reply = <ConversionComponent inputAmount={this.state.amount} startUnits={this.state.user_unit} endUnits={this.state.conv_unit}/>
    } else {
      req_reply = (
        <div className="outcome">
          <p className="warning">{this.state.message}</p>
        </div>
      )
    }
    let opt_units = [];
    for (let i = 0; i < this.state.available_units.length; i++) {
      if (this.state.user_unit == this.state.available_units[i]) {
        continue;
       }
      opt_units.push(<option value={this.state.available_units[i]} key={i.toString()}>{this.state.available_units[i]}</option>)
    }
    
    return (
      <div className="app-container" onChange={this.handleChange}>
        <h3>{this.state.heading}</h3>
        <div id="data-container">
            <div id="user-input">
                <div className="user_options">
                <label htmlFor="input">Enter amount:&emsp;</label>
                <input name="amount" id="input" type="text" maxLength="25" required />                        
                </div>
                <div className="user_options">
                <label htmlFor="user_units">Select units:&emsp;</label>
                <select name="user_units" id="user_units" onClick={this.handleUserUnits}>
                  <option selected disabled>Select unit</option>
                  <optgroup label="length">
                    <option>km</option><option>mi</option>
                    <option>ft</option><option>m</option>
                    <option>cm</option><option>in</option>
                    <option>yd</option>
                  </optgroup>
                  <optgroup label="area">
                    <option>ac</option><option>sqm</option>
                  </optgroup>
                  <optgroup label="volume">
                    <option>pt</option><option>gal</option>
                    <option>l</option>
                  </optgroup>
                  <optgroup label="weight">
                    <option>oz</option><option>lb</option>
                    <option>kg</option><option>g</option>
                  </optgroup>
                </select>       
                </div>
                <div className="user_options">
                <label htmlFor="desired_output">Convert to:&emsp;</label>
                <select name="desired_output" id="desired_output">{opt_units}</select>       
                </div>
            </div>
            <button type="text" id="submit-btn" onClick={this.handleSubmit}>Submit Query!</button>
        </div>
             {req_reply}   
      </div>
    );
  }

}

ReactDOM.render(<AppComponent />, document.getElementById("app"));