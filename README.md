# Custom Select Component
Este proyecto es un componente select perzonalizado creado con HTML, CSS y Javascript.

## Descripción

El componente es un select que se construye dinámicamente en base al elemento select y sus sub-elementos option declarados en el archivo HTML. 

### Características

- **Reutilizabilidad**: El componente está diseñado para ser reutilizable.
- **Adaptabilidad**: Al construirse dinámicamente, el componente permite adaptarse a las necesidades del proyecto.

## Implementación
1. **Copiar código HTML**
```html
<!-- CUSTOM SELECT COMPONENT -->
<div class="order-item">
    <span>Ordenar por</span>
    <div class="custom-select" id="productOrderCustom">
        <select name="productOrder" id="productOrder">
            <option value="mayor-precio">Mayor precio</option>
            <option value="menor-precio">Menor precio</option>
            <option value="descuento">Promociones</option>
        </select>
    </div>
</div>
```
> **Nota**: Agregá y modificá los elementos 'option' acorde a tus necesidades.

2. **Añadir enlace al código CSS**
```html
<!-- CUSTOM SELECT STYLES -->
<link rel="stylesheet" href="./custom-select.css">
```
3. **Copiar código CSS**
```css
/* START CUSTOM SELECT */
.order-item {
    position: relative;
    height: 40px;
    padding: 30px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid black;

    span {
        margin-right: 10px;
        font-size: 18px;
        font-weight: 500;
    }

    .custom-select {
        position: relative;

        select {
            display: none;
        }

        .select-selected {
            background-color: rgb(240, 240, 240);
        }

        .select-selected:after {
            position: absolute;
            content: "";
            top: 16px;
            right: 10px;
            width: 0;
            height: 0;
            border: 6px solid transparent;
            border-color: #000000 transparent transparent transparent; /* arrow */
        }
        .select-selected.select-arrow-active:after {
            border-color: transparent transparent #000000 transparent; /* arrow */
            top: 9px;
        }

        .select-items div,
        .select-selected {
            width: 200px;
            padding: 8px 10px;
            border: 1px solid transparent;
            border-color: transparent transparent rgba(0, 0, 0, 0.3) transparent;
            cursor: pointer;
            color: #000000;
            font-weight: 600;
        }
        .select-items {
            position: absolute;
            background-color: rgb(240, 240, 240);
            top: 100%;
            left: 0;
            right: 0;
            z-index: 99;
        }
        .select-hide {
            display: none;
        }
        .select-items div:hover, .same-as-selected {
            background-color: rgba(0, 0, 0, 0.1);
        }
    }
}
/* END CUSTOM SELECT */
```
4. **Importar el código JS**
```html
<!-- CUSTOM SELECT SCRIPT -->
<script src="./CustomSelect.js"></script>
```
6. **Copiar código JS**
```javascript
class CustomSelect{
    constructor(idComponent){
        this.component = document.getElementById(idComponent);
        this.select = this.component.getElementsByTagName('select')[0];

        this.Init();
    }

    Init(){
        const selectLabel = document.createElement('div');
        selectLabel.setAttribute("class", "select-selected");
        selectLabel.innerHTML = this.select.options[this.select.selectedIndex].innerHTML;

        this.component.appendChild(selectLabel);

        const optionContainer = document.createElement('div');
        optionContainer.setAttribute("class", "select-items select-hide");

        for(const option of this.select){
            const optionItem = document.createElement('div');
            optionItem.innerHTML = option.innerHTML;

            // Al clickear una opción, se actualiza el select y el label
            optionItem.addEventListener('click', () => {
                selectLabel.innerHTML = option.innerHTML;
                this.select.value = option.value;
                optionContainer.classList.toggle("select-hide");
                selectLabel.classList.toggle("select-arrow-active");
            });
            optionContainer.appendChild(optionItem);
        }
        this.component.appendChild(optionContainer);

        selectLabel.addEventListener('click', () => {
            optionContainer.classList.toggle("select-hide");
            selectLabel.classList.toggle("select-arrow-active");
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.custom-select')) {
                optionContainer.classList.add("select-hide");
                selectLabel.classList.remove("select-arrow-active");
            }
        });
    }
}

const productOrderCustom = new CustomSelect('productOrderCustom');
```
> **Nota**: Si necesitas crear varios componentes asegurate de añadir un id al elemento con la clase 'custom-select' y pasar el id por parametro al crear un nuevo objeto CustomSelect.
