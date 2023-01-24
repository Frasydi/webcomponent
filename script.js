class CustomButton extends HTMLElement {
            
    // Memeriksa attribut pada element. seperti pada kode html di atas. attribut yang dihasilkan adalah name dan value dari attributnya adalah Fachri
    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return
        this[property] = newValue
    }
    // Attribut yang diperiksa hanyalah name
    static get observedAttributes() {
        return ['name']
    }

    //Kode akan dijalankan ketika sudah dimasukkan ke dalam document. sama seperti mounted pada framework js
    connectedCallback() {
        //shadow adalah fungsi yang memungkingkan perubahan pada custom element yang kita buat sama sekali tidak mempengaruhi element luar
      const shadow = this.attachShadow({mode : "closed"})
      shadow.innerHTML = `<style>
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
      </button>
      
      `
      shadow.querySelector("button").addEventListener("click", (ev) => {
        ev.currentTarget.innerText += `${this.name}`
        setTimeout(() => {
            shadow.querySelector("button").innerHTML = `<slot></slot>`
        }, 2000)
      })
    }
  }
  //Mendefinsiikan element custom-button yang digunakan untuk custom element 
  customElements.define('custom-button', CustomButton)
  