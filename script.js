class CustomButton extends HTMLElement {
            
    // Memeriksa attribut pada element. seperti pada kode html di atas. attribut yang dihasilkan adalah name dan value dari attributnya adalah Fachri
    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return

        this[property] = newValue
        this.renderHtml()
    }
    // Attribut yang diperiksa hanyalah name
    static get observedAttributes() {
        return ['name']
    }
    renderHtml() {
        this.shadowss.innerHTML = `<style>
        button {
            background-color : transparent;
            border : .5px solid rgba(0,0,0,0.6);
            padding : 1rem 2rem;
            border-radius : 1rem;
            font-weight : bold;
            font-size : x-large;
        }
    
        button:hover {
            cursor : pointer;
            background-color : black;
            color : white;
    
        }
    
        button:active {
            opacity : .5;
        }
    
    
        </style>
        
        <button>
        <slot></slot>
        ${this.name}
        </button>
        
        `
    }
    //Kode akan dijalankan ketika sudah dimasukkan ke dalam document. sama seperti mounted pada framework js
    connectedCallback() {
        //shadow adalah fungsi yang memungkingkan perubahan pada custom element yang kita buat sama sekali tidak mempengaruhi element luar
    this.shadowss = this.attachShadow({mode : "closed"})
    this.renderHtml()
      
    }
  }
  //Mendefinsiikan element custom-button yang digunakan untuk custom element 
  customElements.define('custom-button', CustomButton)

  const cb = document.querySelector("custom-button")

  document.getElementById("cbname").addEventListener("keyup", (ev) => {
    const text = ev.target.value
    cb.setAttribute("name", text)
  }) 