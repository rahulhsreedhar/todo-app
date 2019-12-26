import { html, css, LitElement } from 'lit-element';

export class TodoItem extends LitElement {
  constructor() {
    super();
    this.text = '';
    this.checked = false;
  }
  static get properties() {
    return {
      text: {
        type: String,
        reflect: true
      },
      checked: {
        type: Boolean,
        reflect: true
      },
      index: {
        type: Number
      }

    }
  }

  static get styles() {
    return css`
    :host {
      display: block;
      font-family: sans-serif;
    }

    .completed {
      text-decoration: line-through;
    }

    button {
      cursor: pointer;
      border: none;
    }
    #close{
      color:red;
      border: 0.1px solid grey;
         }

         
    `;
  }
  render() {
    return html`
    
      <input 
        type="checkbox"
        ?checked= ${this.checked}
        @change=${() => this._fire('onToggle')}/>
      <label class=${this.checked ? 'completed' : ''}>${this.text}</label>
      <button id='close' @click = ${() => this._fire('onRemove')}>X </button>
 `;
  }

  _fire(event) {
    this.dispatchEvent(new CustomEvent(event, { detail: this.index }));
  }

}
