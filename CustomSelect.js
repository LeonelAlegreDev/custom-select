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