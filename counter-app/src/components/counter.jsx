import React, {Component} from "react";

class Counter extends Component {
    state = {
        value: this.props.value,
    }

    componentDidUpdate(preProps, preState) {
        if (preProps.counter.value !== this.props.counter.value) {
            console.log('Ajax Call')
        }
    }


    componentWillUnmount() {
        console.log('Counter - componentWillUnmount')
    }


    styles = {
        fontSize: 20,
        fontWeight: 'bold'
    }

    render() {
        return (
            <div>
                <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
                <button onClick={() => this.props.onIncrement(this.props.counter)}
                        className="btn btn-secondary btn-sm">+
                </button>
                <button onClick={() => this.props.onDecrement(this.props.counter)}
                        disabled={this.props.counter.value === 0 ? 'disabled' : ''}
                        className="btn btn-secondary btn-sm m-2">-
                </button>
                <button className="btn btn-danger btn-sm"
                        onClick={() => this.props.onDelete(this.props.counter.id)}>Delete
                </button>
            </div>
        )
    }

    formatCount() {
        const {value} = this.props.counter;
        return value === 0 ? 'Zero' : value;
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += (this.props.counter.value === 0) ? 'warning' : 'primary';
        return classes;
    }
}

export default Counter;