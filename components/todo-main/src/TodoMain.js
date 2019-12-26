import { html, LitElement, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import '../../todo-item/todo-item.js';
import '@lion/input/lion-input.js';
import '@lion/button/lion-button.js';

export class TodoMain extends LitElement {

  constructor() {
    super();
    this.todos = [];

  }

  static get styles() {
    return css`     

    h1 {
       font-family: sans-serif;
      text-align: center;
  }

form{
  width: 208px;
  margin: 0 auto;
  text-align: center;

} 

.split2{
  display: flex;
  justify-content: center;
}
.todos{
  padding: 0;
 list-style: none;
 margin: 0;
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
    <div class="split1">
      <form @submit=${ev => ev.preventDefault()}>
        <div class="test"><lion-input class="input"
        placeholder="Add item"></lion-input>
        </div>       
        <lion-button  @click=${this._addItem}>Add</lion-button>
      </form>  
    </div>

    <div class="split2">    

    <ul class="todos">
      ${repeat(this.todos,
      (todo, index) => html` <li class= "item">
          <todo-item 
          .checked=${todo.checked}
          .index=${index}
          .text=${todo.text}
          @onRemove=${this._removeItem}
          @onToggle=${this._toggleItem}
          >
          </todo-item></li>
          `
    )}
    </ul>
     </div>
    `;
  }

}

