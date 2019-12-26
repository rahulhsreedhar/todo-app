import { html, LitElement, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import '../../todo-item/todo-item.js';

export class TodoMain extends LitElement {

  constructor() {
    super();
    this.todos = [];

  }

  static get styles() {
    return css` 
       :host {
           display: block;
           font-family: sans-serif;
           text-align: center;
       }
       button {
           border: none;
           cursor: pointer;
       }
       ul {
           list-style: none;
           padding: 0;
       }
        `;
  }

  static get properties() {
    return {
      todos: { type: Array }
    }
  }
  firstUpdated() {
    this.inputData = this.shadowRoot.querySelector('input');

  }
   

  _removeItem(e) {
    this.todos = this.todos.filter((todo, index) => {
      return index !== e.detail;
    })
  }


  _toggleItem(e) {
    this.todos = this.todos.map((todo, index) => {
      return index === e.detail ? { ...todo, checked: !todo.checked } : todo;
    });

  }


  _addItem(e) {
    e.preventDefault();
    if (this.inputData.value.length > 0) {
      this.todos = [...this.todos, { text: this.inputData.value, checked: false }];
      this.inputData.value = '';
    }
  }

  render() {
    return html`
    
    <h1>TODO APP</h1>
    <form id="todo-input">
      <input type="text" placeholder="Add item"/>
      <button @click=${this._addItem}>Add</button>  
    </form>
    <ul id="todos">
      ${repeat(this.todos,
      (todo, index) => html`
          <todo-item 
          .checked=${todo.checked}
          .index=${index}
          .text=${todo.text}
          @onRemove=${this._removeItem}
          @onToggle=${this._toggleItem}
          >
          </todo-item>
          `
    )}
    </ul>
    `;
  }

}

 